import {
  Box,
  Heading,
  Stack,
  Tag,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { StoryResult, TeamMemberBlok } from 'types/story'
import Image from './Image'
import RenderRichText from './RenderRichText'

type CardMemberProps = {
  member: StoryResult<TeamMemberBlok>
}

export default function CardMember({ member }: CardMemberProps) {
  const { onToggle } = useDisclosure({
    defaultIsOpen: false,
  })

  const hasContent = !!member.content?.description

  return (
    <Stack
      as="li"
      listStyleType="none"
      spacing={5}
      p={4}
      borderRadius="md"
      bg="gray.100"
    >
      <Stack direction="row" spacing={4}>
        <Box
          width="auto"
          onClick={hasContent ? onToggle : undefined}
          _hover={{ cursor: hasContent ? 'pointer' : undefined }}
        >
          <Image
            ratio={2 / 3}
            w={{ base: 150, lg: 200 }}
            h={{ base: 200, lg: 280 }}
            src={member.content?.image?.filename ?? '/images/logo_white.png'}
            alt={member.content?.name}
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
        <Box w="full" position="relative">
          <Stack
            spacing={{ base: 3, md: 2, lg: 3 }}
            width="full"
            height="full"
            justify="center"
          >
            <Stack spacing={1}>
              <Heading as="h3" fontSize={{ base: 'lg', lg: 'xl' }}>
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
          </Stack>
        </Box>
      </Stack>
      {hasContent && (
        <Box padding={3} borderRadius="md">
          {RenderRichText(member.content?.description)}
        </Box>
      )}
    </Stack>
  )
}
