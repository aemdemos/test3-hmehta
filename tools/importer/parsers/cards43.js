/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  const headerRow = ['Cards'];
  rows.push(headerRow);

  const items = element.querySelectorAll('.item .mediaRptSec');

  items.forEach((item) => {
    const imageElement = item.querySelector('.coachImg img');
    const image = document.createElement('img');
    image.src = imageElement.getAttribute('data-src') || imageElement.src;
    image.alt = imageElement.alt;

    const titleElement = item.querySelector('.coachContent h3');
    const title = titleElement ? titleElement.textContent : '';

    const descriptionElement = item.querySelector('.coachContent p');
    const description = descriptionElement ? descriptionElement.textContent : '';

    const textCellContent = [];
    if (title) {
      const titleNode = document.createElement('strong');
      titleNode.textContent = title;
      textCellContent.push(titleNode);
    }
    if (description) {
      const descriptionNode = document.createElement('p');
      descriptionNode.textContent = description;
      textCellContent.push(descriptionNode);
    }

    rows.push([image, textCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}