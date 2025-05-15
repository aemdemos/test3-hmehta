/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  const headerRow = ['Columns'];
  rows.push(headerRow);

  // Processing each section of the HTML
  const cardBodies = element.querySelectorAll('.card-body');
  cardBodies.forEach((cardBody) => {
    const cells = [];

    const cellContent = []; // Consolidate content into a single cell

    // Extract the image
    const img = cardBody.querySelector('.blogBanner img');
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt;
      cellContent.push(imageElement);
    }

    // Extract the text content
    const textSection = cardBody.querySelector('.blogTxtSec');
    if (textSection) {
      const title = textSection.querySelector('h3');
      if (title) {
        const titleElement = document.createElement('strong');
        titleElement.textContent = title.textContent.trim();
        cellContent.push(titleElement);
      }

      const summary = textSection.querySelector('.blogcontentSummary');
      if (summary) {
        const summaryElement = document.createElement('p');
        summaryElement.textContent = summary.textContent.trim();
        cellContent.push(summaryElement);
      }

      const readMore = textSection.querySelector('.readMoreLink');
      if (readMore) {
        const readMoreLink = document.createElement('a');
        readMoreLink.href = readMore.href;
        readMoreLink.textContent = 'Read more';
        cellContent.push(readMoreLink);
      }
    }

    // Add consolidated content to the cell
    cells.push(cellContent);

    rows.push(cells);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}