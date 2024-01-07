import Image from 'next/image'
import Link from 'next/link'
import Profile from './profile/page'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main >
      <div>
        <Button><Link href="/profile">profile</Link>
        </Button>
        <Button className='mx-2'>
          <Link href={`/blog/create-blog`}>Create Blog</Link>
        </Button>
        <Button className='mx-2'>
          <Link href={`/users`}>total users</Link>
        </Button>
<Button className='mx-2'>
          <Link href={`/users/connected-users`}>connected users</Link>
        </Button>
        <Button className='mx-2'>
          <Link href={`/profile/register`}>register</Link>
        </Button>
<Button className='mx-2'>
          <Link href={`/chat`}>chat</Link>
        </Button>

      </div>

    </main >
  )
}
