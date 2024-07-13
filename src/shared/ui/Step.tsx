import React from 'react'
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
    icon: 'tick' | 'ton' | 'roundedLock';
    title: string
    subTitle: string
    actions?: JSX.Element
    showLine?: boolean
}

export const Step: React.FC<Props> = ({ icon, title, subTitle, actions, showLine = true }) => {
    return (
        <div className={clsx('parent flex items-start gap-x-3 relative', {
            'mb-6': showLine
        })}>
            <div className='flex flex-col items-center gap-y-2'>
                {/* <img src={`/icons/${icon}.svg`} /> */}
                <Image src={`/icons/${icon}.svg`} width={30} height={30} alt={icon} />
            </div>
            {showLine && <div className='absolute w-[4px] h-[calc(100%-20px)] top-[37px] translate-x-[13px] rounded-full bg-[#DBDBDB]' />}
            <div>
                <h3 className="text-[17px] text-secondary font-bold">{title}</h3>
                <h4 className='text-[15px] leading-[17px] text-[#CCCCCC]'>{subTitle}</h4>
                {actions}
            </div>
        </div>
    )
}
