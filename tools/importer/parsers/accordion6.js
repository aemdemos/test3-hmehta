/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row for the Accordion block
  rows.push(['Accordion']);

  // Parse accordion items
  const cardHeader = element.querySelector('.card-header');
  const cardBody = element.querySelector('.card-body');

  if (cardHeader && cardBody) {
    const title = cardHeader.textContent.trim(); // Extract title
    const content = cardBody; // Extract content (keep as an element)

    rows.push([title, content]);
  }

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}