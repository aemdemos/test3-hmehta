/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  const headerRow = ['Cards'];
  rows.push(headerRow);

  // Parse each card in the provided HTML
  const cards = Array.from(document.querySelectorAll('.addressSecMain'));
  cards.forEach((card) => {
    const imageContainer = card.querySelector('.addressImg img');
    const image = imageContainer ? document.createElement('img') : null;
    if (image) {
      image.src = imageContainer.src;
      image.alt = imageContainer.alt;
    }

    const textContainer = card.querySelector('.addressDetails .addressTxtSec');
    const officeName = textContainer.querySelector('span')?.textContent.trim() || '';
    const title = textContainer.querySelector('h2')?.textContent.trim() || '';
    const description = textContainer.querySelector('p')?.innerHTML.trim() || '';

    const textContent = document.createElement('div');
    if (officeName) {
      const nameElement = document.createElement('strong');
      nameElement.textContent = officeName;
      textContent.appendChild(nameElement);
    }

    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      textContent.appendChild(titleElement);
    }

    if (description) {
      const descElement = document.createElement('p');
      descElement.innerHTML = description;
      textContent.appendChild(descElement);
    }

    rows.push([image, textContent]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  
  // Replace the original element with the table
  element.replaceWith(table);
}