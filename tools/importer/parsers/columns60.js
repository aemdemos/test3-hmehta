/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const columns = [];

  // Extracting individual column content from the given HTML structure
  const columnElements = element.querySelectorAll('.col-12.col-lg-4');

  columnElements.forEach((col) => {
    const iconImg = col.querySelector('.blueBgIconSec img');
    const heading = col.querySelector('.blueBgTxtSec h3');
    const paragraph = col.querySelector('.blueBgTxtSec p');

    // Handle missing elements gracefully and push extracted content as separate cells
    const iconCell = iconImg ? document.createElement('img') : '';
    if (iconCell) {
      iconCell.src = iconImg.src;
      iconCell.alt = iconImg.alt;
    }

    const headingCell = heading ? heading.textContent : '';

    const paragraphCell = paragraph ? paragraph.textContent : '';

    columns.push([iconCell, headingCell, paragraphCell]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(
    [headerRow, ...columns],
    document
  );

  // Replace the original element with the table structure
  element.replaceWith(blockTable);
}