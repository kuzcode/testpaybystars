import { Container } from '@/shared/ui/Container'
import { Flex } from '@/shared/ui/Flex'
import { HotScoreBadge } from '@/shared/ui/HotScoreBadge'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    text: string;
    children?: React.ReactNode;
}

export const MainAppBar: React.FC<Props> = ({ text, children }) => {
    return (
        <Flex className="justify-between pt-4">
            <Flex className="gap-x-4">
                <Link href={'/menu'}><Image src={'/icons/menu.svg'} width={26} height={24} alt="menu" /></Link>
                <h3 className="font-bold text-[26px]">{text}</h3>
            </Flex>
            <Flex className="gap-x-3">
                {children}
                <HotScoreBadge count={523} />
            </Flex>
        </Flex>

    )
}
