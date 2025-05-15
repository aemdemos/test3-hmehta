/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns block'];

  const contentRows = [];

  const rows = element.querySelectorAll('.coursesContentRow');
  rows.forEach((row) => {
    const img = row.querySelector('.coursesLeftIcon img');
    const imgElement = document.createElement('img');
    imgElement.src = img.src;

    const text = row.querySelector('.coursesRightTitle');

    const textElement = document.createElement('div');
    if (text) {
      textElement.innerHTML = text.innerHTML.replace(/<br\s*\/?>/g, '<br>'); // Ensures proper separation and line breaks
    }

    contentRows.push([imgElement, textElement]); // Place image and text in separate cells for improved clarity
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  element.replaceWith(table);
}