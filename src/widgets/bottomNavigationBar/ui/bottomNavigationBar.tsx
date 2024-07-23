'use client'

import clsx from 'clsx'
import React from 'react'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
        url: "/matches",
        activeIcon: "/icons/navbarHotActive.svg",
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
    const router = useRouter()

    // const goToPage = (page: string) => router.push(page)

    return (
        <Flex className={clsx("fixed bottom-0 bg-white justify-around border border-[#DFDFDF] h-[85px] w-full rounded-t-[54px] z-[999]", className)}>
            {navLinks.map((link, index) => {
                const isActive = link.url === pathname
                // const iconUrl = isActive ? link.activeIcon : link.inactiveIcon
                const iconUrl = link.activeIcon
                return <Link href={link.url} key={index} >
                    {/* active */}
                    <Image src={link.activeIcon} priority={true} width={link.width} height={link.height} alt={link.alt} className={clsx('', {
                        'opacity-100 relative': isActive,
                        'opacity-0 absolute': !isActive,
                    })} />
                    {/* inactive */}
                    <Image src={link.inactiveIcon} priority={true} width={link.width} height={link.height} alt={link.alt} className={clsx('', {
                        'opacity-100 relative': !isActive,
                        'opacity-0 absolute': isActive,
                    })} />
                </Link>
            })}
        </Flex>
    )
}
