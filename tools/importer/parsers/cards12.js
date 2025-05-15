/* global WebImporter */
export default function parse(element, { document }) {
  // Extract card data
  const cards = [];
  const cardHeaders = element.querySelectorAll('.card-header button');

  cardHeaders.forEach((button) => {
    const title = button.textContent.trim();
    const cardBody = button.closest('.card').querySelector('.card-body');

    const bodyParagraph = cardBody.querySelector('p');
    const bodyContent = document.createElement('div');

    Array.from(bodyParagraph.childNodes).forEach((node) => {
      if (node.nodeType === 3) { // Check for text node type
        const textSpan = document.createElement('span');
        textSpan.textContent = node.textContent.trim();
        bodyContent.appendChild(textSpan);
      } else {
        // Include links and other elements
        bodyContent.appendChild(node.cloneNode(true));
      }
    });

    cards.push([title, bodyContent]);
  });

  // Generate block table
  const blockTable = WebImporter.DOMUtils.createTable([
    ['Cards'],
    ...cards
  ], document);

  // Replace original element
  element.replaceWith(blockTable);
}