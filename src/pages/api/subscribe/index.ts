import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendVerificationEmail } from "~/lib/email";
import { getCollection } from "~/lib/mongodb";
import { validateEmail } from "~/utils/utils";

let CF_SECRET_KEY = process.env.CF_SECRET_KEY || "";
if (process.env.NODE_ENV === "development") {
  /** 
    1x0000000000000000000000000000000AA	Always passes
    2x0000000000000000000000000000000AA	Always fails
    3x0000000000000000000000000000000AA	Yields a “token already spent” error
    */
  CF_SECRET_KEY = "1x0000000000000000000000000000000AA";
}

if (!CF_SECRET_KEY) {
  throw new Error(
    "Please define the MONGODB_URI, MONGODB_DB, and CLOUDFLARE_SECRET_KEY environment variables inside .env.local"
  );
}

async function validateTurnstileToken(
  token: string,
  ip: string
): Promise<boolean> {
  // Validate the token by calling the "/siteverify" API.
  let formData = new FormData();
  formData.append("secret", CF_SECRET_KEY);
  formData.append("response", token);
  formData.append("remoteip", ip);
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: formData,
      method: "POST",
    }
  );

  const data = await response.json();
  return data.success;
}

export interface INewSubscription {
  email: string;
  canpr: {
    uuid: string;
    isVerified: boolean;
    oinp: boolean;
    bcpnp: boolean;
    ee: boolean;
    createdAt?: Date;
  };
}

export enum ALLOWED_SUBSCRIPTIONS {
  oinp = "oinp",
  bcpnp = "bcpnp",
  ee = "ee",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, token, subscriptions } = req.body;
  if (!email || !token) {
    return res.status(400).json({ error: "Email and token are required" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  const ip = req?.headers["x-forwarded-for"];
  const isValidToken = await validateTurnstileToken(token, ip as string);

  if (!isValidToken) {
    return res.status(400).json({ error: "Invalid Turnstile token" });
  }
  const collection = await getCollection();
  const existingSubscription = await collection.findOne({ email });
  if (existingSubscription) {
    if (existingSubscription.canpr.isVerified) {
      return res.status(400).json({ error: "Email already subscribed" });
    } else {
      return res
        .status(400)
        .json({ error: "Email already subscribed, pending verification" });
    }
  }

  const newSubscription = {
    email,
    canpr: {
      uuid: randomUUID(),
      isVerified: false,
      oinp: false,
      bcpnp: false,
      ee: false,
      createdAt: new Date(),
    },
  };
  if (subscriptions.includes("all")) {
    newSubscription.canpr.oinp = true;
    newSubscription.canpr.bcpnp = true;
    newSubscription.canpr.ee = true;
  } else {
    subscriptions.forEach((sub: ALLOWED_SUBSCRIPTIONS) => {
      if (ALLOWED_SUBSCRIPTIONS[sub]) {
        newSubscription.canpr[sub] = true;
      }
    });
  }
  try {
    const response = await collection.insertOne(newSubscription);
    // Need to send verification email
    const emailSent = await sendVerificationEmail(email, newSubscription.canpr.uuid);
    if (emailSent?.error) {
      return res.status(500).json({ error: "Error sending verification email" });
    }
    return res
      .status(200)
      .json({ error: "Subscription added successful, Pending verification!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
