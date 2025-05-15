/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize an array to hold the rows of the table
  const rows = [];

  // Add the header row with the exact text from the example
  rows.push(['Columns']);

  // Extract the list items from the body of the card
  const cardBody = element.querySelector('.card-body');
  const listItems = cardBody.querySelectorAll('ul li');
  const listElements = Array.from(listItems).map((li) => li.textContent.trim());

  // Create the content row
  rows.push([listElements.join('<br>')]);

  // Use the createTable utility to generate the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}