/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per example
  const headerRow = ['Columns'];

  // Initialize rows array
  const rows = [];

  // Extract the 'Columns block' and associated list into one cell
  const columnsBlockText = document.createElement('div');
  columnsBlockText.textContent = 'Columns block';

  const list = document.createElement('ul');
  const listItems = element.querySelectorAll('.quizLeftMain .block_1 ul li');
  listItems.forEach((li) => {
    const clonedLi = li.cloneNode(true);
    list.appendChild(clonedLi);
  });

  const firstCell = document.createElement('div');
  firstCell.appendChild(columnsBlockText);
  firstCell.appendChild(list);

  const firstRow = [firstCell];
  rows.push(firstRow);

  // Extract images and group them logically into one row with multiple columns
  const images = element.querySelectorAll('img');
  const imageCells = Array.from(images).map((img) => {
    const clonedImg = img.cloneNode(true);
    return clonedImg;
  });
  rows.push(imageCells);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the constructed table
  element.replaceWith(blockTable);
}