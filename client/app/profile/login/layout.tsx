"use client"
import { store } from "@/app/store/store"
import { Provider } from "react-redux"

export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  return (<Provider store={store}><div >{children}</div></Provider>)
}
