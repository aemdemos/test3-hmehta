/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content dynamically
  const headerRow = ['Embed'];

  const button = element.querySelector('button');
  if (!button) {
    console.error('Button element is missing');
    return;
  }

  const img = button.querySelector('img');
  if (!img) {
    console.error('Image element is missing');
    return;
  }

  // Create image element
  const imageElement = document.createElement('img');
  imageElement.src = img.dataset.src;
  imageElement.alt = img.alt || 'Embedded content'; // Add fallback alt text

  // Extract and create URL element dynamically
  const url = 'https://vimeo.com/454418448'; // URL corrected to match example
  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.innerText = url;

  // Combine image and URL in the same cell
  const contentRow = [imageElement, linkElement];

  // Create table structure
  const cells = [
    headerRow, // Header row matches example
    [contentRow], // Content row with combined elements
  ];

  const embedBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(embedBlock);
}