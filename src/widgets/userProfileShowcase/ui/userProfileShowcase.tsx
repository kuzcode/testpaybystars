import { Container } from '@/shared/ui/Container'
import { ReactionButtonsGroup } from '@/widgets/reactionButtonsGroup'
import Image from 'next/image'
import React from 'react'

export const UserProfileShowcase = () => {
    return (
        <Container className='flex-1 h-full'>
            <div className="h-[85%] w-full relative">
                <Image src={'/images/girl.png'} fill alt="girl" className="object-cover rounded-lg" loading="eager" />
            </div>
            <ReactionButtonsGroup />
        </Container>

    )
}
