/* global WebImporter */
export default function parse(element, { document }) {
  const blockName = 'Accordion';

  // Extract the title
  const titleElement = element.querySelector('button');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the content
  const contentElement = element.querySelector('.card-body');
  const content = contentElement ? contentElement.innerHTML.trim() : '';

  // Prepare the table data
  const cells = [
    [blockName],
    [title, content]
  ];

  // Create the table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}