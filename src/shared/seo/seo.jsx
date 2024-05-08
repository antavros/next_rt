/* eslint-disable react/prop-types */
"use server";
import { Helmet, HelmetProvider } from 'react-helmet-async';

export function Seo({
    seoTitle,
    seoDescription,
    seoOgTitle,
    seoOgImage,
}) {
    const currentUrl = window.location.href;

    return (
        <HelmetProvider>
            < Helmet >
                <title>{`${seoTitle}`}</title>
                <meta name="description" content={`${seoDescription}`} />
                <meta property="og:title" content={`${seoOgTitle}`} />
                <meta property="og:image" content={`${seoOgImage}`} />
                <meta property="og:description" content={`${seoDescription}`} />
                <meta property="og:url" content={`${currentUrl}`} />
            </Helmet>
        </HelmetProvider>
    );
}