import { Container } from '@/shared/ui/Container'
import { Flex } from '@/shared/ui/Flex'
import { HotScoreBadge } from '@/shared/ui/HotScoreBadge'
import { MenuButton } from '@/shared/ui/MenuButton'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    text: string;
    children?: React.ReactNode;
    shadow?: boolean;
    className?: string
}

export const MainAppBar: React.FC<Props> = ({ text, children, shadow = false, className }) => {
    return (
        <Flex className={clsx(" pt-4 pb-3 mb-4", {
            'shadow-sm': shadow
        }, className)}>
            <Container className='w-full'>
                <Flex className='justify-between'>
                    <Flex className="gap-x-4">
                        <MenuButton />
                        <h3 className="font-bold text-[26px]">{text}</h3>
                    </Flex>
                    <Flex className="gap-x-3">
                        {children}
                    </Flex>
                </Flex>
            </Container>
        </Flex>

    )
}
