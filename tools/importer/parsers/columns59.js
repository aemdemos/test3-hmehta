/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row for the table
  const headerRow = ['Columns'];

  // Extract content from the provided HTML element
  const columns = [];
  const columnDivs = element.querySelectorAll('.col-6.col-md-3 .innersitemapbox ul');

  columnDivs.forEach((col) => {
    const items = Array.from(col.querySelectorAll('li a')).map((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent;
      return a;
    });

    const columnContent = document.createElement('div');
    items.forEach((item) => columnContent.appendChild(item));
    columns.push(columnContent);
  });

  const cells = [
    headerRow, // Header row
    [...columns], // Content rows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}