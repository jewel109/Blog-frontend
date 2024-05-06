import type { RootState } from "@/app/store/store"
import useApi from "@/lib/hooks/useApi"
import { ApiResponse, makeAxiosRequest } from "@/lib/utils"
import { AxiosRequestConfig } from "axios"
import classNames from "classnames"
import { constants } from "crypto"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function SaveStory() {
  const storyData = useSelector((state: RootState) => state.storyReducer)
  const userData = useSelector((state: RootState) => state.userReducer)
  const [saveStoryCliked, setSaveStoryCliked] = useState<Boolean>(false)
  const [isSaved, setIsSaved] = useState<Boolean>(false)

  // const config: AxiosRequestConfig = {
  //
  //   method: "post", url: "http://localhost:9000/story/addStoryToReadList", data: { slug: `${storyData.slug}`, username: `${userData.username}` }
  // }
  // const { apiData, error, apiFetchData, isLoading } = useApi(config)
  //
  //
  // useEffect(() => {
  //
  //   apiFetchData()
  //   console.log(apiData)
  //
  // }, [])
  //

  interface ISaveStory<T> {
    message: String,
    addedStory: T
  }


  useEffect(() => {


    const fetchSavedStoryData = async () => {
      const { message, addedStory }: ISaveStory<Boolean> = await makeAxiosRequest<any>("post", "/story/addStoryToReadList", { slug: `${storyData.slug}`, username: `${userData.username}` }).catch((err) => { console.log(err) })
      console.log(message, addedStory)
      setIsSaved(addedStory)
    }
    fetchSavedStoryData()

  }, [saveStoryCliked])

  useEffect(() => {

    console.log(" fetchSavedStoryDataStatus")
    const fetchSavedStoryDataStatus = async () => {
      const data = await makeAxiosRequest("post", "/user/showReadListStatus", undefined, undefined, true).catch(
        (err) => console.error(err)
      )
      console.log(data)
      if (data) setIsSaved(true)


    }
    fetchSavedStoryDataStatus()
  }, [])

  console.log()


  return (
    <>

      {}
      <div onClick={() => {
        setSaveStoryCliked(!saveStoryCliked)
      }} className={classNames('cursor-pointer ', {
        "text-red-900 font-bold": isSaved
      })}
      >
        {isSaved ? "Saved" : "save"}
      </div>
    </>)

}
