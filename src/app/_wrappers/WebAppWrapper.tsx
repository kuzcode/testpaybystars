'use client'

import React from "react"

export const WebAppWrapper = () => {

  React.useEffect(() => {
    // @ts-ignore
    window.Telegram.WebApp.ready()
    // @ts-ignore
    window.Telegram.WebApp.expand()
    // @ts-ignore
    window.Telegram.WebApp.disableVerticalSwipes()
  }, [])

  return null
}
