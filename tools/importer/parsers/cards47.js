/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  rows.push(['Cards']);

  // Extract content for each card
  const items = element.querySelectorAll('.item');
  const uniqueTitles = new Set(); // Track unique titles to avoid duplicates

  items.forEach((item) => {
    const imageElement = item.querySelector('.mediaBanner img');
    const textSection = item.querySelector('.mediaTxtSec');

    // Skip if textSection or imageElement is missing
    if (!textSection || !imageElement) {
      return;
    }

    const titleElement = textSection.querySelector('h3');
    const descriptionElement = textSection.querySelector('p');
    const readMoreLink = textSection.querySelector('a.readMoreLink');
    const dateElement = textSection.querySelector('.datesR');

    // Skip if title is missing or duplicate
    if (!titleElement || uniqueTitles.has(titleElement.textContent.trim())) {
      return;
    }

    uniqueTitles.add(titleElement.textContent.trim());

    let image = null;
    if (imageElement) {
      image = document.createElement('img');
      image.src = imageElement.dataset.src || imageElement.src;
      image.alt = imageElement.alt || '';
    }

    const content = [];

    if (titleElement) {
      const title = document.createElement('strong');
      title.textContent = titleElement.textContent.trim();
      content.push(title);
    }

    if (descriptionElement) {
      const description = document.createElement('p');
      description.textContent = descriptionElement.textContent.trim();
      content.push(description);
    }

    if (readMoreLink) {
      const link = document.createElement('a');
      link.href = readMoreLink.href;
      link.textContent = readMoreLink.textContent.trim();
      content.push(link);
    }

    if (dateElement) {
      const date = document.createElement('span');
      date.textContent = dateElement.textContent.trim();
      content.push(date);
    }

    rows.push([image, content]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}