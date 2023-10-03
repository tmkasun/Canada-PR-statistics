import Head from "next/head";
import AppBar from "~/components/AppBar";
import Statistics from "~/components/Statistics";
import { useIRCCData } from "~/data/api";

const MainPage = () => {
    const { data, isLoading } = useIRCCData(true);

    return (
        <>
            <Head>
                <title>Canada PR Statistics</title>
            </Head>
            <div className="flex flex-col sm:m-1 md:mx-6 justify-start items-center grow gap-y-4">
                <AppBar />
                <div className="flex flex-col w-full grow gap-8">
                    {!isLoading && <Statistics isLoading={isLoading} data={data} />}
                    <div className="flex grow items-center justify-center">
                        {isLoading && (
                            <span className="flex justify-center items-center ">
                                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> Loading
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

};


export default MainPage;