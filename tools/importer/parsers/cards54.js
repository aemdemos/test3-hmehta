/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const rows = Array.from(element.querySelectorAll('.valueAddedBox')).map((box) => {
    const img = box.querySelector('img');
    const imageElement = document.createElement('img');
    imageElement.src = img.src;

    const title = box.querySelector('h3')?.textContent;
    const description = box.querySelector('p')?.textContent;

    const textContent = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title;
      textContent.appendChild(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      textContent.appendChild(descriptionElement);
    }

    return [imageElement, textContent];
  });

  const tableData = [
    headerRow,
    ...rows,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}