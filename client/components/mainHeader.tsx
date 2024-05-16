
import { accessUser, logOutUser } from '@/app/features/userSlice'
import { useAppDispatch } from '@/app/store/store'
import type { RootState } from '@/app/store/store'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import { Avatar } from './ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Input } from './ui/input'


export default function MainHeader() {
  const userState = useSelector((state: RootState) => state.userReducer)
  console.log(userState)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const gotoregister = () => {
    console.log("clicked")
    router.push("/profile/register")
  }
  const createAccountHandler = () => {
    router.push("/profile/register")
  }

  const loginHandler = () => {
    router.push("/profile/login")
  }

  const logOutHandler = () => {

    localStorage.removeItem("token")
    dispatch(logOutUser(""))
    router.push("/")

  }
  const handleclik = () => {
    console.log("clicked")
    router.push("/post/addPost")
  }
  useEffect(() => {
    console.log("called")
    dispatch(accessUser())

    console.log("accessUser " + userState.error)

  }, [])
  return (
    <>
      <nav className='mt-4 mb-2 w-8/12 mx-auto grid grid-cols-2'>
        <div className='grid grid-cols-6 '>
          <div>

            <Button onClick={() => {
              router.push("/")
            }}>Blog</Button>
          </div>
          <Input className=' -ml-4 w-5/6 col-start-2 col-end-6  '></Input>
        </div>
        <div className='grid grid-flow-col justify-self-end '>


          {
            userState?.username ?
              <div className='flex flex-row items-center gap-1'>
                <Button variant="outline" onClick={() => handleclik()}>Create Post</Button>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className='cursor-pointer'>
                        <AvatarImage className='' src="https://github.com/shadcn.png" alt="jewel" />
                        <AvatarFallback className="p-2">{userState.username}</AvatarFallback>
                      </Avatar>

                    </PopoverTrigger>
                    <PopoverContent className='w-40' align='end'>
                      <div className=' p-2 cursor-pointer hover:bg-indigo-100 rounded' >
                        {userState.username}
                      </div>
                      <div className=' p-2 cursor-pointer hover:bg-indigo-100 rounded' >
                        Dashboard
                      </div>

                      <div className='cursor-pointer hover:bg-indigo-100 p-2 rounded' onClick={() => logOutHandler()}  >
                        Logout
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div> :
              <div className='grid grid-flow-col gap-x-1'>
                <Button variant="outline" onClick={() => createAccountHandler()}>Create Account</Button>
                <Button onClick={() => loginHandler()}>Login</Button>
              </div>
          }
        </div>
      </nav>

    </>
  )
}


