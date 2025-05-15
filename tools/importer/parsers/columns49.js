/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row containing the block name
  cells.push(['Columns']);

  // Extract content from the element
  const imageContainer = element.querySelector('.borderR img');
  const image = document.createElement('img');
  image.src = imageContainer.src;

  const contentContainer = element.querySelector('.aboutMsilSec');
  const heading = contentContainer.querySelector('h2');
  const paragraphs = contentContainer.querySelectorAll('p');

  // Create content block
  const contentBlock = [];

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    contentBlock.push(h2);
  }

  paragraphs.forEach((p) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = p.textContent;
    contentBlock.push(paragraph);
  });

  cells.push([image, contentBlock]);

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the created block
  element.replaceWith(block);
}