import Link from "next/link";

export default function Page() {
  return (<div>
    <p>posts </p>
    <p>comments  </p>
    <p>likes </p>


    <Link href={`/`}>home</Link>
  </div>)

}
