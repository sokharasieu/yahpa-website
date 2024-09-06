import { Box, Select, SelectFieldProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IoLanguage } from 'react-icons/io5'
import { LANGUAGES } from 'utils/constants'

export default function LanguagePicker(selectProps: SelectFieldProps) {
  const { locale, locales, query, pathname, asPath, push } = useRouter()

  const handleLocaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newLocale = e.currentTarget.value
    push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <Select
      defaultValue={locale}
      onChange={handleLocaleChange}
      width="max-content"
      icon={<IoLanguage />}
      suppressHydrationWarning
      {...selectProps}
    >
      {locales?.map((language, index) => {
        return (
          <Box
            as="option"
            key={index}
            value={language}
            suppressHydrationWarning
          >
            {LANGUAGES[language as keyof typeof LANGUAGES]}
          </Box>
        )
      })}
    </Select>
  )
}
