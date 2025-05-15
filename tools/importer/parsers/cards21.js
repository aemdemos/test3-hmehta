/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Cards']);

  // Extract the items
  const items = element.querySelectorAll('.whyUsIconTxtSec');

  items.forEach((item) => {
    const imageElement = item.querySelector('img');
    const titleElement = item.querySelector('h3');
    const descriptionElement = item.querySelector('p');

    // Create the image cell
    const image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt;

    // Create the text cell content
    const title = document.createElement('h3');
    title.textContent = titleElement.textContent;

    const description = document.createElement('p');
    description.textContent = descriptionElement.textContent;

    // Combine cells
    const textCell = [title, description];

    rows.push([image, textCell]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}