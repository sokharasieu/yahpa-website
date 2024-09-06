import { Box, Flex } from '@chakra-ui/react'
import Image from './Image'
import Link from './Link'

export type CardResourceProps = {
  label: string
  link: string
  imageUrl: string
}

export default function CardGoal({ label, link, imageUrl }: CardResourceProps) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      _hover={{
        img: {
          transform: 'scale(1.1)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}
    >
      <Image
        src={imageUrl}
        alt={label}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        h="40vh"
      />
      <Flex
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        zIndex={1}
        flexDirection="column"
        height="full"
        justifyContent="space-between"
        p={4}
      >
        <Flex justifyContent="flex-end">
          <Link
            href={link}
            px={3}
            py={2}
            borderRadius="md"
            fontWeight={600}
            bg="white"
            color="black"
            _hover={{ bg: 'gray.100' }}
          >
            {label}
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
