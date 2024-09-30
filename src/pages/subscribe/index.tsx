import Head from "next/head";
import { useRouter } from "next/router";
import AppBar from "~/components/AppBar";
import { getCollection } from "~/lib/mongodb";

const SubscribePage = (props: any) => {
  const { item, notFound } = props;
  const location = useRouter();
  const { query } = location;
  const { email, code } = query;
  let isInvalid = !email || !code || notFound;
  return (
    <>
      <Head>
        <title>Canada PR Statistics</title>
      </Head>
      <div className="flex flex-col m-1 mt-0 sm:mx-6 justify-start items-center grow gap-y-4">
        <AppBar />
        <div className="flex flex-col w-full grow gap-8">
          {isInvalid && (
            <div className="text-red-500">Invalid subscription request or Already subscribed!</div>
          )}
          {item && (
            <div className="text-green-500">
              {item.email} Subscription successful!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }: { query: any }) {
  const { email, code } = query;
  if (!email || !code) {
    return { props: { notFound: true } };
  }
  // Construct the query object
  const queryObject = {
    email: email,
    "canpr.uuid": code,
    "canpr.isVerified": false,
  };

  // Define the update operation
  const updateOperation = {
    $set: { "canpr.isVerified": true },
  };

  // Options for findOneAndUpdate
  const options = {
    upsert: false, // We don't want to create a new document if it doesn't exist
  };

  try {
    const collection = await getCollection();

    const item = await collection.findOneAndUpdate(
      queryObject,
      updateOperation,
      options
    );

    if (!item) {
      return { props: { notFound: true } };
    }

    return {
      props: { item: JSON.parse(JSON.stringify(item)) },
    };
  } finally {
    // await client.close();
  }
}

export default SubscribePage;
