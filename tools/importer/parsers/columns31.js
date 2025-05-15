/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create links from an element with a src or href
  function createLink(element, document) {
    if (element.src) {
      const a = document.createElement('a');
      a.href = element.src;
      a.textContent = element.alt || element.src; // Use element.src dynamically when alt is missing
      return a;
    }
    return element;
  }

  // Extract the main heading and image
  const heading = element.querySelector('h1');
  const imageContainer = element.querySelector('.mediaImg img');

  const contentParagraphs = element.querySelectorAll('.mediaDetailTxtBox p');
  const content = Array.from(contentParagraphs).map((p) => p.cloneNode(true));

  const relatedArticles = element.querySelectorAll('.mediaDetailList .card');
  const relatedArticlesContent = Array.from(relatedArticles).map((card) => {
    const title = card.querySelector('h3');
    const articleImage = card.querySelector('.mediaBanner img');
    const articleSummary = card.querySelector('.mediacontentSummary');
    const readMore = card.querySelector('.readMoreLink');
    const date = card.querySelector('.datesR');

    const cellContent = [];
    if (title) cellContent.push(title.textContent);
    if (articleImage) cellContent.push(createLink(articleImage, document));
    if (articleSummary) cellContent.push(articleSummary.cloneNode(true));
    if (readMore) cellContent.push(readMore.cloneNode(true));
    if (date) cellContent.push(date.cloneNode(true));

    return cellContent;
  });

  // Create main block table
  const cells = [
    ['Columns'], // Ensure exact header match
    [heading.textContent, createLink(imageContainer, document)],
    [...content],
    ...relatedArticlesContent,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the structured block without section metadata
  element.replaceWith(block);
}