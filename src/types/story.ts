import {
  StoryData,
  StoryblokComponent,
  StoryblokResult,
} from "storyblok-js-client";

type SingleImageAsset = {
  alt?: string;
  copyright?: string;
  fieldtype?: "asset";
  filename?: string;
  focus?: null;
  id?: number;
  name?: string;
  title?: string;
};

export type StoryResult<T> = StoryData<StoryblokComponent<string> & T>;

export type PageHome = {
  title?: string;
  description?: string;
  image?: SingleImageAsset;
};

export interface GetPathsResult extends StoryblokResult {
  data: StoryblokLinks;
}

export type LinkPath = {
  params: {
    slug: string[];
  };
};

export type StoryblokLinks = {
  links: {
    [link_id: string]: StoryblokLink;
  };
};

export type LinkParams = {
  starts_with?: string;
  version?: "published" | "draft";
};

export type StoryblokLink = {
  id: number;
  slug: string;
  name: string;
  is_folder: boolean;
  parent_id: number;
  published: boolean;
  path: string;
  position: number;
  uuid: string;
  is_startpage: boolean;
  real_path: string;
};
