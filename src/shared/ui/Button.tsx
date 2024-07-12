import clsx from 'clsx';
import React from 'react'

interface Props {
    className?: string;
    text: string;
}

export const Button: React.FC<Props> = ({ className, text }) => {
    return (
        <button className={clsx('bg-secondary text-white w-full rounded-2xl h-[52px] font-semibold text-[19px]', className)}>{text}</button>
    )
}
