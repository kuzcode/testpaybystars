import clsx from 'clsx';
import React from 'react'

interface Props {
    className?: string;
    text: string;
    disabled?: boolean
}

export const Button: React.FC<Props> = ({ className, text, disabled = false }) => {
    return (
        <button disabled={disabled} className={clsx('text-white w-full rounded-2xl h-[52px] font-semibold text-[19px]', className, {
            '!bg-[#D2D2D2]': disabled,
            'bg-secondary': !disabled
        })}>{text}</button>
    )
}
