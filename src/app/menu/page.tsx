'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Menu = () => {
    const pages = ['profile', 'settings', 'search', 'favorites', 'wallet']
    const router = useRouter()

    const goBack = () => router.back()

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <button onClick={goBack}><Image src={'/icons/blackClose.svg'} width={60} height={60} alt="close" className='absolute top-[40px] left-1/2 -translate-x-1/2' /></button>
            <div className='flex flex-col space-y-10 text-center w-full'>
                {pages.map((page) => {
                    return <div key={page} className='relative'>
                        <Link href={`/${page}`} className='!w-[200px] text-[#202020] font-bold capitalize text-[28px] bg-white px-12 relative z-[99]'>{page}</Link>
                        {/* <div className='bg-primary h-[4px] w-full absolute top-1/2 -translate-y-1/2 z-[10]' /> */}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Menu