/* global WebImporter */
export default function parse(element, { document }) {
  // Extract header row exactly as specified in the example
  const headerRow = ['Embed'];

  // Extract list items and concatenate them into a single string separated by line breaks
  const listItems = [...element.querySelectorAll('ul > li')]
    .map(li => li.textContent.trim())
    .join('<br>');

  // Extract hyperlink if it exists
  const link = element.querySelector('a');
  const linkText = link ? `<a href="${link.getAttribute('href')}">${link.textContent.trim()}</a>` : '';

  // Ensure the hyperlink appears only once, properly integrated in the content
  const combinedContent = `${listItems}${linkText ? '<br>' + linkText : ''}`;

  // Prepare the cells for the table
  const cells = [
    headerRow, // Header row
    [
      combinedContent // Single cell containing all content
    ]
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}