"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div>
              {children}
            </div>

          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
