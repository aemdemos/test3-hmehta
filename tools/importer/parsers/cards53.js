/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract image elements
  const extractImage = (img) => {
    if (!img) return '';
    const image = document.createElement('img');
    image.src = img.getAttribute('src') || img.getAttribute('data-src') || '';
    image.alt = img.getAttribute('alt') || '';
    return image;
  };

  // Helper function to extract text content
  const extractTextContent = (card) => {
    const title = card.querySelector('h3')?.textContent.trim() || '';
    const description = card.querySelector('.blogcontentSummary')?.textContent.trim() || '';
    const linkElement = card.querySelector('.blueButton a');
    const link = linkElement
      ? (() => {
          const anchor = document.createElement('a');
          anchor.href = linkElement.getAttribute('href');
          anchor.textContent = linkElement.textContent.trim();
          return anchor;
        })()
      : '';

    return [title, document.createElement('br'), description, document.createElement('br'), link].filter(Boolean);
  };

  // Extract cards from the HTML while ensuring uniqueness to avoid duplicates
  const cardSet = new Set();
  const cards = Array.from(element.querySelectorAll('.blogHomeBox'))
    .filter((card) => {
      const uniqueKey = card.querySelector('h3')?.textContent.trim() || '';
      if (cardSet.has(uniqueKey)) return false;
      cardSet.add(uniqueKey);
      return true;
    })
    .map((card) => {
      const image = extractImage(card.querySelector('.blogHomeImg img'));
      const textContent = extractTextContent(card);
      return [image, textContent];
    });

  // Create the table structure
  const tableData = [['Cards'], ...cards];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}