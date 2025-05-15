/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  rows.push(['Cards']);

  // Process each card
  const cards = element.querySelectorAll('.listboxes .brick .mediaRptSec');
  cards.forEach((card) => {
    const imageElement = card.querySelector('img');
    const image = document.createElement('img');
    image.src = imageElement?.src || ''; // Ensure no 'Image unavailable' placeholder is added.
    image.alt = imageElement?.alt || ''; // Use empty alt text if missing.

    const textContent = [];
    const titleElement = card.querySelector('.mediaTxtSec h3');
    const descriptionElement = card.querySelector('.mediaTxtSec p');
    const linkElement = card.querySelector('.readMoreLink');

    // Add title
    if (titleElement) {
      const title = document.createElement('h3'); // Correct hierarchy without <strong> wrapper.
      title.textContent = titleElement.textContent.trim();
      textContent.push(title);
    }

    // Add description
    if (descriptionElement) {
      const description = document.createElement('p'); // Correct hierarchy with <p>.
      description.innerHTML = descriptionElement.innerHTML.trim();
      textContent.push(description);
    }

    // Add link
    if (linkElement) {
      const link = document.createElement('a');
      link.href = linkElement.href;
      link.textContent = linkElement.textContent.trim();
      textContent.push(link);
    }

    rows.push([image, textContent]);
  });

  // Replace the original element with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}