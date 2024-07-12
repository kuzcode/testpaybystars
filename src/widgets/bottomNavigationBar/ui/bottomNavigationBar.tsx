import { Flex } from '@/shared/ui/Flex'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
    className?: string;
}

export const BottomNavigationBar: React.FC<Props> = ({ className }) => {
    return (
        <Flex className={clsx("bg-white justify-around h-[85px] w-full rounded-t-[54px]", className)}>
            <Image src={'/icons/navbarHomeInactive.svg'} width={32} height={32} alt="home" />
            <Image src={'/icons/navbarHotInactive.svg'} width={32} height={30} alt="hot" />
            <Image src={'/icons/navbarLikeInactive.svg'} width={34} height={34} alt="like" />
            <Image src={'/icons/navbarProfileInactive.svg'} width={30} height={28} alt="profile" />
        </Flex>
    )
}
