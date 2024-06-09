
import { accessUser, logOutUser } from '@/lib/features/userSlice'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Input } from '../ui/input'
import { SwitchDemo } from './switch'
import { type RootState, useAppDispatch } from '@/lib/store/store'
import { toggleClick } from '@/lib/features/sidebarSlice'
import { toast } from '../ui/use-toast'
import Link from 'next/link'


export default function MainHeader() {
  const userState = useSelector((state: RootState) => state.userReducer)
  const sideBarState = useSelector((state: RootState) => state.sidebarReducer)
  const pathName = usePathname()

  const [userName, setUserName] = useState<String | null>("")
  // console.log(sideBarState)
  // console.log(userState)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const createAccountHandler = () => {
    router.push("/register")
  }

  const loginHandler = () => {
    router.push("/login")
  }

  const logOutHandler = () => {

    localStorage.removeItem("token")
    dispatch(logOutUser(""))
    router.push("/")

  }
  const handleclik = () => {
    // console.log("clicked")
    router.push("/post/addPost")
  }
  useEffect(() => {

    setUserName(userState?.username)
    console.log("called")

  }, [userState.username])

  useEffect(() => {
    // console.log("called")
    dispatch(accessUser())
    if (userState.username) {
    } else {
      console.log("i am called")
      toast({
        description: "You are not logged in",
        variant: "destructive"
      })
    }


    console.log("accessUser " + userState)



  }, [])

  useEffect(() => {
    if (userState.error) {
      toast({
        description: userState.error,
        variant: "destructive"
      })
    }
  }, [userState.error])

  useEffect(() => {

    setUserName(userState?.username)
    console.log("called")

  }, [userState.username])

  return (
    <>
      <nav className=' md:mr-4 md:fixed md:top-0 md:left-0 md:z-50 md:py-4  bg-gray-50 dark:bg-gray-800 mx-auto flex flex-row justify-between w-full px-2 gap-x-4 py-2'>
        <div className='flex md:space-x-2 '>
          <div className=''>

            <Button onClick={() => {
              router.push("/")
            }} className='text-muted font-semibold hidden md:flex '>Blog</Button>
          </div>
          <div className="relative  md:block ">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
          </div>
        </div>
        <div className='flex '>

          <SwitchDemo />
          {
            userName ?
              <div className='flex flex-row items-center gap-1'>
                <Button variant="outline" onClick={() => handleclik()} className='text-muted bg-primary tracking-tighter font-bold hidden '>Create Post</Button>
                <div className='hidden md:flex'>
                  <Popover >
                    <PopoverTrigger asChild>
                      <Avatar className='cursor-pointer'>
                        <AvatarImage className='' src="https://github.com/shadcn.png" alt="jewel" />
                        <AvatarFallback className="p-2">{userName}</AvatarFallback>
                      </Avatar>

                    </PopoverTrigger>
                    <PopoverContent className='w-40' align='end'>
                      <div className=' p-2 cursor-pointer hover:bg-indigo-100 dark:hover:bg-gray-800 rounded' >
                        {userState.username}
                      </div>
                      <div className=' p-2 cursor-pointer dark:hover:bg-gray-800   hover:bg-indigo-100 rounded' >
                        Dashboard
                      </div>

                      <div className='cursor-pointer hover:bg-indigo-100 p-2 dark:hover:bg-gray-800  rounded' onClick={() => logOutHandler()}  >
                        Logout
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <svg className="h-8 w-8 text-gray-800 dark:text-gray-400 cursor-pointer menu-bar md:hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" onClick={() => {
                  dispatch(toggleClick())
                }}>
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
                </svg>
              </div>

              :
              <div className='grid grid-flow-col gap-x-1'>
                <div className="inline-flex items-center px-2 py-1 text-sm font-medium  cursor-pointer text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800" onClick={() => createAccountHandler()}>Create Account</div>
                <div className=" inline-flex items-center py-1 px-3 ms-2 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => loginHandler()}>Login</div>


              </div>
          }
        </div>
      </nav>

    </>
  )
}


