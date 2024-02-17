import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (<>
    <div>
      list of users
    </div>
    <div>
      <Button className='mx-2'>
        <Link href={`/`}>Home</Link> </Button>

    </div>
  </>
  )
}
