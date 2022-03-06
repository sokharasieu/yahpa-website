import { useRouter } from "next/router";

type DefaultLanguageResource = typeof en;
type LanguageKey = keyof typeof en;

const en = {
  about: "About Us",
  become_member: "Become a Member",
  chat: "Need to chat?",
  coming_soon: "Coming Soon",
  contribute: "Contribute",
  contact: "Contact",
  donate: "Donate",
  email_email: "Your email",
  email_error: "An error has occured, we are unable to send your message",
  email_message: "Your message",
  email_name: "Your name",
  email_send_message: "Send message",
  email_success: "Your message has been sent",
  email_reason: "Select the reason for contacting us",
  email_email_required: "A valid email is required",
  email_message_required: "Please write us your message",
  email_name_required: "Your name is required",
  email_reason_required: "Please select the reason for your contact with us",
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
  updated_on: "Updated on",
  yahpa: "YAHPA",
  yahpa_full: "Young Asian Health Professional Association",
};

const fr: DefaultLanguageResource = {
  about: "À propos de nous",
  become_member: "Comment devenir membre",
  chat: "Besoin de discuter?",
  coming_soon: "Bientôt disponible",
  contribute: "Contribuer",
  contact: "Nous contacter",
  donate: "Donation",
  email_email: "Votre adresse courriel",
  email_error:
    "Une erreur s'est produite, nous ne pouvons pas envoyer votre message",
  email_message: "Votre message",
  email_name: "Votre nom",
  email_send_message: "Envoyer le message",
  email_success: "Votre message a été envoyé",
  email_reason: "Sélectionnez la raison pour laquelle vous nous contactez",
  email_email_required: "Une adresse courriel valide est requise",
  email_message_required: "Veuillez nous écrire votre message",
  email_name_required: "Votre nom est requis",
  email_reason_required:
    "Veuillez sélectionner la raison de votre contact avec nous",
  error_404_title: "Page non trouvée",
  error_404_message: "La page que vous recherchez ne semble pas exister",
  error_404_button: "Retourner à l'accueil",
  follow_social: "Suivez-nous sur nos réseaux sociaux",
  home: "Accueil",
  languages: "Langages",
  learn_more: "En savoir plus",
  organization: "Notre Organisation",
  projects: "Nos projets",
  register_cta: "Je veux m'inscrire en tant que membre",
  register_video_title:
    "Registre des professionnels asiatiques de la santé de Montréal - YAHPA",
  show_more: "voir plus",
  show_less: "voir moin",
  support: "Support",
  updated_on: "Dernière mise à jour le",
  yahpa: "AJPAS",
  yahpa_full: "Association des Jeunes Professionnels Asiatique de la Santé",
};

const zh: DefaultLanguageResource = {
  about: "关于我们",
  become_member: "成为会员",
  chat: "需要聊天吗？",
  coming_soon: "即将推出",
  contribute: "贡献",
  contact: "联系我们",
  donate: "捐",
  email_email: "你的邮件",
  email_error: "发生错误，我们无法发送您的消息",
  email_message: "您的留言",
  email_name: "你的名字",
  email_send_message: "发信息",
  email_success: "您的留言已发送",
  email_reason: "选择联系我们的原因",
  email_email_required: "需要有效的电子邮件",
  email_message_required: "请给我们留言",
  email_name_required: "您的姓名是必填项",
  email_reason_required: "请选择您与我们联系的原因",
  error_404_title: "找不到网页",
  error_404_message: "您在找的页面似乎不存在",
  error_404_button: "返回主页",
  follow_social: "在社交媒体上关注我们",
  home: "主页",
  languages: "语言",
  learn_more: "学到更多",
  organization: "组织",
  projects: "项目",
  register_cta: "成为注册会员",
  register_video_title: "蒙特利尔 YAHPA 登记处",
  show_more: "显示更多",
  show_less: "收起",
  support: "支持",
  updated_on: "最后更新",
  yahpa: "YAHPA",
  yahpa_full: "亚裔青年健康专业协会",
};

const vi: DefaultLanguageResource = {
  about: "Về chúng tôi",
  become_member: "Trở thành thành viên",
  chat: "Cần trò chuyện?",
  coming_soon: "Sắp ra mắt",
  contribute: "Góp phần",
  contact: "Tiếp xúc",
  donate: "Quyên tặng",
  email_email: "Email của bạn",
  email_error: "Đã xảy ra lỗi, chúng tôi không thể gửi tin nhắn của bạn",
  email_message: "Tin nhắn của bạn",
  email_name: "Tên của bạn",
  email_send_message: "Gửi tin nhắn",
  email_success: "Tin nhắn của bạn đã được gửi",
  email_reason: "Chọn lý do liên hệ với chúng tôi",
  email_email_required: "Một email hợp lệ là bắt buộc",
  email_message_required: "Hãy viết cho chúng tôi tin nhắn của bạn",
  email_name_required: "Tên của bạn là bắt buộc",
  email_reason_required: "Vui lòng chọn lý do bạn liên hệ với chúng tôi",
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
  updated_on: "ngày cập nhật",
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
