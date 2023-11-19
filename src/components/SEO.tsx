import Head from 'next/head'
import { useRouter } from 'next/router'

type SeoMetaContent = {
  title?: string
  description?: string
  og_image?: string
}

export default function SEO(meta: SeoMetaContent) {
  const router = useRouter()
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
      <meta property="og:title" content={meta?.title} />
      <meta property="og:description" content={meta?.description} />
      <meta property="og:image" content={meta?.og_image} />
      <meta property="og:url" content={process.env.baseUrl + router.asPath} />
      <meta name="twitter:title" content={meta?.title} />
      <meta name="twitter:description" content={meta?.description} />
      <meta name="twitter:image" content={meta?.og_image} />
    </Head>
  )
}
