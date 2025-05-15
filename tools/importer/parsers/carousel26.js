/* global WebImporter */
export default function parse(element, { document }) {
  // Define the block table header
  const headerRow = ['Carousel'];

  // Extract the image from the given HTML element
  const imageSrc = element.getAttribute('src');
  const image = document.createElement('img');
  image.setAttribute('src', imageSrc);

  // Extract the caption using the 'alt' attribute
  const captionText = element.getAttribute('alt') || '';

  // Create a single cell containing both the image and the caption
  const contentCell = [image, document.createElement('br'), document.createTextNode(captionText)];

  // Combine the rows into the table structure
  const tableData = [headerRow, [contentCell]];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}