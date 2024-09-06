import {
  Button,
  Center,
  Icon,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import useDebounce from 'hooks/useDebounce'
import useSearch from 'hooks/useSearch'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'
import CardSearchResult from './CardSearchResult'
import { useTranslations } from 'next-intl'

type SearchInputForm = {
  value: string
}

export default function FormSearchRegistry() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedTerm = useDebounce(searchTerm, 200)
  const { data } = useSearch(debouncedTerm, '')
  const t = useTranslations('App')

  const {
    handleSubmit,
    register,
    reset,
    setValue: setSearchDefaultValue,
  } = useForm<SearchInputForm>()

  const handleReset = () => {
    reset()
    setSearchTerm('')
    router.replace(
      {
        pathname: router.pathname,
      },
      undefined,
      { shallow: true }
    )
  }

  const onSubmit = async ({ value }: SearchInputForm) => {
    setSearchTerm(value)
    router.query.term = value
    router.push(router)
  }

  useEffect(() => {
    if (router.query.term) {
      setSearchTerm(router.query.term as string)
      setSearchDefaultValue('value', router.query.term as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <>
      <Stack
        as="form"
        justifyContent="center"
        alignItems="center"
        direction="row"
        width={{ base: '100%', md: '80%' }}
        mx="auto"
        onChange={handleSubmit(onSubmit)}
        bg="gray.100"
        p={3}
        borderRadius="xl"
        my={4}
      >
        <Icon as={FiSearch} w={22} h={22} />
        <Input
          placeholder={t('registry_search_placeholder')}
          bg="white"
          {...register('value')}
        />
        {debouncedTerm.length > 2 && (
          <Button colorScheme="red" onClick={handleReset}>
            Clear
          </Button>
        )}
      </Stack>
      <Stack spacing={6} direction="row">
        <Stack flex={2}>
          {!data && (
            <Center>
              <Spinner size="xl" />
            </Center>
          )}
          {data?.totalResults && (
            <Text fontSize="2xl" fontWeight="bold" my={2}>
              {data?.totalResults} {t('results_found')}
            </Text>
          )}
          <SimpleGrid spacing={6} columns={1}>
            {data?.stories?.map((result) => (
              <CardSearchResult key={result.id} {...result} />
            ))}
            {data?.stories.length === 0 && (
              <Stack flexDirection="row" justifyContent="center" paddingY={12}>
                <Text fontSize="2xl" fontWeight="bold">
                  {t('results_not_found')}
                </Text>
              </Stack>
            )}
          </SimpleGrid>
        </Stack>
      </Stack>
    </>
  )
}
