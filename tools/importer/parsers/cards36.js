/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  rows.push(["Cards"]);

  // Extract card data
  const items = element.querySelectorAll('.mediaRptSec');

  // Use a Set to remove duplicates based on image src and card text content
  const uniqueCards = new Set();

  items.forEach((item) => {
    const imageEl = item.querySelector('img');
    const src = imageEl?.getAttribute('src') || imageEl?.getAttribute('data-src');

    // Avoid processing if src is null or if the card is already added
    const titleEl = item.querySelector('h3');
    const title = titleEl?.textContent || '';

    const descriptionEl = item.querySelector('p');
    const description = descriptionEl?.textContent || '';

    const uniqueKey = `${src}-${title}-${description}`;
    if (!src || uniqueCards.has(uniqueKey)) {
      return;
    }

    uniqueCards.add(uniqueKey);

    const image = document.createElement('img');
    image.src = src;
    image.alt = imageEl?.getAttribute('alt') || '';

    const content = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      content.push(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      content.push(descriptionElement);
    }

    rows.push([image, content]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}