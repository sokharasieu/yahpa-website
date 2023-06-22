import { StoryParams } from '@storyblok/react'
import { PageAboutStory, PageLandingStory } from 'types/story'
import { storyblokApi } from './storyblok'

type sbLinkObject = {
  id: number
  slug?: string
  name: string
  is_folder: boolean
  parent_id: number
  published: boolean
  path?: string
  uuid: string
  is_startpage: boolean
  real_path: string
}

type sbLinksResult = {
  links: {
    [key in string]: sbLinkObject
  }
}

export type LinkPath = {
  params: {
    slug: string[]
  }
}

export type LinkParams = {
  starts_with?: string
}

const defaultParams: Partial<StoryParams> = {
  version: 'published',
  cv: Date.now(),
}

export async function getHomeV2(params?: StoryParams) {
  try {
    const { data } = await storyblokApi.getStory('home', {
      ...defaultParams,
      ...params,
      resolve_relations:
        'card_event.events,list_members.members,list_sponsors.sponsors',
    })

    const story = data.story as PageLandingStory

    return story
  } catch (error) {
    console.error(error)
  }
}

export async function getAboutV2(params?: StoryParams) {
  try {
    const { data } = await storyblokApi.getStory('about', {
      ...defaultParams,
      ...params,
      resolve_relations: 'list_members.members',
    })

    const story = data.story as PageAboutStory

    return story
  } catch (error) {
    console.error(error)
  }
}

export async function getStoriesPathsV2(
  params?: LinkParams,
  locales?: string[]
) {
  const { data } = await storyblokApi.get('cdn/links', params)
  const links = data.links as sbLinksResult['links']

  const paths: LinkPath[] = []

  if (locales) {
    for (const locale of locales) {
      Object.keys(links).forEach((link_id: string) => {
        if (!links[link_id].is_startpage && !links[link_id].is_folder) {
          const result = {
            params: {
              slug: [locale],
              locale,
            },
          }
          paths.push(result)
        }
      })
    }
  }
  return paths
}
