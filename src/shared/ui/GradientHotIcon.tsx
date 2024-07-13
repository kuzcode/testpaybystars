import clsx from 'clsx';
import Image from 'next/image'
import React from 'react'

interface Props {
    className?: string;
}

export const GradientHotIcon: React.FC<Props> = ({ className }) => {
    return (
        <div className={clsx('bg-gradient-to-tr to-gradientPrimary from-gradientSecondary w-[28px] h-[28px] rounded-full flex items-center justify-center', className)}>
            <Image src={'/icons/hotWhite.svg'} width={15} height={15} alt="hot" className='translate-y-[2px]' />
        </div>
    )
}
