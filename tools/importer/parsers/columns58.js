/* global WebImporter */
export default function parse(element, { document }) {
  const blockTableData = [];

  // Add header row matching the example exactly
  const headerRow = ['Columns'];
  blockTableData.push(headerRow);

  const columnsContent = [];

  // Extract dynamic content for the first column
  const textContainer = document.createElement('div');
  const textBlocks = element.querySelectorAll('ul li');
  const list = document.createElement('ul');
  textBlocks.forEach((block) => {
    const listItem = document.createElement('li');
    listItem.textContent = block.textContent.trim().replace(/^>/, '');
    list.appendChild(listItem);
  });
  textContainer.appendChild(document.createTextNode('Columns block'));
  textContainer.appendChild(list);
  columnsContent.push(textContainer);

  // Extract the first image dynamically
  const images = element.querySelectorAll('img');
  if (images.length > 0) {
    columnsContent.push(images[0].cloneNode(true));
  }

  // Extract the second image and preview link dynamically
  if (images.length > 1) {
    const secondImageContent = document.createElement('div');
    secondImageContent.appendChild(images[1].cloneNode(true));

    const previewLink = element.querySelector('a[href]');
    if (previewLink) {
      const previewDiv = document.createElement('div');
      const previewParagraph = document.createElement('p');
      const previewAnchor = document.createElement('a');

      previewAnchor.href = previewLink.href;
      previewAnchor.textContent = 'Preview';
      previewParagraph.textContent = 'Or you can just view the preview';
      previewParagraph.appendChild(document.createElement('br'));
      previewParagraph.appendChild(previewAnchor);

      previewDiv.appendChild(previewParagraph);
      secondImageContent.appendChild(previewDiv);
    }

    columnsContent.push(secondImageContent);
  }

  blockTableData.push(columnsContent);

  // Create the table using WebImporter function
  const blockTable = WebImporter.DOMUtils.createTable(blockTableData, document);

  // Replace the original element with the structured block table
  element.replaceWith(blockTable);
}