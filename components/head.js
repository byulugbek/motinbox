import Head from 'next/head';
import { useRouter } from 'next/router';

export default function HeadComponent(props) {
    const { title, metatitle, description, image } = props;
    const { asPath } = useRouter();
    console.log(asPath);
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={metatitle || title} />
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://motionbox.uz${asPath}`} />
            <meta property="og:title" content={metatitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image || 'https://res.cloudinary.com/motionbox/image/upload/v1637402583/logo_dypzcf.png'} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`https://motionbox.uz${asPath}`} />
            <meta property="twitter:title" content={metatitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image || 'https://res.cloudinary.com/motionbox/image/upload/v1637402583/logo_dypzcf.png'} />
        </Head>
    )
}