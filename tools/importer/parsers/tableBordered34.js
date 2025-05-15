/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row matching the example exactly
  const headerRow = ['Table (bordered)'];

  // Extract content dynamically
  const imageElement = element.querySelector('img[data-src]');
  const imageSrc = imageElement ? imageElement.getAttribute('data-src') : '';
  const imageAlt = imageElement ? imageElement.getAttribute('alt') || '' : '';

  const headingElement = element.querySelector('h2');
  const headingText = headingElement ? headingElement.textContent.trim() : '';

  const paragraphElement = element.querySelector('p');
  const paragraphText = paragraphElement ? paragraphElement.textContent.trim() : '';

  const linkElement = element.querySelector('a[href]');
  const linkHref = linkElement ? linkElement.getAttribute('href') : '';
  const linkText = linkElement ? linkElement.textContent.trim() : '';

  // Combine the link and image into a single cell
  const combinedCell = document.createElement('div');
  if (linkHref) {
    const link = document.createElement('a');
    link.setAttribute('href', linkHref);
    link.textContent = linkText;
    combinedCell.appendChild(link);
  }
  if (imageSrc) {
    const img = document.createElement('img');
    img.setAttribute('src', imageSrc);
    img.setAttribute('alt', imageAlt);
    combinedCell.appendChild(img);
  }

  // Create table rows dynamically
  const tableRows = [
    headerRow, // Header row from the example structure
    [headingText],
    [paragraphText],
    [combinedCell],
  ];

  // Create table block dynamically
  const tableBlock = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace element with the table block
  element.replaceWith(tableBlock);
}