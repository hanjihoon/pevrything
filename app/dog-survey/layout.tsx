"use client"
import 'app/dog-survey/output.css'
import 'app/globals.css'
import NavbarWithCTAButton from 'app/components/MenuBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <html lang="kr">
        <body>
            <NavbarWithCTAButton/>
            {children}
        </body>
      </html>
  )
}
