import React from 'react'
import { Flex } from './Flex';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
    className?: string;
    count: number;
}

export const HotScoreBadge: React.FC<Props> = ({ className, count }) => {
    return (
        <Flex className={clsx("bg-gradient-to-tr from-gradientSecondary to-gradientPrimary h-[37px] px-3 gap-x-2 rounded-full", className)}>
            <h3 className="text-white font-semibold text-[20px]">{count}</h3>
            <Image src={'/icons/hotWhite.svg'} width={20} height={20} alt="hot" className="translate-y-0.5" />
        </Flex>
    )
}
