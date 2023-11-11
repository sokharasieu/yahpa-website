import { Box, Icon, Link, Select, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import { DocumentCovidBlok } from 'types/story'
import RenderRichText from './RenderRichText'
import Time from './Time'
import { useTranslations } from 'next-intl'

type CardDocumentProps = {
  document: DocumentCovidBlok
}

export default function CardDocument({ document }: CardDocumentProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [linkToFile, setLinkToFile] = useState('')
  const t = useTranslations('App')

  useEffect(() => {
    const selectedDocument = document.documents?.find(
      (doc) => doc.title === selectedLanguage
    )
    setLinkToFile(selectedDocument?.filename ?? '')
  }, [selectedLanguage, document.documents])

  return (
    <Stack
      p={3}
      bg="white"
      borderRadius="lg"
      justifyContent="space-between"
      h="full"
    >
      <Stack>
        <Time
          fontSize="sm"
          fontWeight={400}
          text={t('updated_on')}
          time={document?.date_updated as Date}
          fontStyle="italic"
        />
        <Box>{RenderRichText(document.description)}</Box>
      </Stack>
      {/* For English, we present all document versions */}
      {document.documents && document.documents?.length >= 3 ? (
        <Stack direction={{ base: 'column', sm: 'row' }}>
          <Select
            placeholder="Select your language"
            width={{ base: 'full', sm: 'max-content' }}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {document.documents?.map((file) => (
              <Box as="option" key={file.id}>
                {file.title}
              </Box>
            ))}
          </Select>
          <Link
            bg="primary.100"
            px={3}
            py={2}
            textAlign="center"
            borderRadius="md"
            _hover={{
              textDecoration: 'none',
              backgroundColor: selectedLanguage ? 'primary.200' : 'primary.100',
              cursor: selectedLanguage ? 'pointer' : 'default',
            }}
            sx={{
              opacity: selectedLanguage ? 1 : 0.5,
            }}
            isExternal
            href={selectedLanguage ? linkToFile : undefined}
          >
            View File
          </Link>
        </Stack>
      ) : (
        <Stack spacing={3} direction="row">
          {document.documents?.map((file) => (
            <Link
              bg="primary.100"
              px={2}
              py={1}
              borderRadius="md"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="max-content"
              _hover={{
                textDecoration: 'none',
                backgroundColor: 'primary.200',
              }}
              key={file.id}
              href={file.filename}
              download={file.title}
              isExternal
            >
              <Text>{file.name}</Text>
              <Icon ml={1} as={FiDownload} />
            </Link>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
