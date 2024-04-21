import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pt-8">
        <SignIn />
        {/* <div className="pt-2 ps-[2rem]">
          <p class="text-sm font-light text-white dark:text-white">
            Forget Password? <Link href="/forgot-password" class="font-medium text-blue-500 hover:underline dark:text-blue-500">Reset here!</Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}