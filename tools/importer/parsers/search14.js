/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Include the header row as per example
  cells.push(['Search']);

  // Extract image with src attribute
  const image = element.querySelector('img');
  if (image && image.src) {
    const imageLink = document.createElement('a');
    imageLink.href = image.src;
    imageLink.textContent = image.src;
    cells.push([imageLink]);
  }

  // Extract and add all paragraphs dynamically
  const paragraphs = Array.from(element.querySelectorAll('p'));
  paragraphs.forEach((p) => {
    cells.push([p.textContent.trim()]);
  });

  // Extract list items dynamically
  const lists = Array.from(element.querySelectorAll('ul'));
  lists.forEach((ul) => {
    const items = Array.from(ul.querySelectorAll('li')).map((li) => li.textContent.trim());
    cells.push([items]);
  });

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}