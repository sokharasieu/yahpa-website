import {
  Box,
  Button,
  Heading,
  Stack,
  Tag,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { AnimatePresence, motion, Variants, Spring } from "framer-motion";
import useTranslation from "hooks/useTranslation";
import { StoryResult, TeamMemberBlok } from "types/story";
import Image from "./Image";
import RenderRichText from "./RenderRichText";

type CardMemberProps = {
  member: StoryResult<TeamMemberBlok>;
};

const MotionStack = motion(Stack);
const MotionBox = motion(Box);

export default function CardMember({ member }: CardMemberProps) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });

  const { t } = useTranslation();

  const hasContent = !!member.content?.description;

  const variants: Variants = {
    open: { top: "100%", translateY: "-100%" },
    closed: { top: 0 },
  };

  const spring: Spring = {
    type: "spring",
    damping: 10,
    stiffness: 50,
  };

  return (
    <MotionStack layout as="li" listStyleType="none" spacing={5}>
      <MotionStack layout direction="row" spacing={4}>
        <MotionBox
          layout
          width="auto"
          onClick={hasContent ? onToggle : undefined}
          _hover={{ cursor: hasContent ? "pointer" : undefined }}
        >
          <Image
            ratio={2 / 3}
            w={{ base: 150, lg: 200 }}
            h={{ base: 200, lg: 280 }}
            src={member.content?.image?.filename ?? "/images/logo_white.png"}
            alt={member.content?.name}
            borderRadius="md"
            boxShadow="md"
          />
        </MotionBox>
        <MotionBox layout w="full" position="relative">
          <MotionStack
            spacing={{ base: 3, md: 2, lg: 3 }}
            width="full"
            position="absolute"
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={spring}
          >
            <Stack spacing={1}>
              <Heading as="h3" fontSize={{ base: "lg", lg: "xl" }}>
                {member.content?.name}
              </Heading>
              <Text color="primary.600" fontStyle="italic">
                {member.content?.position}
              </Text>
              <Wrap>
                {member.content?.languages?.map((language) => (
                  <WrapItem key={language}>
                    <Tag colorScheme="primary" size="sm">
                      {language}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
            {hasContent && (
              <Button
                size="sm"
                width="fit-content"
                backgroundColor="transparent"
                p={0}
                aria-expanded={isOpen}
                _hover={{ textDecoration: "underline" }}
                onClick={onToggle}
              >
                {isOpen ? t("show_less") : t("show_more")}
              </Button>
            )}
          </MotionStack>
        </MotionBox>
      </MotionStack>
      {hasContent && (
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              bg="primary.100"
              padding={3}
              borderRadius="md"
            >
              {RenderRichText(member.content?.description)}
            </MotionBox>
          )}
        </AnimatePresence>
      )}
    </MotionStack>
  );
}
