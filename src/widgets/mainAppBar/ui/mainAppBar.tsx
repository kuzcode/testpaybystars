import { Flex } from '@/shared/ui/Flex'
import { HotScoreBadge } from '@/shared/ui/HotScoreBadge'
import Image from 'next/image'
import React from 'react'

export const MainAppBar = () => {
    return (
        <Flex className="justify-between px-4">
            <Flex className="gap-x-4">
                <button className=""><Image src={'/icons/menu.svg'} width={26} height={24} alt="menu" /></button>
                <h3 className="font-bold text-[26px]">Search</h3>
            </Flex>
            <Flex className="gap-x-3">
                <Image src={'/icons/filter.svg'} width={28} height={26} alt="filter" />
                <HotScoreBadge count={523} />
            </Flex>
        </Flex>
    )
}
