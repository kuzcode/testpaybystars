import clsx from 'clsx';
import Image from 'next/image'
import React from 'react'
import { Flex } from './Flex';

interface Props {
    className?: string;
    text?: string;
    showBalance?: boolean
}

export const GradientHotIcon: React.FC<Props> = ({ className, text, showBalance }) => {
    return (
        <Flex className={clsx('', {
            'gap-x-2': text || showBalance
        })}>
            <div className={clsx('bg-gradient-to-tr to-gradientPrimary from-gradientSecondary w-[26px] h-[26px] rounded-full flex items-center justify-center', className)}>
                <Image src={'/icons/hotWhite.svg'} width={14} height={14} alt="hot" className='translate-y-[2px]' />
            </div>
            {text && <h4 className='text-black font-bold text-[21px]'>{text}</h4>}
            {showBalance && !text && <h4 className='text-black font-bold text-[21px]'>4312</h4>}
        </Flex>
    )
}
