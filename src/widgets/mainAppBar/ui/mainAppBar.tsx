import { Container } from '@/shared/ui/Container'
import { Flex } from '@/shared/ui/Flex'
import { HotScoreBadge } from '@/shared/ui/HotScoreBadge';
import clsx from 'clsx'
import React from 'react'

interface Props {
    text: string;
    children?: React.ReactNode;
    shadow?: boolean;
    className?: string
    enableScore?: boolean
}

export const MainAppBar: React.FC<Props> = ({ text, children, shadow = false, className, enableScore = false }) => {
    return (
        <Flex className={clsx(" pt-4 pb-3 mb-4", {
            'shadow-sm': shadow
        }, className)}>
            <Container className='w-full'>
                <Flex className='justify-between'>
                    <Flex className="gap-x-4">
                        {/* <MenuButton /> */}
                        <h3 className="font-bold text-[26px]">{text}</h3>
                    </Flex>
                    <Flex className="gap-x-3">
                        {children}
                        {enableScore && <HotScoreBadge count={523} />}
                    </Flex>
                </Flex>
            </Container>
        </Flex>

    )
}
