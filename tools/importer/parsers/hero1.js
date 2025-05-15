/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant information from the element
  const heading = element.querySelector('h1');
  const titleText = heading ? heading.textContent.trim() : '';
  const image = element.querySelector('.mediaImg img');
  const imageSrc = image ? image.src : '';
  const imageAlt = image ? image.alt : '';

  // Title element
  const titleElement = document.createElement('h1');
  titleElement.textContent = titleText;

  // Image element
  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;
  imageElement.alt = imageAlt;

  // Create block table content
  const blockContent = [titleElement, imageElement];

  // Create the table
  const cells = [
    ['Hero'],
    [blockContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}