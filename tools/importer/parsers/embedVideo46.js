/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically
  const listItems = [...element.querySelectorAll('ul > li')].map(li => {
    // Remove markdown formatting (*), handle links properly
    const text = li.textContent.replace(/\*/g, '').trim();
    const link = li.querySelector('a');
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.getAttribute('href');
      linkElement.textContent = link.textContent.trim();
      return linkElement.outerHTML;
    }
    return text;
  });

  // Create table cells
  const tableCells = [
    ['Embed'],
    ...listItems.map(item => [item])
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}