import { HStack, StackProps } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { IoLogoWechat } from "react-icons/io5";
import Link from "./Link";

type SocialMediaButtonProps = React.PropsWithChildren<
  React.ComponentPropsWithRef<typeof Link>
>;

function SocialMediaButton({ children, ...linkProps }: SocialMediaButtonProps) {
  return (
    <Link
      p={1}
      borderRadius="md"
      sx={{
        svg: {
          ":last-child": {
            display: "none",
          },
        },
      }}
      {...linkProps}
    >
      {children}
    </Link>
  );
}

export default function SocialMedia({ children, ...stackProps }: StackProps) {
  return (
    <HStack alignItems="center" p={3} {...stackProps}>
      {children}
    </HStack>
  );
}

SocialMedia.Facebook = function SocialMediaFacebookLink(
  buttonProps: SocialMediaButtonProps
) {
  return (
    <SocialMediaButton
      aria-label="facebook"
      bg="facebook.500"
      _hover={{ backgroundColor: "facebook.400" }}
      href="https://www.facebook.com/YAHPAMontreal"
      {...buttonProps}
    >
      <FiFacebook size={24} color="white" />
    </SocialMediaButton>
  );
};

SocialMedia.Youtube = function SocialMediaYoutube(
  buttonProps: SocialMediaButtonProps
) {
  return (
    <SocialMediaButton
      aria-label="youtube"
      bg="red.500"
      _hover={{ backgroundColor: "red.400" }}
      href="https://www.youtube.com/channel/UCKFif2TbH7QunfPRzARPSgw"
      {...buttonProps}
    >
      <FiYoutube size={24} color="white" />
    </SocialMediaButton>
  );
};

SocialMedia.Instagram = function SocialMediaInstagram(
  buttonProps: SocialMediaButtonProps
) {
  return (
    <SocialMediaButton
      aria-label="instagram"
      bg="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)"
      _hover={{ filter: "brightness(0.80)" }}
      href="https://www.instagram.com/yahpamontreal/"
      {...buttonProps}
    >
      <FiInstagram size={24} color="white" />
    </SocialMediaButton>
  );
};

SocialMedia.WeChat = function SocialMediaWeChat(
  buttonProps: SocialMediaButtonProps
) {
  const { locale } = useTranslation();
  return locale === "zh" ? (
    <SocialMediaButton
      aria-label="wechat"
      bg="#7BB32E"
      _hover={{ filter: "brightness(0.80)" }}
      href="https://mp.weixin.qq.com/s/M_CtrqhV8svHvuXhdR5tnw"
      {...buttonProps}
    >
      <IoLogoWechat size={24} color="white" />
    </SocialMediaButton>
  ) : null;
};
