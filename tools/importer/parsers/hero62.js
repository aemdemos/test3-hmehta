/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting the image element
  const pictureElement = element.querySelector('picture');
  const imgElement = pictureElement?.querySelector('img');

  // Handling edge cases for missing picture or img elements
  if (!pictureElement || !imgElement) {
    console.error('Picture or Image element is missing');
    return;
  }

  // Creating the image element dynamically
  const imageSrc = imgElement.getAttribute('src');
  const imageAlt = imgElement.getAttribute('alt') || ''; // Default to empty string if alt is missing
  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;
  imageElement.alt = imageAlt;

  // Table data setup
  const tableData = [
    ['Hero'], // Header row matches example exactly
    [imageElement], // Single cell in content row containing the image
  ];

  // Creating the table dynamically
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}