/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row defining block type
  cells.push(['Columns']);

  // Extract and structure data for blocks
  const columns = Array.from(element.querySelectorAll('.quizScoreCourseBox')).map((box) => {
    const img = box.querySelector('img');
    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt;

    const title = box.querySelector('h2')?.textContent.trim() || '';

    const description = box.querySelector('p')?.textContent.trim() || '';

    const button = box.querySelector('a');
    const buttonElement = document.createElement('a');
    buttonElement.href = button.href;
    buttonElement.textContent = button.textContent.trim();

    return [imageElement, `${title}\n${description}`, buttonElement];
  });

  cells.push(columns.map(col => col));

  // Create table using helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}