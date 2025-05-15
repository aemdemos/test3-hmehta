/* global WebImporter */
 export default function parse(element, { document }) {
  // Extract the image from the <picture> tag
  const picture = element.querySelector('picture');
  let image;

  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt || '';
    }
  }

  // Define the header row for the table
  const headerRow = ['Hero'];

  // Create the cells for the content row dynamically based on the extracted image
  const contentRow = [image || ''];

  // Generate the block table
  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}