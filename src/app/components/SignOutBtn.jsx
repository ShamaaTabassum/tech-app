'use client'
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'
 
const SignOutBtn = () => {
  const { signOut } = useClerk();
  const router = useRouter()
 
  return (
    // Clicking on this button will sign out a user and reroute them to the "/" (home) page.
    <button onClick={() => signOut(() => router.push("/"))}>
      Sign out
    </button>
  );
};

export default SignOutBtn;