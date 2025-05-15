/* global WebImporter */
export default function parse(element, { document }) {
  const contentBlocks = [];

  // Static definition of header row
  const headerRow = ['Columns'];

  element.querySelectorAll('.card').forEach((card) => {
    // Extract header text
    const headerButton = card.querySelector('.card-header button');
    const headerText = headerButton ? headerButton.textContent.trim() : 'Unknown Header';

    // Extract body content
    const body = card.querySelector('.card-body');
    let bodyContent = '';

    if (body) {
      const paragraph = body.querySelector('p');
      if (paragraph) {
        bodyContent += paragraph.textContent.trim() + '\n';
      }

      const listItems = body.querySelectorAll('ul li');
      if (listItems.length > 0) {
        const itemsText = Array.from(listItems).map((li) => li.textContent.trim()).join(', ');
        bodyContent += itemsText;
      }
    }

    // Ensure body content is not empty
    if (!bodyContent) {
      bodyContent = 'No content available';
    }

    // Create table cells
    const cells = [
      headerRow,
      [document.createTextNode(headerText), document.createTextNode(bodyContent)],
    ];

    // Create table block
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    contentBlocks.push(blockTable);
  });

  // Replace original element
  element.replaceWith(...contentBlocks);
}