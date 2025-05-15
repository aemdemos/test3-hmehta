/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize rows for the table
  const rows = [];

  // Add the header row
  rows.push(['Columns']);

  // Extract content dynamically from the provided HTML
  const contentRows = [];

  // Extract all rows of content dynamically from the element
  const studentRows = element.querySelectorAll('.studentFacultyDealerRow');

  // Avoid duplicate rows by filtering unique rows
  const uniqueRows = new Set();

  studentRows.forEach(row => {
    const imgElement = row.querySelector('img');
    const textElement = row.querySelector('.studentFacultyDealerTxt');

    const image = document.createElement('img');
    const src = imgElement && imgElement.getAttribute('src');
    if (src) {
      image.src = src;
      image.alt = imgElement.getAttribute('alt') || '';
      const textContent = document.createElement('div');
      textContent.innerHTML = textElement.innerHTML;

      // Combine image and text as row content, ensuring unique content rows
      const rowContent = `${src}${textContent.innerHTML}`;
      if (!uniqueRows.has(rowContent)) {
        contentRows.push([image, textContent]);
        uniqueRows.add(rowContent);
      }
    }
  });

  // Extract additional column for practical learning dynamically
  const practicalLearningElement = element.querySelector('.imgVideoSec.right');
  if (practicalLearningElement) {
    const practicalImage = practicalLearningElement.querySelector('img');
    const src = practicalImage && practicalImage.getAttribute('src');
    if (src) {
      const practicalImageElement = document.createElement('img');
      practicalImageElement.src = src;
      practicalImageElement.alt = practicalImage.getAttribute('alt') || '';

      const practicalTextElement = document.createElement('div');
      practicalTextElement.innerHTML = practicalLearningElement.querySelector('h3').outerHTML + practicalLearningElement.querySelector('p').outerHTML;

      contentRows.push([practicalImageElement, practicalTextElement]);
    }
  }

  // Add content rows to the table
  rows.push(...contentRows);

  // Create the block table using WebImporter
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}