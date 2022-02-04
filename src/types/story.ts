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

export type PageLandingStory = StoryResult<PageLandingBlok>;
export type PageAboutStory = StoryResult<PageAboutBlok>;
export type ArticleEventStory = StoryResult<ArticleEventBlok>;
export type PageLandingCovidStory = StoryResult<PageLandingCovidBlok>;
export type PageContactStory = StoryResult<PageContactBlok>;

export type PageLandingBlok = {
  title?: string;
  description?: string;
  image?: SingleImageAsset;
  latestPost?: ArticleEventBlok;
  register_title?: string;
  register_description?: Richtext;
  register_video_link?: LinkAsset;
  register_links?: ButtonLinkBlok[];
  option_title?: string;
  option_description?: string;
  option_items?: Option[];
  event_title?: string;
  event_description?: string;
  event_latest?: CardEventBlok[];
  seo?: SeoBlok;
};

export type PageAboutBlok = {
  page_title?: string;
  mission_text?: Richtext;
  mission_image?: SingleImageAsset;
  goals_text?: Richtext;
  goals_table?: ItemGoalBlok[];
  values_text?: Richtext;
  values_image?: SingleImageAsset;
  members_title?: string;
  members?: ListMembersBlok[];
  seo?: SeoBlok;
};

export type PageLandingCovidBlok = {
  page_title?: string;
  page_description?: Richtext;
  page_image?: SingleImageAsset;
  documents_title?: string;
  documents?: DocumentCovidBlok[];
  seo?: SeoBlok;
};

export type PageContactBlok = {
  page_title?: string;
  page_text?: string;
  options?: any[];
  seo?: SeoBlok;
};

export type ItemGoalBlok = {
  _uid?: string;
  text?: string;
};

export type CardEventBlok = {
  component?: string;
  events?: StoryResult<ArticleEventBlok>[];
};

export type ListMembersBlok = {
  component?: string;
  members?: StoryResult<TeamMemberBlok>[];
};

export type ArticleEventBlok = {
  title?: string;
  date?: Date;
  image?: SingleImageAsset;
  description?: Richtext;
};

export type TeamMemberBlok = {
  name?: string;
  position?: string;
  image?: SingleImageAsset;
  description?: Richtext;
  languages?: string[];
};

export type DocumentCovidBlok = {
  title?: string;
  date_updated?: Date;
  description?: Richtext;
  image?: SingleImageAsset;
  documents?: SingleImageAsset[];
  _uid?: string;
};

export type SeoBlok = {
  _uid: string;
  title?: string;
  plugin: "seo_metatags";
  og_image?: string;
  og_title?: string;
  description?: string;
  twitter_image?: string;
  twitter_title?: string;
  og_description?: string;
  twitter_description?: string;
};

export type ButtonLinkBlok = {
  title?: string;
  link?: LinkAsset;
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
