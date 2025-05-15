/* global WebImporter */
export default function parse(element, { document }) {
  // Create an array to store rows for the table
  const rows = [];

  // Add the header row for the table
  rows.push(['Cards']);

  // Extract cards from the element
  const cardElements = element.querySelectorAll('.item');
  cardElements.forEach((cardElement) => {
    const imageElement = cardElement.querySelector('img');
    const image = document.createElement('img');
    image.src = imageElement.getAttribute('src') || imageElement.getAttribute('data-src');
    image.alt = imageElement.alt;

    const titleElement = cardElement.querySelector('h3');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const descriptionElement = cardElement.querySelector('.blogcontentSummary');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    const linkElement = cardElement.querySelector('a.readMoreLink');
    const link = linkElement ? document.createElement('a') : null;
    if (link) {
      link.href = linkElement.href;
      link.textContent = 'Read more';
    }

    // Create cell content for the second column
    const textContent = [];
    if (title) {
      const titleNode = document.createElement('strong');
      titleNode.textContent = title;
      textContent.push(titleNode);
      textContent.push(document.createElement('br'));
    }
    if (description) {
      const descriptionNode = document.createElement('p');
      descriptionNode.textContent = description;
      textContent.push(descriptionNode);
    }
    if (link) {
      textContent.push(link);
    }

    // Add the row to the table
    rows.push([image, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}