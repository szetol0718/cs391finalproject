import React from "react";

// Styling by Ajani Hickling
import {Work_Sans} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
const bgColor = `bg-teal-100`;
const bodyStyling = `w-full items-center p-0 pb-5 flex flex-col ${bgColor}`;
const workSansFont = Work_Sans({
    subsets: ["latin"]
})


export default function RootLayout(
    {children,}:
        Readonly<{children: React.ReactNode;}>
){
    return (
        <html lang="en" className={workSansFont.className}>
            <body className={bodyStyling}>
                <Header/>
                {children}
                {/*<Footer/>*/}
            </body>
        </html>
    );
}