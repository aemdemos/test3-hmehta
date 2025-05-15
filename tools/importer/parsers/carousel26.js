/* global WebImporter */
export default function parse(element, { document }) {
  // Dynamically extract relevant data from the element
  const imgSrc = element.getAttribute('src');
  const imgAlt = element.getAttribute('alt');

  const imageElement = document.createElement('img');
  imageElement.setAttribute('src', imgSrc);
  imageElement.setAttribute('alt', imgAlt);

  // Build table cells structure
  const cells = [
    ['Carousel'],
    [
      imageElement,
      imgAlt || '' // Use extracted alt text or an empty string if no alt text is provided
    ],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block
  element.replaceWith(block);
}