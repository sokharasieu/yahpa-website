import { apiPlugin, getStoryblokApi, storyblokInit } from '@storyblok/react'
import isDev from './isDev'

storyblokInit({
  accessToken: isDev()
    ? process.env.storyblokPreviewToken
    : process.env.storyblokAcessToken,
  bridge: true,
  use: [apiPlugin],
})

export const storyblokApi = getStoryblokApi()
