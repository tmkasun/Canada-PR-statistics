import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Canada PR Stats",
    description: "Visualize Canadian PR statistics using the live IRCC data API.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-K48WB539H5" />
            <Script id="google-analytics">
                {
                    `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', 'G-K48WB539H5');
        `
                }
            </Script>
            <div className={`grow flex flex-col ${figtree.className}`}>
                {children}
            </div>
        </>
    );
}