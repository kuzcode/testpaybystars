import { BottomNavigationBar } from '@/widgets/bottomNavigationBar'
import React from 'react'

const BottomNavbarLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
            <BottomNavigationBar />
        </div>
    )
}

export default BottomNavbarLayout