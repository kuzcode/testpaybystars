import { Container } from '@/shared/ui/Container'
import { DismissibleCard } from '@/shared/ui/DismissibleCard'
import { BottomNavigationBar } from '@/widgets/bottomNavigationBar'
import { MainAppBar } from '@/widgets/mainAppBar'
import { Page } from '@/shared/ui/Page'
import React from 'react'

const Likes = () => {
    return (
        <Page disableHeightLimit className='!to-[#DDD7F7] !pb-[100px]'>

            <MainAppBar text='Your likes (24)' shadow />
            <Container className='!mt-4'>
                <div className='space-y-2'>
                    {Array.from({ length: 5 }).map((_, index) => {
                        return <DismissibleCard key={index} index={index} />
                    })}
                </div>
            </Container>

            <BottomNavigationBar className='fixed bottom-0 z-[999]' />

        </Page>
    )
}

export default Likes