import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Container } from '@/shared/ui/Container'
import { Flex } from '@/shared/ui/Flex'
import { GradientHotIcon } from '@/shared/ui/GradientHotIcon'
import { Page } from '@/shared/ui/Page'
import { MainAppBar } from '@/widgets/mainAppBar'
import Image from 'next/image'
import React from 'react'

const CreateProfile = () => {
    const tags = ['musician', 'marketer', 'artist', 'tough', 'guy']
    return (
        <Page className='!to-[#F5F4F9]'>
            <Container>
                <MainAppBar text='Create Profile'>
                    <GradientHotIcon text='4123' />
                </MainAppBar>

                <Card className='mt-8 !py-6'>
                    <h3 className='text-secondary font-bold text-[16px]'>About your soul mate</h3>
                    <div className='border border-[#000000]/40 rounded-lg p-3 mt-4'>
                        <textarea placeholder="A few words about the person who you're looking for" className='placeholder-[#CCCCCC] text-secondary font-medium text-[18px] outline-none resize-none w-full h-[200px] bg-transparent'></textarea>
                    </div>
                    <Flex className='flex-wrap gap-2 mt-4'>
                        {tags.map((tag, index) => {
                            return <span key={index} className='text-primary text-[17px]'>{tag}</span>
                        })}
                    </Flex>
                    <h3 className='text-secondary font-bold text-[16px] mt-4 mb-3'>Status</h3>
                    <div className='flex items-center justify-between border border-black/40 p-3 rounded-xl'>
                        <h4>Single</h4>
                        <Image src={'/icons/arrowDown.svg'} width={15} height={15} alt='arrow-down' />
                    </div>
                </Card>

                <Button text='Continue' className='mt-4' />

            </Container>
        </Page>

    )
}

export default CreateProfile