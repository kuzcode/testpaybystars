import { Container } from '@/shared/ui/Container'
import { DismissibleCard } from '@/shared/ui/DismissibleCard'
import { Page } from '@/shared/ui/Page'
import { MainAppBar } from '@/widgets/mainAppBar'
import React from 'react'

const MatchesPage = () => {
    return (
        <Page disableHeightLimit className='!to-[#DDD7F7] !pb-[100px]'>

            <MainAppBar text='Your matches (17)' shadow />
            <Container className='!mt-4'>
                <div className='space-y-2'>
                    {Array.from({ length: 10 }).map((_, index) => {
                        return <DismissibleCard key={index} index={index + 1} />
                    })}
                </div>
            </Container>
        </Page>
    )
}

export default MatchesPage