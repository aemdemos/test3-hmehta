/* global WebImporter */
export default function parse(element, { document }) {
  const blockName = ['Hero'];

  // Extract background image
  const picture = element.querySelector('picture');
  const imgElement = picture ? picture.querySelector('img') : null;
  const backgroundImage = imgElement ? imgElement.src : '';

  // Prepare content row
  const contentRow = [
    backgroundImage ? Object.assign(document.createElement('img'), { src: backgroundImage, alt: imgElement ? imgElement.alt : '' }) : '',
  ];

  // Create table structure
  const cells = [
    blockName,
    contentRow,
  ];

  // Create block using createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}