import DOMPurify from 'dompurify';

const purifyHTML = (htmlElements) => {
    const clean = DOMPurify.sanitize(htmlElements);

    return { __html: clean };
};

export default purifyHTML;
