/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  rows.push(['Columns']);

  // First content column
  const tollFreeSection = element.querySelector('.tollFreeEmailBox .callEmailSec:nth-child(1)');
  const tollFreeImage = tollFreeSection.querySelector('img');
  const tollFreeLabel = document.createElement('span');
  tollFreeLabel.textContent = tollFreeSection.querySelector('label').textContent;
  const tollFreeNumberLink = tollFreeSection.querySelector('h3 a');

  const tollFreeContent = [
    tollFreeImage,
    tollFreeLabel,
    tollFreeNumberLink,
  ];

  // Second content column
  const emailSection = element.querySelector('.tollFreeEmailBox .callEmailSec:nth-child(2)');
  const emailImage = emailSection.querySelector('img');
  const emailLabel = document.createElement('span');
  emailLabel.textContent = emailSection.querySelector('label').textContent;
  const emailAddressText = document.createElement('span');
  emailAddressText.textContent = emailSection.querySelector('h3').textContent;

  const emailContent = [
    emailImage,
    emailLabel,
    emailAddressText,
  ];

  // Third content column
  const addressSection = element.querySelector('.addressSecMain');
  const addressImage = addressSection.querySelector('.addressImg img');
  const addressHeadingText = document.createElement('span');
  addressHeadingText.textContent = addressSection.querySelector('.addressTxtSec h2').textContent;
  const addressParagraphText = document.createElement('span');
  addressParagraphText.textContent = addressSection.querySelector('.addressTxtSec p').textContent.trim();

  const addressContent = [
    addressImage,
    addressHeadingText,
    addressParagraphText,
  ];

  // Add content rows
  rows.push([
    tollFreeContent,
    emailContent,
    addressContent,
  ]);

  // Create the table using WebImporter.DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}