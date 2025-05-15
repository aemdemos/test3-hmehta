/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Correctly define the header row to match the example exactly
  rows.push(['Hero']);

  // Extract the image
  const imgElement = element.querySelector('img');
  const image = imgElement ? document.createElement('img') : null;
  if (image && imgElement.src) {
    image.src = imgElement.src;
    image.alt = imgElement.alt || '';
  }

  // Extract the title
  const titleElement = element.querySelector('.carousel-caption h3');
  const title = titleElement ? document.createElement('h1') : null;
  if (title && titleElement.textContent) {
    title.textContent = titleElement.textContent.trim();
  }

  // Create the single content row as one column containing all extracted elements
  const contentRow = [];
  if (image) contentRow.push(image);
  if (title) contentRow.push(title);

  rows.push([contentRow]); // Ensure the second row is a single column containing all content

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element with the new structure
  element.replaceWith(table);
}