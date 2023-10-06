import Head from "next/head";
import AppBar from "~/components/AppBar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Animate from "~/components/Animate";
dayjs.extend(customParseFormat);

const MainPage = () => {
    return (
        <>
            <Head>
                <title>Canada PR Statistics</title>
            </Head>
            <div className="flex flex-col sm:m-1 md:mx-6 justify-start items-center grow gap-y-4">
                <AppBar />
                <div className="flex flex-col justify-center grow gap-8">
                    <Animate word="Kasun Thennakoon" />
                </div>
            </div>
        </>
    );

};


export default MainPage;