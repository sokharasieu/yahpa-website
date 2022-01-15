import { StoryParams } from "storyblok-js-client";
import {
  GetPathsResult,
  LinkParams,
  LinkPath,
  PageHome,
  StoryResult,
} from "types/story";
import isDev from "./isDev";
import { Storyblok } from "./storyblokClient";

const defaultParams: Partial<StoryParams> = {
  version: isDev() ? "draft" : "published",
  cv: Date.now(),
};

export async function getHome(
  params?: StoryParams
): Promise<StoryResult<PageHome>> {
  const response = await Storyblok.getStory("home", {
    ...defaultParams,
    ...params,
  });
  return response.data.story;
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
          const slug = links[link_id].real_path;
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
