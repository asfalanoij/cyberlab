import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/ui/Sidebar'
import { TopBar } from '@/components/ui/TopBar'
import { QueryProvider } from '@/components/providers/QueryProvider'

export const metadata: Metadata = {
  title: 'CyberLab',
  description: 'Cybersecurity research notebooks — MITRE ATT&CK mapped, Python-first.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="layout-shell">
            <TopBar />
            <Sidebar />
            <main className="main">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
