import Head from 'next/head'
import { useRouter } from 'next/router'

type SeoMetaContent = {
  title: string
  description: string
  og_image?: string
}

export default function SEO({
  title,
  description,
  og_image = '/images/brand.png',
}: SeoMetaContent) {
  const router = useRouter()
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={og_image} />
      <meta property="og:url" content={process.env.baseUrl + router.asPath} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={og_image} />
    </Head>
  )
}
