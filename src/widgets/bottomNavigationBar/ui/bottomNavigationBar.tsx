'use client'

import clsx from 'clsx'
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flex } from '@/shared/ui/Flex'
import Image from 'next/image'

interface Props {
    className?: string;
}

const navLinks = [
    {
        url: "/search",
        activeIcon: "/icons/navbarHomeActive.svg",
        inactiveIcon: "/icons/navbarHomeInactive.svg",
        alt: "home",
        width: 32,
        height: 32
    },
    {
        url: "/hot",
        activeIcon: "/icons/navbarHotInactive.svg",
        inactiveIcon: "/icons/navbarHotInactive.svg",
        alt: "hot",
        width: 32,
        height: 30
    },
    {
        url: "/likes",
        activeIcon: "/icons/navbarLikeActive.svg",
        inactiveIcon: "/icons/navbarLikeInactive.svg",
        alt: "like",
        width: 34,
        height: 34
    },
    {
        url: "/profile",
        activeIcon: "/icons/navbarProfileActive.svg",
        inactiveIcon: "/icons/navbarProfileInactive.svg",
        alt: "profile",
        width: 30,
        height: 28
    }
]

export const BottomNavigationBar: React.FC<Props> = ({ className }) => {
    const pathname = usePathname()

    return (
        <Flex className={clsx("bg-white justify-around border border-[#DFDFDF] h-[85px] w-full rounded-t-[54px]", className)}>
            {navLinks.map((link, index) => {
                const isActive = link.url === pathname
                const iconUrl = isActive ? link.activeIcon : link.inactiveIcon
                return <Link key={index} href={link.url}><Image src={iconUrl} width={link.width} height={link.height} alt={link.alt} /></Link>
            })}
        </Flex>
    )
}
