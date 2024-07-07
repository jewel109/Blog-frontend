import type { RootState } from "@/app/store/store"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import useApi from "@/lib/hooks/useApi"
import { ApiResponse, makeAxiosRequest } from "@/lib/utils"
import httpRequest from "@/lib/utils/api"
import { AxiosError, AxiosRequestConfig } from "axios"
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
    message?: String | undefined,
    addedStory?: T | undefined
  }


  // useEffect(() => {
  //
  //   try {
  //     const fetchSavedStoryData = async () => {
  //       const data = makeAxiosRequest("post", "/story/addStoryToReadList", { slug: `${storyData.slug}`, username: `${userData.username}` })
  //
  //       console.log(data)
  //     }
  //
  //
  //
  //     fetchSavedStoryData()
  //   } catch (error) {
  //     console.log("fetchSavedStoryData ", error)
  //     axiosError(error as AxiosError)
  //
  //   }
  //
  // }, [saveStoryCliked])
  //
  useEffect(() => {

    try {
      console.log(" fetchSavedStoryDataStatus")
      const savedToken = localStorage.getItem("token")
      const fetchSavedStoryDataStatus = async () => {

        const headers = { "Authorization": `Bearer ${savedToken}` }
        const data = await axiosInstance.post("/user/showReadListStatus", { slug: storyData.slug }, { headers: headers })
        console.log(data.data.data)

        setIsSaved(data.data.data)

      }
      fetchSavedStoryDataStatus()

    } catch (err) {
      console.log(err)
      axiosError(err as AxiosError)
    }

  }, [saveStoryCliked])

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
