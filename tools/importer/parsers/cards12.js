/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting card data
  const cardHeader = element.querySelector('.card-header h3 .btn').textContent.trim();
  const cardBody = element.querySelector('.card-body p').textContent.trim();

  // Constructing table rows
  const cells = [
    ['Cards'],
    [cardHeader, cardBody]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the formatted table
  element.replaceWith(blockTable);
}