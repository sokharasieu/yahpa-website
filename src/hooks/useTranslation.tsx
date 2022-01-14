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
