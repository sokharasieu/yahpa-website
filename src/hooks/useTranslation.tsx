import { useRouter } from "next/router";

type DefaultLanguageResource = typeof en;
type LanguageKey = keyof typeof en;

const en = {
  about: "About Us",
  become_member: "Become a Member",
  coming_soon: "Coming Soon",
  contribute: "Contribute",
  contact: "Contact",
  error_404_title: "Page Not Found",
  error_404_message: "The page you're looking for does not seem to exist",
  error_404_button: "Return to Home",
  follow_social: "Follow us on our Social Media",
  home: "Home",
  languages: "Languages",
  learn_more: "Learn More",
  organization: "Organization",
  projects: "Projects",
  register_cta: "I want to register as a member",
  register_video_title: "Montreal YAHPA registery",
  show_more: "Show more",
  show_less: "Show less",
  support: "Support",
  yahpa: "YAHPA",
  yahpa_full: "Young Asian Health Professional Association",
};

const fr: DefaultLanguageResource = {
  about: "À propos de nous",
  become_member: "Comment devenir membre",
  coming_soon: "Bientôt disponible",
  contribute: "Contribuer",
  contact: "Nous contacter",
  error_404_title: "Page non trouvée",
  error_404_message: "La page que vous recherchez ne semble pas exister",
  error_404_button: "Retourner à l'accueil",
  follow_social: "Suivez-nous sur nos réseaux sociaux",
  home: "Accueil",
  languages: "Langages",
  learn_more: "En savoir plus",
  organization: "Notre Organisation",
  projects: "Projets",
  register_cta: "Je veux m'inscrire en tant que membre",
  register_video_title:
    "Registre des professionnels asiatiques de la santé de Montréal - YAHPA",
  show_more: "voir plus",
  show_less: "voir moin",
  support: "Support",
  yahpa: "AJPAS",
  yahpa_full: "Association des Jeunes Professionnels Asiatique de la Santé",
};

const zh: DefaultLanguageResource = {
  about: "关于我们",
  become_member: "成为会员",
  coming_soon: "即将推出",
  contribute: "贡献",
  contact: "联系我们",
  error_404_title: "找不到网页",
  error_404_message: "您要找的页面似乎不存在",
  error_404_button: "返回主页",
  follow_social: "在社交媒体上关注我们",
  home: "主页",
  languages: "语言",
  learn_more: "学到更多",
  organization: "组织",
  projects: "项目",
  register_cta: "我想注册成为会员",
  register_video_title: "蒙特利尔 YAHPA 登记处",
  show_more: "显示更多",
  show_less: "显示较少",
  support: "支持",
  yahpa: "YAHPA",
  yahpa_full: "亚洲青年健康专业协会",
};

const vi: DefaultLanguageResource = {
  about: "Về chúng tôi",
  become_member: "Trở thành thành viên",
  coming_soon: "Sắp ra mắt",
  contribute: "Góp phần",
  contact: "Tiếp xúc",
  error_404_title: "Không tìm thấy trang",
  error_404_message: "Trang bạn đang tìm kiếm dường như không tồn tại",
  error_404_button: "Trở về Trang chủ",
  follow_social: "Theo chúng tôi",
  home: "Trang chủ",
  languages: "Ngôn ngữ",
  learn_more: "Tìm hiểu thêm",
  organization: "Tổ chức",
  projects: "Dự án",
  register_cta: "Tôi muốn đăng ký làm thành viên",
  register_video_title: "Cơ quan đăng ký YAHPA Montreal",
  show_more: "Cho xem nhiều hơn",
  show_less: "Hiện ít hơn",
  support: "Hỗ trợ",
  yahpa: "YAHPA",
  yahpa_full: "Hiệp hội Chuyên gia Y tế Trẻ Châu Á",
};

const resources = {
  en,
  fr,
  zh,
  vi,
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
    vi: "Tiếng Việt",
  };

  function t(key: LanguageKey) {
    return resources[locale as Resource][key];
  }

  function updateLocale(locale: string | Resource) {
    router.push({ pathname, query }, asPath, { locale });
  }

  function getCurrentLocaleName() {
    return languages[locale as Resource];
  }

  return { t, locales, locale, languages, updateLocale, getCurrentLocaleName };
}
