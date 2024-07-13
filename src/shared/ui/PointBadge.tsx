import clsx from 'clsx';
import React from 'react'

interface Props {
    className?: string;
    text?: string
}

export const PointBadge: React.FC<Props> = ({ className, text }) => {
    return (
        <div className={clsx('w-4 h-4 rounded-full border border-primary bg-white flex items-center justify-center relative', className)}>
            <div className='w-2 h-2 rounded-full bg-gradient-to-tr from-gradientPrimary to-gradientSecondary'></div>
            {text && <h3 className='absolute top-full translate-y-[10px] font-semibold text-[#857889] text-[13px]'>{text}</h3>}
        </div>
    )
}
