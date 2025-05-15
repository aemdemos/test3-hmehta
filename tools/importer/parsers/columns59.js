/* global WebImporter */
export default function parse(element, { document }) {
  // Add section break (if required by example)
  const hr = document.createElement('hr');

  // Extract header row
  const headerRow = ['Columns'];

  // Dynamically extract content as unordered lists nested inside cells
  const columns = Array.from(element.querySelectorAll('.col-6.col-md-3')).map((column) => {
    const list = document.createElement('ul');
    Array.from(column.querySelectorAll('a')).forEach((link) => {
      const listItem = document.createElement('li');
      listItem.appendChild(link);
      list.appendChild(listItem);
    });
    return list;
  });

  // Ensure each column is properly wrapped once as a table cell
  const contentRow = columns.map((colContent) => {
    return colContent; // No nested <td> tags, but directly return content
  });

  // Assemble table data
  const tableData = [
    headerRow,
    contentRow,
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with section break and block table
  element.replaceWith(hr, blockTable);
}