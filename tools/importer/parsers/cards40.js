/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Cards']);

  // Collect all cards
  const items = element.querySelectorAll('.item');

  items.forEach((item) => {
    const imageContainer = item.querySelector('.drivingTipsBanner img');
    const textContainer = item.querySelector('.drivingTipsTxtSec');

    // Extract image
    let imageElement = null;
    if (imageContainer) {
      imageElement = document.createElement('img');
      imageElement.setAttribute('src', imageContainer.getAttribute('data-src'));
      imageElement.setAttribute('alt', imageContainer.getAttribute('alt'));
    }

    // Extract title
    let titleElement = null;
    const title = textContainer.querySelector('h3');
    if (title) {
      titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent;
    }

    // Extract description
    const description = textContainer.querySelector('.blogcontentSummary');

    // Extract call-to-action link
    const ctaLink = textContainer.querySelector('.readMoreLink');
    let ctaElement = null;
    if (ctaLink) {
      ctaElement = document.createElement('a');
      ctaElement.setAttribute('href', ctaLink.getAttribute('href'));
      ctaElement.textContent = ctaLink.textContent;
    }

    // Build text content cell
    const textContent = [];
    if (titleElement) textContent.push(titleElement);
    if (description) textContent.push(document.createTextNode(description.textContent));
    if (ctaElement) textContent.push(ctaElement);

    // Add row to table
    rows.push([imageElement, textContent]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with table
  element.replaceWith(table);
}