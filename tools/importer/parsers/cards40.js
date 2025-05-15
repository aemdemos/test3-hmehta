/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Adding the header row for 'Cards'
  rows.push(['Cards']);

  // Parsing each card element within the provided HTML
  const cardElements = element.querySelectorAll('.owl-item .item .drivingTipsSec');
  cardElements.forEach((card) => {
    const imageElement = card.querySelector('.drivingTipsBanner img');
    const titleElement = card.querySelector('.drivingTipsTxtSec h3');
    const descriptionElement = card.querySelector('.drivingTipsTxtSec .blogcontentSummary');
    const linkElement = card.querySelector('.drivingTipsTxtSec .readMoreLink');

    const image = imageElement ? document.createElement('img') : null;
    if (imageElement) {
      image.src = imageElement.getAttribute('data-src') || imageElement.getAttribute('src');
      image.alt = imageElement.getAttribute('alt');
    }

    const title = titleElement ? document.createElement('strong') : null;
    if (titleElement) title.textContent = titleElement.textContent.trim();

    const description = descriptionElement ? document.createElement('p') : null;
    if (descriptionElement) description.textContent = descriptionElement.textContent.trim();

    const link = linkElement ? document.createElement('a') : null;
    if (linkElement) {
      link.href = linkElement.getAttribute('href');
      link.textContent = linkElement.querySelector('span').textContent.trim();
    }

    const content = [];
    if (title) content.push(title);
    if (description) content.push(document.createElement('br'), description); // Add proper separation
    if (link) content.push(document.createElement('br'), link); // Add proper separation

    rows.push([image, content]);
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}