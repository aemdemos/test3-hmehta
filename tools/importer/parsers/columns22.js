/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract content from columns
  const extractColumnContent = (column) => {
    const image = column.querySelector('img');
    const heading = column.querySelector('h3');
    const listItems = column.querySelectorAll('ul li');

    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';
    }

    const headingText = heading ? heading.textContent.trim() : '';

    const listElements = [];
    listItems.forEach((item) => {
      const link = item.querySelector('a');
      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        listElements.push(anchor);
      } else {
        listElements.push(item.textContent.trim());
      }
    });

    return [headingText, imageElement, listElements];
  };

  // Extract all columns
  const columns = Array.from(element.querySelectorAll('.col-6.col-md-3'));
  const columnContents = columns.map(extractColumnContent);

  // Create the table data
  const tableData = [
    ['Columns'],
    columnContents.map(([headingText, imageElement, listElements]) => {
      const cellContent = [];
      if (headingText) {
        const heading = document.createElement('h3');
        heading.textContent = headingText;
        cellContent.push(heading);
      }
      if (imageElement) {
        cellContent.push(imageElement);
      }
      if (listElements.length) {
        const list = document.createElement('ul');
        listElements.forEach((item) => {
          const listItem = document.createElement('li');
          if (typeof item === 'string') {
            listItem.textContent = item;
          } else {
            listItem.appendChild(item);
          }
          list.appendChild(listItem);
        });
        cellContent.push(list);
      }
      return cellContent;
    }),
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}