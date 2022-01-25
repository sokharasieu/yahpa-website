import {
  Box,
  Heading,
  Stack,
  Tag,
  Text,
  useBreakpoint,
  useDisclosure,
  useOutsideClick,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { StoryResult, TeamMemberBlok } from "types/story";
import Image from "./Image";
import RenderRichText from "./RenderRichText";

type CardMemberProps = {
  member: StoryResult<TeamMemberBlok>;
  index: number;
};

const MotionStack = motion(Stack);
const MotionBox = motion(Box);

export default function CardMember({ member, index }: CardMemberProps) {
  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultIsOpen: index === 0,
  });
  const cardRef = useRef(null);

  useOutsideClick({ ref: cardRef, handler: onClose });

  const currentBreakpoint = useBreakpoint();

  useEffect(() => {
    if (currentBreakpoint === "base") {
      onOpen();
    }
    if (currentBreakpoint === "sm") {
      onOpen();
    }
    if (currentBreakpoint === "md") {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBreakpoint]);

  return (
    <MotionBox
      as="li"
      ref={cardRef}
      tabIndex={0}
      listStyleType="none"
      layout
      _hover={{ cursor: "pointer" }}
      onClick={onOpen}
      onFocus={onOpen}
      onBlur={onClose}
    >
      <MotionStack
        layout
        direction={"row-reverse"}
        padding={{ base: isOpen && 3, lg: 3 }}
        bg={isOpen ? "primary.100" : undefined}
        borderRadius={{ lg: isOpen ? "md" : undefined }}
        boxShadow={isOpen ? "lg" : undefined}
        justifyContent={{ base: "start", md: "start" }}
      >
        <MotionBox layout>
          <Image
            ratio={{ base: 2 / 3, sm: 2 / 3 }}
            w={{ base: 200, lg: 250 }}
            src={member.content.image?.filename}
            alt={member.content.name}
            boxShadow={isOpen ? undefined : "lg"}
            borderRadius="md"
          />
        </MotionBox>
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              width="full"
            >
              <MotionStack
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                spacing={{ base: 1, md: 2, lg: 3 }}
              >
                <Heading fontSize={{ base: "xl", lg: "2xl" }}>
                  {member.content.name}
                </Heading>
                <Text color="primary.600" fontStyle="italic">
                  {member.content.position}
                </Text>
                <Wrap>
                  {member.content.languages?.map((language) => (
                    <WrapItem key={language}>
                      <Tag colorScheme="gray">{language}</Tag>
                    </WrapItem>
                  ))}
                </Wrap>
                <Box
                  display={{ base: "none", sm: "block" }}
                  sx={{ p: { fontSize: "md", marginTop: 3 } }}
                >
                  {RenderRichText(member.content?.description)}
                </Box>
              </MotionStack>
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionStack>
    </MotionBox>
  );
}
