/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title from the button inside card-header
  const button = element.querySelector('.card-header button');
  const titleText = button ? button.textContent.trim().replace(/\s+/g, ' ') : '';

  // Extract the body content
  const bodyContent = element.querySelector('.card-body');
  const bodyText = bodyContent ? bodyContent.textContent.split('SCHEDULE')[0].trim() : '';

  // Extract the link from the anchor tag inside the body content
  const anchor = bodyContent ? bodyContent.querySelector('a') : null;
  const linkElement = anchor ? document.createElement('a') : null;
  if (linkElement && anchor) {
    linkElement.setAttribute('href', anchor.getAttribute('href'));
    linkElement.textContent = anchor.textContent.trim();
  }

  // Ensure proper separation of text and anchor elements
  const separatedBodyContent = [document.createTextNode(bodyText + ' '), linkElement].filter(Boolean);

  // Create the cells for the table
  const tableData = [
    ['Columns'],
    [
      document.createTextNode(titleText),
      separatedBodyContent,
    ],
  ];

  // Create the table using the WebImporter.DOMUtils.createTable function
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}