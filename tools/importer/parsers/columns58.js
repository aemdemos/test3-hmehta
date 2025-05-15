/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Create section metadata dynamically
  const hr = document.createElement('hr');

  const metadataRows = [];
  const metadataElements = element.querySelectorAll('.metadata-selector'); // Adjust selector based on the HTML input
  metadataElements.forEach(metaEl => {
    const key = metaEl.querySelector('.key-selector')?.textContent.trim() || 'Key';
    const value = metaEl.querySelector('.value-selector')?.textContent.trim() || 'Value';
    metadataRows.push([key, value]);
  });

  const sectionMetadataTable = createTable([
    ['Section Metadata'],
    ...metadataRows,
  ], document);

  // Extract content and refine for main block table
  const headerRow = ['Columns'];

  const paragraphs = Array.from(element.querySelectorAll('.container .mediaDetailSec .mediaDetailTxtBox p'));
  const listElement = document.createElement('ul');
  paragraphs.forEach(p => {
    const text = p.textContent.trim();
    if (text) {
      const li = document.createElement('li');
      li.textContent = text;
      listElement.appendChild(li);
    }
  });

  const imgElement = element.querySelector('.mediaImg img');
  const image = document.createElement('img');
  if (imgElement) {
    image.src = imgElement.src;
    image.alt = imgElement.alt;
  }

  const linkElement = element.querySelector('.readMoreLink');
  let link;
  if (linkElement) {
    link = document.createElement('a');
    link.href = linkElement.href;
    link.textContent = linkElement.textContent.trim() || 'Read More';
  }

  const cells = [
    headerRow,
    [listElement, image, link].filter(cell => cell),
  ];

  const table = createTable(cells, document);

  // Replace original element with refined structure
  if (metadataRows.length > 0) {
    element.replaceWith(hr, sectionMetadataTable, table);
  } else {
    element.replaceWith(table);
  }
}