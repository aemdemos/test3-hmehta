/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create a single column
  const createColumn = (iconSrc, title, description) => {
    const image = document.createElement('img');
    image.src = iconSrc;

    const heading = document.createElement('h3');
    heading.textContent = title;

    const paragraph = document.createElement('p');
    paragraph.textContent = description;

    return [image, heading, paragraph];
  };

  // Extract the columns from the input HTML
  const columnElements = Array.from(element.querySelectorAll('.col-12.col-lg-4'));
  const columns = columnElements.map((col) => {
    const icon = col.querySelector('.blueBgIconSec img').src;
    const titleElement = col.querySelector('.blueBgTxtSec h3');
    const titleText = titleElement.textContent.trim();

    const descriptionElement = col.querySelector('.blueBgTxtSec p');
    const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';

    return createColumn(icon, titleText, descriptionText);
  });

  // Create the table structure
  const tableData = [
    ['Columns'], // Correct header row with a single column
    columns.map((columnContent) => columnContent) // Ensure each column's content is placed in separate cells
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the formatted table
  element.replaceWith(table);
}