/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row for the Accordion block
  rows.push(['Accordion']);

  // Process each accordion item
  const cardHeader = element.querySelector('.card-header h2');
  const title = document.createElement('p');
  title.textContent = cardHeader ? cardHeader.textContent.trim() : '';

  const cardBody = element.querySelector('.card-body');
  const content = document.createElement('div');
  content.append(...cardBody.children);

  rows.push([title, content]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}