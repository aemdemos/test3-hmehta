/* global WebImporter */
export default function parse(element, { document }) {
  // Create the block header
  const headerRow = ['Hero'];

  // Extract relevant content from the HTML element
  const heading = element.querySelector('h4');

  // Check if heading exists and extract its text content
  const headingText = heading ? heading.textContent.trim() : '';

  // Create a heading styled as a title
  const headingElement = document.createElement('h1');
  headingElement.textContent = headingText;

  const cells = [
    headerRow,
    [headingElement],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}