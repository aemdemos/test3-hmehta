/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image
  const image = element.querySelector('img');
  const imageElement = image ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = image.src;
  }

  // Extract heading
  const heading = element.querySelector('h2');
  const headingText = heading ? heading.textContent : '';

  // Extract paragraphs
  const paragraphs = Array.from(element.querySelectorAll('p')).map((p) => {
    const pElement = document.createElement('p');
    pElement.textContent = p.textContent;
    return pElement;
  });

  // Create table header row, ensure exact match with example
  const headerRow = ['Columns'];

  // Create table rows dynamically based on extracted content
  const rows = [
    [imageElement],
    [headingText, paragraphs.length ? paragraphs : ''],
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  // Replace original element with block table
  element.replaceWith(blockTable);
}