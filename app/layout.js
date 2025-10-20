import './globals.css'

export const metadata = {
  title: 'Oneiro Auth Portal',
  description: 'Authentication portal for Oneiro app - handles email verification and password resets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}