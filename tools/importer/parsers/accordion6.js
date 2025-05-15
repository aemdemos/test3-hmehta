/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the accordion header and content
  const headerButton = element.querySelector('.card-header button');
  const contentBody = element.querySelector('.card-body');

  // Create the header row for the block table
  const headerRow = ['Accordion'];

  // Extract title and content dynamically
  const titleCell = headerButton ? headerButton.textContent.trim() : 'Untitled';
  const contentCell = contentBody ? contentBody.innerHTML.trim() : 'No content available';

  // Create the table rows
  const rows = [
    headerRow,
    [titleCell, contentCell],
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}