import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Container } from '@/shared/ui/Container'
import { Flex } from '@/shared/ui/Flex'
import { GradientHotIcon } from '@/shared/ui/GradientHotIcon'
import { Page } from '@/shared/ui/Page'
import { PointBadge } from '@/shared/ui/PointBadge'
import { Step } from '@/shared/ui/Step'
import { MainAppBar } from '@/widgets/mainAppBar'
import Image from 'next/image'
import React from 'react'

const COUNTRIES = ['Monkey', 'Elephant', 'Lion']

const Profile = () => {
    return (
        <Page disableHeightLimit>
            <Container>
                <MainAppBar text='Profile'>
                    <GradientHotIcon text='4123' />
                </MainAppBar>

                <div className='space-y-3'>
                    <Card className='!pb-3'>
                        <Flex className='justify-between !items-start mb-4'>
                            <div>
                                <h3 className='text-[#857889]'>Your Balance</h3>
                                <Flex className='gap-x-2'>
                                    <h3 className="font-bold text-[26px]">678</h3>
                                    {/* <Image src={'/icons/roundedGradientHot.svg'} width={28} height={28} alt="hot" /> */}
                                    <GradientHotIcon />
                                </Flex>
                                <h3 className='text-[#857889]'>from 100,000</h3>
                            </div>
                            <div className='text-right'>
                                <h3 className='text-[#857889]'>Rate</h3>
                                <Flex className='gap-x-2'>
                                    <h3 className="font-bold text-[26px]">50%</h3>
                                    <Image src={'/icons/blackRoundedInfo.svg'} width={25} height={25} alt="hot" />
                                </Flex>
                            </div>
                        </Flex>

                        <div className='relative bg-[#D9D9D9]/[36%] h-2.5 mt-2 mb-8 rounded-full border-y border-[#000000]/[9%]'>

                            <div className='absolute inset-y-0 left-0 w-4 h-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FEFEE9] to-transparent'></div>
                            <div className='absolute inset-y-0 right-0 w-4 h-4 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[#FEFEE9] to-transparent'></div>

                            <div className='w-full abolsute top-1/2 left-0 h-[10px] flex items-center justify-around -translate-y-[1px]'>
                                {COUNTRIES.map((country, idx) => {
                                    return <PointBadge key={idx} text={country} />
                                })}
                            </div>
                        </div>

                        <Button text='Deposit' className='mt-4' />
                    </Card>

                    <Card>
                        <div>
                            <h3 className='text-[#857889]'>Total gained</h3>
                            <Flex className='gap-x-2'>
                                <h3 className="font-bold text-[26px]">678 USDT <span className='text-[#CCCCCC]'>~ 0 RUB</span></h3>
                            </Flex>
                            <h3 className='text-[#857889]'>Available for withdraw: 0 USDT</h3>
                            <Button text='Get Bonus' disabled className='mt-3' />
                        </div>
                    </Card>

                    <Card>
                        <Step
                            title='Connect a ton wallet'
                            subTitle='Connect the TON wallet to deposit bonuses'
                            icon='ton'
                            actions={<Button text='Connect Wallet' className='mt-3 !w-[200px] bg-gradient-to-b to-gradientPrimary from-gradientSecondary' />}
                        />
                        <Step
                            title='Get bonuses'
                            subTitle='Get bonuses daily'
                            icon='roundedLock'
                            showLine={false}
                        />
                    </Card>

                </div>

            </Container>
        </Page>
    )
}

export default Profile