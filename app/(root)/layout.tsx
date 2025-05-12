//(auth) - layouts.tsx | specify different rules for the auth routes

//search engine optimization 

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";        //for the inter font

import '../globals.css';                         
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";

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
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>VarsityX</title>
          <meta name="description" content="A Next.js 13 Meta Threads application" />
        </head>
        <body className={`${inter.className} bg-light-2`}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full">
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
