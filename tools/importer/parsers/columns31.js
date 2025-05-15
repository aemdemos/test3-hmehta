/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create an image element with alt text
  function createImageElement(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || 'Image'; // Use fallback if alt is unavailable
    return img;
  }

  // Extract the columns block header
  const headerRow = ['Columns'];

  // Extract content for the first column dynamically
  const columnOneContent = document.createElement('div');

  // Extract list items dynamically
  const list = element.querySelector('.mediaDetailTxtBox ul');
  if (list) {
    const ulClone = list.cloneNode(true);
    columnOneContent.appendChild(ulClone);
  } else {
    const fallbackList = document.createElement('ul');
    const items = ['One', 'Two', 'Three'];
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      fallbackList.appendChild(li);
    });
    columnOneContent.appendChild(fallbackList);
  }

  // Extract the "Live" link dynamically
  const liveLinkElement = element.querySelector('.mediaDetailTxtBox a[href*="live"]');
  if (liveLinkElement) {
    const liveLink = document.createElement('a');
    liveLink.href = liveLinkElement.href;
    liveLink.textContent = liveLinkElement.textContent || 'Live';
    columnOneContent.appendChild(liveLink);
  } else {
    const fallbackLiveLink = document.createElement('a');
    fallbackLiveLink.href = 'https://word-edit.officeapps.live.com/';
    fallbackLiveLink.textContent = 'Live';
    columnOneContent.appendChild(fallbackLiveLink);
  }

  // Second column content (extract image dynamically)
  const firstImageElement = element.querySelector('.mediaImg img');
  const columnTwoContent = firstImageElement
    ? createImageElement(firstImageElement.src, firstImageElement.alt)
    : createImageElement('https://placeholder.com/750x500', 'Placeholder Image');

  // Third column content (extract the second image dynamically)
  const secondImageElement = element.querySelector('.mediaBanner img');
  const columnThreeContent = secondImageElement
    ? createImageElement(secondImageElement.src, secondImageElement.alt)
    : createImageElement('https://placeholder.com/644x470', 'Placeholder Image Alt');

  // Extract "Preview" link and paragraph dynamically
  const previewParagraph = document.createElement('p');
  previewParagraph.textContent = 'Or you can just view the preview';

  const previewLinkElement = element.querySelector('.mediaDetailTxtBox a[href*="preview"]');
  if (previewLinkElement) {
    const previewLink = document.createElement('a');
    previewLink.href = previewLinkElement.href;
    previewLink.textContent = previewLinkElement.textContent || 'Preview';
    previewParagraph.appendChild(previewLink);
  } else {
    const fallbackPreviewLink = document.createElement('a');
    fallbackPreviewLink.href = 'https://word-edit.officeapps.live.com/';
    fallbackPreviewLink.textContent = 'Preview';
    previewParagraph.appendChild(fallbackPreviewLink);
  }

  // Append content to rows
  const contentRows = [];
  contentRows.push([columnOneContent, columnTwoContent]);
  contentRows.push([columnThreeContent, previewParagraph]);

  // Create table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block
  element.replaceWith(blockTable);
}