/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extracting content dynamically for the Columns block
  const headerRow = ['Columns'];
  const rows = [];

  const columnContent = element.querySelectorAll('.quizLeftMain .carQuizStep');

  columnContent.forEach((column) => {
    const cells = [];

    // Extract image dynamically
    const image = column.querySelector('img');
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      cells.push(imgElement);
    }

    // Extract question label dynamically
    const label = column.querySelector('label');
    if (label) {
      const questionText = label.textContent.trim();
      const paragraph = document.createElement('p');
      paragraph.textContent = questionText;
      cells.push(paragraph);
    }

    // Extract additional content dynamically
    const listItems = Array.from(column.querySelectorAll('ul li')).map((li) => {
      const span = li.querySelector('span');
      const itemText = span && span.textContent.trim() ? span.textContent.trim() : li.textContent.trim();
      return itemText;
    }).filter(Boolean); // Ensure no empty entries are included

    if (listItems.length > 0) {
      const listElement = document.createElement('ul');
      listItems.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);
      });
      cells.push(listElement);
    }

    rows.push(cells);
  });

  // Create a table dynamically with proper headers and extracted rows
  const block = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace original element with the section break and block table
  element.replaceWith(hr, block);
}