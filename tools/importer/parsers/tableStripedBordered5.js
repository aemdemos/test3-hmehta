/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const contentCells = [];

  // Extract title
  const title = element.querySelector('h1')?.textContent.trim();
  if (title) {
    contentCells.push([title]);
  }

  // Extract image
  const img = element.querySelector('.mediaImg img');
  if (img) {
    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt || '';
    contentCells.push([imageElement]);
  }

  // Extract main content text
  const mainContent = element.querySelector('.mediaDetailTxtBox > .content p');
  if (mainContent) {
    contentCells.push([mainContent.textContent.trim()]);
  }

  // Extract table
  const table = element.querySelector('.mediaDetailTxtBox table');
  if (table) {
    const rows = Array.from(table.querySelectorAll('tr')).map(row => {
      return Array.from(row.querySelectorAll('td')).map(cell => {
        const cellContent = cell.textContent.trim();
        return cellContent;
      });
    });

    const tableElement = WebImporter.DOMUtils.createTable(rows, document);

    contentCells.push([tableElement]);
  }

  // Create final block
  const block = WebImporter.DOMUtils.createTable(contentCells, document);

  element.replaceWith(hr, block);
}