/* global WebImporter */
export default function parse(element, { document }) {
  const blockName = 'Cards';

  // Extract relevant content from the input element
  const items = element.querySelectorAll('.owl-item.active .roadSafetyImgTxt'); // Focus only on active items

  const rows = Array.from(items).map((item) => {
    const img = item.querySelector('img');
    const src = img ? img.getAttribute('data-src') || img.src : '';
    const alt = img ? img.alt || '' : '';
    const title = item.querySelector('span') ? item.querySelector('span').textContent.trim() : '';

    const imageElement = document.createElement('img');
    imageElement.src = src;
    imageElement.alt = alt;

    const textContent = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      textContent.appendChild(titleElement);
    }

    return [imageElement, textContent];
  });

  // Prepend the header row
  rows.unshift([blockName]);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}