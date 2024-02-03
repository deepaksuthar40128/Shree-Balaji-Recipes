import NavBar from '@/components/navbar/Navbar'
import './globals.scss'
import type { Metadata } from 'next'
import Footer from '@/components/footer/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import Provider from '@/components/authProvider/authProvider'



export const dynamic = 'force-dynamic';
export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <body>
        <Provider>
          <ThemeProvider>
            <NavBar />
            {children}
            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
