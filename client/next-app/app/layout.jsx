// styles
import '@/styles/reset.css'
import '@/styles/global.css'

//redux
import Providers from '@/redux/providers'

//toaster for notifications
import { Toaster } from 'react-hot-toast'


export const metadata = {
  title: 'NewMind',
  description: 'Student Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/next-app/public/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Mulish&display=swap" rel="stylesheet" />
     </head>
      <body className='w-full min-h-screen'>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
