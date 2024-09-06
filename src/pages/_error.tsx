import { GetStaticPropsContext } from 'next'
import Error from 'next/error'

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      // Helps prevent build errors related to i18n
      // https://github.com/amannn/next-intl/issues/87#issuecomment-1243540265
      messages: (await import(`messages/${context.locale ?? 'en'}.json`))
        .default,
    },
  }
}

export default function ErrorPage() {
  return <Error statusCode={500} />
}
