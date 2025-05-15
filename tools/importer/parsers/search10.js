/* global WebImporter */
export default function parse(element, { document }) {
  // Create section break
  const hr = document.createElement('hr');

  // Extract dynamic content from the provided element (if applicable)
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Define the table header row dynamically
  const headerRow = ['Search'];

  // Create the URL row dynamically (absolute URL as required by the example)
  const urlRow = [document.createElement('a')];
  urlRow[0].href = url;
  urlRow[0].textContent = url;

  // Create the table structure
  const tableData = [
    headerRow, // Header row
    urlRow,    // URL row
  ];

  // Generate block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the element with the <hr> and new block table
  element.replaceWith(hr, blockTable);
}