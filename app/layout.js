import './globals.css'

export const metadata = {
  title: 'Oneiro Auth Portal',
  description: 'Authentication portal for Oneiro app - handles email verification and password resets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{background: '#0D0D0D'}}>
      <body style={{background: '#0D0D0D', color: '#FFFFFF'}} className="min-h-screen">
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full px-4">
            <div className="flex items-center justify-center mb-12">
              <img 
                src="/Oneiro-Logo.svg" 
                alt="Oneiro" 
                className="h-48 w-auto"
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(168, 85, 247, 0.4))',
                }}
              />
            </div>
            <main>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}