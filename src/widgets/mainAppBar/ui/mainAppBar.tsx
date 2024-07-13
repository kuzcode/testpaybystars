import { Container } from '@/shared/ui/Container'
import { Flex } from '@/shared/ui/Flex'
import { HotScoreBadge } from '@/shared/ui/HotScoreBadge'
import { MenuButton } from '@/shared/ui/MenuButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    text: string;
    children?: React.ReactNode;
}

export const MainAppBar: React.FC<Props> = ({ text, children }) => {
    return (
        <Flex className="justify-between pt-4 mb-4">
            <Flex className="gap-x-4">
                <MenuButton />
                <h3 className="font-bold text-[26px]">{text}</h3>
            </Flex>
            <Flex className="gap-x-3">
                {children}
                <HotScoreBadge count={523} />
            </Flex>
        </Flex>

    )
}
