/* global WebImporter */
 export default function parse(element, { document }) {
  const blockName = ['Columns'];

  // Extracting first column content
  const tollFreeElement = element.querySelector('.callEmailSec:nth-child(1)');
  const tollFreeImage = tollFreeElement.querySelector('img');
  const tollFreeLabel = tollFreeElement.querySelector('label');
  const tollFreeLink = tollFreeElement.querySelector('a');

  const firstColumnContent = [
    tollFreeImage.cloneNode(true),
    tollFreeLabel.cloneNode(true),
    tollFreeLink.cloneNode(true)
  ];

  // Extracting second column content
  const emailElement = element.querySelector('.callEmailSec:nth-child(2)');
  const emailImage = emailElement.querySelector('img');
  const emailLabel = emailElement.querySelector('label');
  const emailText = emailElement.querySelector('h3');

  const secondColumnContent = [
    emailImage.cloneNode(true),
    emailLabel.cloneNode(true),
    emailText.cloneNode(true)
  ];

  // Extracting third column content
  const addressElement = element.querySelector('.addressSecMain');
  const addressImage = addressElement.querySelector('.addressImg img');
  const heading = addressElement.querySelector('.addressTxtSec h2');
  const officeText = addressElement.querySelector('.addressTxtSec span');
  const paragraph = addressElement.querySelector('.addressTxtSec p');

  const thirdColumnContent = [
    addressImage.cloneNode(true),
    officeText.cloneNode(true),
    heading.cloneNode(true),
    paragraph.cloneNode(true)
  ];

  const cells = [
    blockName, // Header row
    [firstColumnContent], // First column
    [secondColumnContent], // Second column
    [thirdColumnContent] // Third column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}