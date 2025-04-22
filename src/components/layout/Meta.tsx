import Head from 'next/head';
import { useRouter } from 'next/router';

import { AppConfig } from '@/utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="canonical"
          href={`${AppConfig.site_name}${router.asPath}`}
          key="canonical"
        />
        <meta
          name="description"
          content={props.description}
          key="description"
        />
        <meta name="robots" content="index,follow" key="robots" />
        <meta name="googlebot" content="index,follow" key="googlebot" />
        <link rel="icon" href="/images/LogoAlone.png" key="favicon" />
        <link rel="apple-touch-icon" href="/images/LogoAlone.png" key="apple-touch-icon" />
        <title>{props.title}</title>
      </Head>
    </>
  );
};

export { Meta };
