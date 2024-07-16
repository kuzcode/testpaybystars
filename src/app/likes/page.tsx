import { Card } from '@/shared/ui/Card'
import { Container } from '@/shared/ui/Container'
import { DismissibleCard } from '@/shared/ui/DismissibleCard'
import { Flex } from '@/shared/ui/Flex'
import { HotScoreBadge } from '@/shared/ui/HotScoreBadge'
import { Page } from '@/shared/ui/Page'
import { BottomNavigationBar } from '@/widgets/bottomNavigationBar'
import { MainAppBar } from '@/widgets/mainAppBar'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const Likes = () => {
    return (
        <Page className='!to-[#DDD7F7]'>
            <MainAppBar text='Your likes (24)' shadow />
            <Container className='!mt-4'>
                <div className='space-y-2'>
                    {Array.from({ length: 5 }).map((_, index) => {
                        return <DismissibleCard key={index} index={index} />
                    })}
                </div>
            </Container>

            <BottomNavigationBar className='fixed bottom-0' />

        </Page>
    )
}

export default Likes