"use client"
import Link from "next/link";
import { MainHeader } from "../page";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react"
import { TotalPost } from "./(user)/totalPost";
import TotalComment from "./(user)/totalComment";
import classNames from "classnames";
import TotalLikedPost from "./(user)/totalLikedPost";


export default function Page() {
  const userData = useSelector((state: RootState) => state.userReducer)
  const postUserData = useSelector((state: RootState) => state.postUserDetailsReducer)

  const [totalPost, setTotalPost] = useState<Boolean>(false)
  const [totalComment, setTotalComment] = useState<Boolean>(false)
  const [totalLikedStory, setTotalLikedStory] = useState<Boolean>(false)

  useEffect(() => {
    setTotalPost(true)
  }, [])

  interface Iuiname {
    totalPost: string,
    totalComment: string,
    totalLikedStory: string
  }
  const uiName: Iuiname = {
    totalComment: "totalComment",
    totalLikedStory: "totalLikedStory",
    totalPost: "totalPost"
  }


  function uiHandler(name: string) {
    switch (name) {
      case uiName.totalPost:
        setTotalPost(true)
        setTotalComment(false)
        setTotalLikedStory(false)
        break;
      case uiName.totalComment:
        setTotalComment(true)
        setTotalPost(false)
        setTotalLikedStory(false)
        break;
      case uiName.totalLikedStory:
        setTotalLikedStory(true)
        setTotalPost(false)
        setTotalComment(false)
      default:
        break;
    }
  }

  return (
    <div className="  min-h-screen  ">
      <MainHeader />
      <div className='bg-gray-100 min-h-screen '>
        <div className='grid grid-cols-12 w-8/12 mx-auto pt-6 gap-1  min-h-screen'>
          <section className=' col-start-1 col-end-3 grid justify-self-start left-section'>
            <div className="">
              <div className={classNames('cursor-pointer p-2 rounded', {
                'bg-white': totalPost
              })} onClick={() => {
                // console.log("i am called")
                // console.log(totalPost)
                uiHandler(uiName.totalPost)
              }}>

                total post
              </div>
              <div className={classNames('cursor-pointer p-2 rounded', {
                'bg-white': totalComment
              })} onClick={() => {
                uiHandler(uiName.totalComment)
              }}>
                total comment
              </div>
              <div className={classNames('cursor-pointer p-2 rounded', {
                'bg-white': totalLikedStory
              })} onClick={() => {
                uiHandler(uiName.totalLikedStory)
              }}>
                liked post
              </div>

            </div>
          </section>
          <section className=' col-start-3 col-end-10 max-h-screen overflow-scroll main-content'>
            <div className="bg-white">
              {

              }
              {totalPost ? <div><TotalPost /></div> : null}
              {totalComment ? <><TotalComment /></> : null}
              {totalLikedStory && <><TotalLikedPost /></>}
            </div>

          </section>
          <section className="col-start-11 col-end-13 max-h-screen right-section">

            {postUserData.name}

          </section>
        </div>
      </div >
    </div >

  )

}
