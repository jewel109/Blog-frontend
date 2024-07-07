import { useRouter } from "next/navigation"

export default function AddPostHeader() {
  const router = useRouter()

  function clickHandler() {
    router.push("/")
  }

  return (<div className="bg-gray-100 ">
    <div className="grid grid-flow-col w-8/12 mx-auto pt-6">
      <div className="text-xl font-medium">create post</div>
      <div onClick={clickHandler} className="justify-self-end font-bold text-2xl hover:cursor-pointer">x</div>
    </div>
  </div>)
}
