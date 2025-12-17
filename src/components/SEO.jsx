import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({
    title,
    description,
    keywords,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    twitterCard = 'summary_large_image'
}) => {
    const location = useLocation();
    const baseUrl = 'https://promptix.com'; // Update with actual domain
    const canonicalUrl = `${baseUrl}${location.pathname}`;

    // Full title with brand
    const fullTitle = title ? `${title} | PromptiX` : 'PromptiX - AI-Driven Solutions for Business & Students';

    useEffect(() => {
        // Update document title
        document.title = fullTitle;

        // Update or create meta tags
        const updateMetaTag = (name, content, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${name}"]`);

            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }

            element.setAttribute('content', content);
        };

        // Standard meta tags
        updateMetaTag('description', description);
        if (keywords) updateMetaTag('keywords', keywords);
        updateMetaTag('robots', 'index, follow');

        // Open Graph tags
        updateMetaTag('og:title', fullTitle, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:url', canonicalUrl, true);
        updateMetaTag('og:type', ogType, true);
        updateMetaTag('og:image', `${baseUrl}${ogImage}`, true);
        updateMetaTag('og:site_name', 'PromptiX', true);

        // Twitter Card tags
        updateMetaTag('twitter:card', twitterCard);
        updateMetaTag('twitter:title', fullTitle);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', `${baseUrl}${ogImage}`);

        // Update or create canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);

    }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, twitterCard]);

    return null;
};

export default SEO;
