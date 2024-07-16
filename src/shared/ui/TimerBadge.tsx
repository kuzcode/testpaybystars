import React from 'react'
import { Flex } from './Flex'
import Image from 'next/image'
import clsx from 'clsx';

interface Props {
    className?: string;
}

export const TimerBadge: React.FC<Props> = ({ className }) => {
    return (
        <Flex className={clsx('bg-gradient-to-b from-gradientSecondary to-gradientPrimary w-fit py-1 px-3 gap-x-2 rounded-full', className)}>
            <Image src={'/icons/clock.svg'} width={24} height={24} alt='clock' />
            <p className='text-white font-semibold text-[16px] whitespace-nowrap'>2d 10h</p>
        </Flex>
    )
}
