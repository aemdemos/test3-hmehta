/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create the table
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract the left column content dynamically
  const leftColumn = document.createElement('div');
  const heading = element.querySelector('.aboutFirsTxtInn h1');
  const paragraphs = element.querySelectorAll('.aboutFirsTxtInn p');
  const listItems = element.querySelectorAll('.aboutFirsTxtInn ul li');

  if (heading) {
    leftColumn.appendChild(heading.cloneNode(true));
  }

  paragraphs.forEach((p) => {
    leftColumn.appendChild(p.cloneNode(true));
  });

  if (listItems.length > 0) {
    const list = document.createElement('ul');
    listItems.forEach((li) => {
      list.appendChild(li.cloneNode(true));
    });
    leftColumn.appendChild(list);
  }

  // Extract the right column content dynamically
  const rightColumn = document.createElement('div');
  const image = element.querySelector('.aboutFirsImgSec img');

  if (image) {
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    rightColumn.appendChild(imgElement);
  }

  // Create the table rows dynamically
  const headerRow = ['Columns'];
  const contentRow = [leftColumn, rightColumn];

  // Create the table
  const table = createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}