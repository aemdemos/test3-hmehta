/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  rows.push(['Cards']);

  // Create a Set to ensure uniqueness
  const uniqueItems = new Set();

  // Process each item in the element
  const items = element.querySelectorAll('.howGetLicenceBox');
  items.forEach((item) => {
    // Get the unique identifier for the item (e.g., title or link)
    const uniqueIdentifier = item.querySelector('.readMoreLink')?.href;
    if (uniqueIdentifier && uniqueItems.has(uniqueIdentifier)) {
      return; // Skip duplicates
    }
    uniqueItems.add(uniqueIdentifier);

    const imageElement = item.querySelector('.howGetLicenceImg img');
    const image = document.createElement('img');
    image.src = imageElement?.getAttribute('data-src') || imageElement?.src || '';
    image.alt = imageElement?.alt || 'No alt text provided';

    const titleElement = item.querySelector('h3');
    const title = document.createElement('strong');
    title.textContent = titleElement?.textContent || '';

    const descriptionElement = item.querySelector('.blogcontentSummary');
    const description = document.createElement('p');
    description.textContent = descriptionElement?.textContent || '';

    const readMoreElement = item.querySelector('.readMoreLink');
    const readMoreLink = document.createElement('a');
    readMoreLink.href = readMoreElement?.href || '';
    readMoreLink.textContent = readMoreElement?.querySelector('span')?.textContent || 'Read more';

    const cellContent = [title, description, readMoreLink];
    rows.push([image, cellContent]);
  });

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element with the new block table
  element.replaceWith(blockTable);
}