import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Textarea,
  useToast,
  VisuallyHidden,
} from '@chakra-ui/react'
import emailjs from 'emailjs-com'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { BiErrorCircle } from 'react-icons/bi'
import { BsCheck2Circle, BsPerson } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'
import { EmailContactForm, EmailConfig } from 'types/email'

const emailConfig: EmailConfig = {
  serviceID: 'contact_service',
  templateID: 'contact_form',
}

export default function FormContact() {
  const t = useTranslations('Contact.Form')
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailContactForm>()
  const toast = useToast()

  const onSubmit = async ({
    user_email,
    message,
    user_name,
    reason,
  }: EmailContactForm) => {
    try {
      emailjs.send(emailConfig.serviceID, emailConfig.templateID, {
        user_email,
        message,
        user_name,
        reason,
      })
      reset()
      toast({
        position: 'bottom',
        duration: 3000,
        render: () => (
          <Alert bg="green.200" borderRadius="md">
            <Stack direction="row" alignItems="center">
              <Icon as={BsCheck2Circle} w={8} h={8} />
              <AlertTitle>{t('success')}</AlertTitle>
            </Stack>
          </Alert>
        ),
      })
    } catch {
      onError()
    }
  }

  const onError = () =>
    toast({
      title: 'An error has occured',
      position: 'bottom',
      duration: 3000,
      status: 'error',
      render: () => (
        <Alert bg="red.200" borderRadius="md">
          <Stack direction="row" alignItems="center">
            <Icon as={BiErrorCircle} w={8} h={8} />
            <AlertTitle>{t('error')}</AlertTitle>
          </Stack>
        </Alert>
      ),
    })

  const OPTIONS = [t('option1'), t('option2'), t('option3')]

  return (
    <Box
      backgroundColor="white"
      boxShadow="xl"
      overflow="hidden"
      borderRadius="lg"
      width="full"
      maxW={{ base: 'full', lg: '2xl' }}
    >
      <Box
        as="form"
        padding={5}
        onSubmit={handleSubmit(onSubmit, onError)}
        id="contact-form"
      >
        <Stack spacing={3}>
          <Stack w="full" spacing={3} direction={{ base: 'column', md: 'row' }}>
            <FormControl isInvalid={!!errors.user_name}>
              <FormLabel as={VisuallyHidden}>{t('name')}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BsPerson color="gray.800" />
                </InputLeftElement>
                <Input
                  placeholder={t('name')}
                  type="text"
                  size="md"
                  {...register('user_name', {
                    required: t('name_required'),
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.user_name && errors.user_name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.user_email}>
              <FormLabel as={VisuallyHidden}>{t('email')}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail color="gray.800" />
                </InputLeftElement>
                <Input
                  placeholder={t('email')}
                  type="email"
                  size="md"
                  {...register('user_email', {
                    required: t('email_required'),
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.user_email && errors.user_email.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <FormControl isInvalid={!!errors.reason}>
            <FormLabel as={VisuallyHidden}>{t('reason')}</FormLabel>
            <Select
              placeholder={t('reason')}
              {...register('reason', {
                required: t('reason_required'),
              })}
            >
              {OPTIONS?.map((option, index) => (
                <Box as="option" key={index} value={option} p={3}>
                  {option}
                </Box>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.reason && errors.reason.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.message}>
            <FormLabel as={VisuallyHidden}>{t('message')}</FormLabel>
            <Textarea
              placeholder={t('message')}
              {...register('message', {
                required: t('message_required'),
              })}
            />
            <FormErrorMessage>
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="primary"
            isLoading={isSubmitting}
            type="submit"
            sx={{ alignSelf: 'self-start' }}
          >
            {t('send_message')}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
