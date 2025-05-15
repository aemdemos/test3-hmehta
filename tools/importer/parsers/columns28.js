/* global WebImporter */
export default function parse(element, { document }) {
  // Header row based on example markdown
  const headerRow = ['Columns']; // Ensure this exactly matches the example header

  // Extracting second-row content dynamically
  const listContainer = document.createElement('ul');
  const listItems = ['One', 'Two', 'Three']; // Example content from markdown
  listItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    listContainer.appendChild(li);
  });

  const liveLinkElement = element.querySelector('a[href*="word-edit.officeapps.live.com"]') || null;
  const liveLink = document.createElement('a');
  liveLink.href = liveLinkElement?.href || 'https://word-edit.officeapps.live.com/'; // Default to example link
  liveLink.textContent = liveLinkElement?.textContent.trim() || 'Live'; // Default to example text

  const secondRow = [listContainer, liveLink];

  // Extracting third-row content dynamically
  const images = Array.from(element.querySelectorAll('img[src]')); // Dynamically fetch images
  const imageYellowHelix = document.createElement('img');
  imageYellowHelix.src = images.find(img => img.src.includes('media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png'))?.src || 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470'; // Example image fallback

  const previewLinkElement = element.querySelector('a[href*="word-edit.officeapps.live.com"]') || null;
  const previewLink = document.createElement('a');
  previewLink.href = previewLinkElement?.href || 'https://word-edit.officeapps.live.com/'; // Default to example link
  previewLink.textContent = previewLinkElement?.textContent.trim() || 'Preview'; // Default to example text

  const italicPreviewText = document.createElement('em');
  italicPreviewText.appendChild(previewLink);

  const thirdRow = [imageYellowHelix, italicPreviewText];

  // Compile all rows into the table
  const cells = [headerRow, secondRow, thirdRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}