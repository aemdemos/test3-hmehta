/* global WebImporter */
export default function parse(element, { document }) {
  // Extract header row
  const headerRow = ['Columns'];

  // Dynamically extract content from the provided element
  const title = element.querySelector('h1')?.textContent || 'No title available';

  const imageSrc = element.querySelector('.mediaImg img')?.src || '';
  const image = document.createElement('img');
  if (imageSrc) {
    image.src = imageSrc;
  }

  const tips = Array.from(element.querySelectorAll('h3')).map((tip, index) => {
    const detail = element.querySelectorAll('p')[index]?.cloneNode(true);
    if (detail) {
      detail.innerHTML = detail.innerHTML.replace(/\*([^*]+)\*/g, '<em>$1</em>'); // Convert markdown italics to <em>
    }
    return [tip.textContent, detail || document.createTextNode('No detail available')];
  });

  // Combine the extracted content into structured cells
  const textCell = document.createElement('div');
  textCell.appendChild(document.createElement('h2')).textContent = title;

  const cells = [
    headerRow,
    [textCell, image],
    ...tips
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}