"use client"
import { store } from "@/lib/store/store"
import { Provider } from "react-redux"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<Provider store={store}><div >{children}</div></Provider>)
}
