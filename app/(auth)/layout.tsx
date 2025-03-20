//(auth) - layouts.tsx | specify different rules for the auth routes

//search engine optimization 

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";        //for the inter font

import '../globals.css';                         

export const metadata = {
    title: 'VarsityX',
    description: 'A Next.js 13 Meta Threads application'
}


//this is how you do fonts
const inter = Inter({subsets: ["latin"]})


export default function RootLayout({ 
        children 
    }: {    
        children: React.ReactNode
    }) {
        return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
        )
}
