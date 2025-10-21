import './globals.css'

export const metadata = {
  title: 'Oneiro Auth Portal',
  description: 'Authentication portal for Oneiro app - handles email verification and password resets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{background: '#0D0D0D'}}>
      <body style={{background: '#0D0D0D', color: '#FFFFFF'}} className="min-h-screen">
        <header className="w-full p-6 relative">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center mb-8 floating">
              <img 
                src="/Oneiro-Logo.svg" 
                alt="Oneiro" 
                className="h-16 w-auto"
                style={{filter: 'drop-shadow(0 2px 8px rgba(168, 85, 247, 0.3))'}}
              />
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 max-w-md">
          {children}
        </main>
      </body>
    </html>
  )
}