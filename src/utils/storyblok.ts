import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react";

storyblokInit({
  accessToken: process.env.storyblokAcessToken,
  use: [apiPlugin],
});

export const storyblokApi = getStoryblokApi();
