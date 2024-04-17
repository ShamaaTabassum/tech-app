import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-blue-500 p-6'>
        <div className='container flex justify-between'>
            <Link href='/'>FOUNDATION</Link>
            <div className='flex gap-4'>
            <Link href='/sign-up'>Sign Up</Link>
            <Link href='/sign-in'>Sign In</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar