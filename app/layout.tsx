import { Header } from './components/header.component';

import './globals.css'
// import { Inter } from 'next/font/google'
// import Navbar from './components/Navbar'
// import AuthProvider from './context/AuthProvider'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'NextAuth Tutorial',
//   description: 'User Authentication in Next.js 13 App using NextAuth',
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <Navbar />
//           <main className="flex justify-center items-start p-6 h-[calc(100vh_-_80px)] bg-gray-900">
//             {children}
//           </main>
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className="h-screen flex flex-col">
                <Header />
                <div className="mt-14">
                    {children}
                </div>
            </body>
        </html>
    );
}