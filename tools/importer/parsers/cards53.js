/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  const headerRow = ['Cards'];
  rows.push(headerRow);

  // Extract individual cards
  const cards = Array.from(element.querySelectorAll('.blogHomeBox')); // Ensure unique extraction

  cards.forEach((card) => {
    const imageContainer = card.querySelector('.blogHomeImg img');
    const image = document.createElement('img');
    image.src = imageContainer.getAttribute('data-src') || imageContainer.src;
    image.alt = imageContainer.alt;

    const contentContainer = card.querySelector('.blogContent');

    const titleElement = contentContainer.querySelector('h3');
    const title = titleElement ? document.createElement('p') : null;
    if (title) title.textContent = titleElement.textContent;

    const descriptionElement = contentContainer.querySelector('.blogcontentSummary');
    const description = descriptionElement ? document.createElement('p') : null;
    if (description) description.textContent = descriptionElement.textContent;

    const linkElement = contentContainer.querySelector('a.ripple');
    const link = linkElement ? document.createElement('a') : null;
    if (link) {
      link.href = linkElement.href;
      link.textContent = linkElement.textContent;
    }

    const contentCell = []; // Combine content in structured format
    if (title) contentCell.push(title);
    if (description) contentCell.push(description);
    if (link) contentCell.push(link);

    rows.push([image, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}