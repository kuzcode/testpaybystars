import { HotScoreBadge } from '@/shared/ui/HotScoreBadge';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react'

interface Props {
    className?: string;
}

export const ReactionButtonsGroup: React.FC<Props> = ({ className }) => {
    return (
        <div className={clsx("flex items-center justify-center -mt-[30px] gap-x-3 relative z-[9]")}>
            <div className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-sm">
                <Image priority src={'/icons/close.svg'} width={30} height={30} alt="telegram" />
            </div>
            <div className="relative w-[90px] h-[90px] rounded-full bg-white flex items-center justify-center shadow-sm">
                <Image priority src={'/icons/telegram.svg'} width={46} height={46} alt="telegram" className="-translate-x-[3px]" />
                <HotScoreBadge count={-25} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[12px] w-full scale-[0.75]" />
            </div>
            <div className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-sm">
                <Image priority src={'/icons/greenHeart.svg'} width={34} height={34} alt="telegram" />
            </div>
        </div>
    )
}
