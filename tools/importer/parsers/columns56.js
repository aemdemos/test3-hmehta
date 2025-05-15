/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract image element with src
  const createImageCell = (imgElement, doc) => {
    const image = document.createElement('img');
    image.src = imgElement.getAttribute('data-src') || imgElement.src;
    image.alt = imgElement.alt;
    return image;
  };

  // Extract content from the given element
  const content = [];

  const blocks = element.querySelectorAll('.studentFacultyDealerRow, .imgVideoSec');

  // To avoid duplicates, use a Set to track processed blocks
  const processedBlocks = new Set();

  blocks.forEach((block) => {
    const row = [];

    const imageElement = block.querySelector('img');
    if (imageElement) {
      const imageSrc = imageElement.getAttribute('data-src') || imageElement.src;
      // Check if this image has already been processed
      if (processedBlocks.has(imageSrc)) {
        return; // Skip duplicates
      }
      row.push(createImageCell(imageElement, document));
      processedBlocks.add(imageSrc); // Mark as processed
    }

    const textContent = block.querySelector('h3, p');
    if (textContent) {
      row.push(textContent.cloneNode(true));
    }

    content.push(row);
  });

  // Create the header row based on the description
  const headerRow = ['Columns'];

  // Create the table for the structured element
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...content], document);

  // Replace the original element with the new structured format
  element.replaceWith(blockTable);
}