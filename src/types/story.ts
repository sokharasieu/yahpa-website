import {
  StoryData,
  StoryblokComponent,
  StoryblokResult,
  Richtext,
} from "storyblok-js-client";

export type SingleImageAsset = {
  alt?: string;
  copyright?: string;
  fieldtype?: "asset";
  filename?: string;
  focus?: null;
  id?: number;
  name?: string;
  title?: string;
};

export type LinkAsset = {
  url: string;
  cached_url: string;
};

export type StoryResult<T> = StoryData<StoryblokComponent<string> & T>;

export type GetHome = {
  home: StoryResult<PageHome>;
  latestPost: StoryResult<StoryNews>;
};

export type PageHome = {
  title?: string;
  description?: string;
  image?: SingleImageAsset;
  latestPost?: StoryNews;
  register_description?: Richtext;
  register_video_link?: LinkAsset;
  option_title?: string;
  option_items?: Option[];
};

export type StoryNews = {
  title?: string;
  date?: Date;
  image?: SingleImageAsset;
  description?: Richtext;
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

export type Option = {
  image?: SingleImageAsset;
  title?: string;
  call_to_action: string;
  link?: LinkAsset;
};
