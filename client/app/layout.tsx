"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Provider } from 'react-redux'
import { store } from './store/store'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <React.StrictMode>
          <Provider store={store}>
            <div>
              {children}

            </div>

          </Provider>
        </React.StrictMode>
      </body>
    </html>
  )
}
