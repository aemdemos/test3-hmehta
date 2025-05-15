/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Process columns
  const columns = Array.from(element.querySelectorAll('.col-6')); // Select all column elements

  const contentRow = columns.map((column) => {
    const content = [];

    // Extract image
    const img = column.querySelector('img');
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      content.push(imageElement);
    }

    // Extract text content
    const h3 = column.querySelector('h3');
    if (h3) {
      const headingElement = document.createElement('p');
      headingElement.textContent = h3.textContent;
      content.push(headingElement);
    }

    const ul = column.querySelector('ul');
    if (ul) {
      const listItems = Array.from(ul.querySelectorAll('li')).map((li) => {
        const link = li.querySelector('a');
        if (link) {
          const anchorElement = document.createElement('a');
          anchorElement.href = link.href;
          anchorElement.textContent = link.textContent.trim();
          return anchorElement;
        }
        return null;
      }).filter(Boolean);

      content.push(...listItems);
    }

    return content; // Return array of elements for this column
  });

  cells.push(contentRow); // Ensure content row contains individual columns as separate cells

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}