import Image from "next/image";
import { useMutation, useQuery } from "react-query";
import { getTemplateDetails, purchaseTemplate } from "~/api/templates";
import Footer from "~/components/Footer";
import TemplateCover from "~/components/Product/TemplateCover";
import TemplateDescription from "~/components/Product/TemplateDescription";
import Rating from "~/components/Rating";
import AppBar from "~/layouts/AppBar";
import TemplateReviews from "~/components/Product/TemplateReviews";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export interface IProducts {
    params: Params,
    user: User
}

export default function Products(props: IProducts) {
    const { params } = props;
    const { productID } = params;
    const { data, isLoading, error } = useQuery(["product-details", productID], getTemplateDetails);
    const { mutate: purchaseHandler, isLoading: isPurchaseProcessing, error: purchaseError } = useMutation<unknown, Error | { message: string }, string>({
        mutationFn: purchaseTemplate
    });

    const handleBuyNow = () => {
        if (productID) {
            purchaseHandler(productID as string);
        } else {
            throw new Error("Product ID is not available!");
        }
    };

    useEffect(() => {
        if (purchaseError) {
            // TODO: Needs to get error view design for template download failures
            alert(purchaseError.message);
        }
    }, [purchaseError]);
    return (
        <>
            <AppBar isDark />
            <main className="mx-[var(--app-bar-margin)] grow flex flex-col items-start ">
                <TemplateCover template={data} />
                <div className="flex flex-col  py-10 mt-5 w-full">
                    <div className="flex justify-between gap-x-5">
                        <div className="overflow-auto flex-1 grow flex p-10 bg-[#F8FAFD] border border-[#F1F5FB] rounded-[1.375rem] flex-col gap-y-[1.85rem]">
                            <div className="flex">
                                <div className="flex justify-start items-center gap-4 grow-[5]">
                                    <div>
                                        <Image width="64"
                                            height="0"
                                            sizes="100vw"
                                            src="/images/landing/product-icon.svg" alt="Product icon" />
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <h1 className="text-gray-950 text-4xl font-semibold leading-10">{data && data.title}</h1>
                                        <div className="flex gap-x-1">
                                            <span className="text-gray-400 leading-5 font-normal">Creator:</span>
                                            <span className="text-gray-950 font-medium leading-5">
                                                {/* TODO: Need creator name in the template details API */}
                                                {data && data.user_id}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col grow">
                                    <Rating rating={data && data.rating || -1} />
                                </div>
                            </div>
                            {/* HR */}
                            <div className="border border-gray-200 " />
                            <div className="flex">
                                <div className="flex flex-col grow gap-1">
                                    <span className="text-[#94A5B9] text-sm font-normal leading-3">Type</span>
                                    <div className="font-semibold text-lg leading-5 text-[#020618] capitalize">{data && data.template_type}</div>
                                </div>

                                <div className="flex flex-col grow gap-1">
                                    <span className="text-[#94A5B9] text-sm font-normal leading-3">Niche</span>
                                    <div className="font-semibold text-lg leading-5 text-[#020618] capitalize">{data && data.industry.replaceAll("_", " ")}</div>
                                </div>

                                <div className="flex flex-col grow gap-1">
                                    <span className="text-[#94A5B9] text-sm font-normal leading-3">Installs</span>
                                    <div className="font-semibold text-lg leading-5 text-[#020618]">
                                        {/* TODO: Need installs count in the template details API */}
                                        -1
                                    </div>
                                </div>

                            </div>
                            {/* HR */}
                            <div className="border border-gray-200 " />
                            <TemplateDescription>
                                {data && data.description}
                            </TemplateDescription>
                            {/* HR */}
                            <div className="border border-gray-200 " />
                            <TemplateReviews />
                        </div>
                        <div className="flex flex-col p-6 gap-y-[0.62rem] justify-start items-center shrink-0 bg-[#F8FAFD] border border-[#F1F5FB] rounded-[1.375rem] self-baseline">
                            <div className="min-w-[17.5rem] py-[0.625rem] pl-6 pr-[0.625rem] h-16 flex justify-between bg-white border border-gray-100 rounded-2xl items-center">
                                <h4 className="text-gray-950 text-lg font-semibold leading-5">{data && data.price} Credit</h4>
                                <button onClick={handleBuyNow} disabled={isPurchaseProcessing} className="flex justify-center items-center text-white bg-[#443BBC] font-semibold leading-5 rounded-xl gap-3 py-[0.625rem] px-5 w-36">{isPurchaseProcessing ? (
                                    <span className="flex justify-center items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>Processing
                                    </span>) : "Buy Now"}</button>
                            </div>
                            <div className="text-gray-400 text-sm">
                                {/* TODO: Need to have account/user credit API to fetch user's credit balance  */}
                                You Currently Have <span className="font-semibold">-1 Credits</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return {
        props: {
            user: session.user,
            params: context.params
        },
    };
}