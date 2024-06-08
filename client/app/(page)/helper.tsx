import { dateConvert } from "@/components/home/page";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function PostComponet({ _id, author, slug, createdAt, title, detailPostHandler, }: { _id: string, slug: string, author: string, title: string, createdAt: string, detailPostHandler: (slug: string, author: string) => void }) {
  return (
    <Card className='' >
      <div className='grid grid-cols-12 py-2'>
        <div className=' col-start-1 col-end-2'>
          <Avatar className='w-10 h-10 mx-2'>
            <AvatarImage className='' src="https://github.com/shadcn.png" alt="jewel" />
            <AvatarFallback>{author}</AvatarFallback>
          </Avatar>
        </div>
        <div className='col-start-2 col-end-13 ml-6' >
          <p className=' '>{author ? author : "no username found"} </p>
          <p className=' text-gray-400 text-xs'>{

            dateConvert(createdAt)
          }</p>
          <CardTitle className=''>
            <CardHeader className='pl-0 cursor-pointer' onClick={() => detailPostHandler(slug, author)}>{title}</CardHeader>
          </CardTitle>
          <CardFooter className='p-0'>
            <div className='grid grid-flow-col gap-x-5'>
              {/* <div  >like</div> */}
              {/* <div>comment </div> */}
              {/* <div>save</div> */}
            </div>
          </CardFooter>
        </div>
      </div>

    </Card>


  )
}
