import { StoriesParams, StoryParams } from "storyblok-js-client";
import {
  GetPathsResult,
  LinkParams,
  LinkPath,
  PageAboutStory,
  PageContactStory,
  PageLandingCovidStory,
  PageLandingStory,
  PageProjectsStory,
} from "types/story";
import isDev from "./isDev";
import { Storyblok } from "./storyblokClient";

const defaultParams: Partial<StoryParams> = {
  version: isDev() ? "draft" : "published",
  cv: Date.now(),
};

export async function getHome(params?: StoryParams): Promise<PageLandingStory> {
  const homepageStory = await Storyblok.getStory("home", {
    ...defaultParams,
    ...params,
    resolve_relations: "card_event.events,list_members.members",
  });

  return homepageStory.data.story;
}

export async function getAbout(params?: StoryParams): Promise<PageAboutStory> {
  const aboutPageStory = await Storyblok.getStory("about", {
    ...defaultParams,
    ...params,
  });

  return aboutPageStory.data.story;
}

export async function getProjects(
  params?: StoriesParams
): Promise<PageProjectsStory[]> {
  const aboutPageStory = await Storyblok.getStories({
    ...defaultParams,
    ...params,
    starts_with: "projects",
  });

  //filter landing and projects here instead

  return aboutPageStory.data.stories;
}

export async function getCovid(
  params?: StoryParams
): Promise<PageLandingCovidStory> {
  const covidPageStory = await Storyblok.getStory("covid-19", {
    ...defaultParams,
    ...params,
  });

  return covidPageStory.data.story;
}

export async function getContact(
  params?: StoryParams
): Promise<PageContactStory> {
  const covidPageStory = await Storyblok.getStory("contact", {
    ...defaultParams,
    ...params,
  });

  return covidPageStory.data.story;
}

// getStoriesPaths returns all possible paths by locale
// best used with a starts_with param query to limit the number of pages

export async function getStoriesPaths(params?: LinkParams, locales?: string[]) {
  const response: GetPathsResult = await Storyblok.get("cdn/links", params);
  const { links } = response.data;
  let paths: LinkPath[] = [];

  if (locales) {
    for (const locale of locales) {
      Object.keys(links).forEach((link_id) => {
        if (!links[link_id].is_startpage && !links[link_id].is_folder) {
          const result = {
            params: {
              slug: [locale],
              locale,
            },
          };

          paths.push(result);
        }
      });
    }
  }

  return paths;
}
