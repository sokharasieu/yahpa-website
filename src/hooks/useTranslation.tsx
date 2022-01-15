import { useRouter } from "next/router";

type DefaultLanguageResource = typeof en;
type LanguageKey = keyof typeof en;

const en = {
  home: "Home",
  projects: "Projects",
  about: "About Us",
  contribute: "Contribute",
  contact: "Contact",
  yahpa: "YAHPA",
  yahpa_full: "Young Asian Health Professional Association",
  organization: "Organization",
  languages: "Languages",
  support: "Support",
  coming_soon: "Coming Soon",
  error_404_title: "Page Not Found",
  error_404_message: "The page you're looking for does not seem to exist",
  error_404_button: "Return to Home",
  learn_more: "Learn More",
  see_more_events: "See more events",
  become_member: "Become a Member",
  latest_activity: "Our Latest Activity",
};

const fr: DefaultLanguageResource = {
  home: "Accueil",
  projects: "Projets",
  about: "Découvrez-nous",
  contribute: "Contribuer",
  contact: "Nous contacter",
  yahpa: "AJPAS",
  yahpa_full: "Association des Jeunes Professionnels Asiatique de la Santé",
  organization: "Notre Organisation",
  languages: "Langages",
  support: "Support",
  coming_soon: "Bientôt disponible",
  error_404_title: "Page non trouvée",
  error_404_message: "La page que vous recherchez ne semble pas exister",
  error_404_button: "Retourner à l'accueil",
  learn_more: "En savoir plus",
  see_more_events: "Voir nos projets",
  become_member: "Comment devenir membre",
  latest_activity: "Notre dernière activité",
};

const zh: DefaultLanguageResource = {
  home: "主页",
  projects: "项目",
  about: "关于我们",
  contribute: "贡献",
  contact: "联系我们",
  yahpa: "YAHPA",
  yahpa_full: "Young Asian Health Professional Association",
  organization: "组织",
  languages: "语言",
  support: "支持",
  coming_soon: "即将推出",
  error_404_title: "找不到网页",
  error_404_message: "您要找的页面似乎不存在",
  error_404_button: "返回主页",
  learn_more: "学到更多",
  see_more_events: "查看我们的项目",
  become_member: "成为会员",
  latest_activity: "我们的最新活动",
};

const resources = {
  en,
  fr,
  zh,
} as const;

export type Resource = keyof typeof resources;

type TranslatedLanguageName = {
  [language in Resource]: string;
};

export default function useTranslation() {
  const router = useRouter();
  const { locales, locale, pathname, asPath, query } = router;

  const languages: TranslatedLanguageName = {
    en: "English",
    fr: "Français",
    zh: "简体中文",
  };

  function t(key: LanguageKey) {
    return resources[locale as Resource][key];
  }

  function updateLocale(locale: string | Resource) {
    router.push({ pathname, query }, asPath, { locale });
  }

  return { t, locales, locale, languages, updateLocale };
}
