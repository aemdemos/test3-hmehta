/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create a cell with an image and text content
  const createImageCell = (src, alt, text) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';

    const content = document.createElement('div');
    content.append(img);
    if (text) {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      content.append(paragraph);
    }
    return content;
  };

  // Helper function to create a cell with a link and text content
  const createLinkCell = (href, text) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    return link;
  };

  const headerRow = ['Columns'];

  // First column content
  const firstColumn = document.createElement('div');
  const list = document.createElement('ul');

  ['One', 'Two', 'Three'].forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  });
  
  firstColumn.appendChild(list);

  const liveLink = createLinkCell('https://word-edit.officeapps.live.com/', 'Live');
  firstColumn.appendChild(liveLink);

  // Second column content
  const secondColumn = createImageCell(
    'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500',
    'Green Double Helix'
  );

  // Third column content
  const thirdColumn = createImageCell(
    'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470',
    'Yellow Double Helix',
    'Or you can just view the preview'
  );

  const previewLink = createLinkCell(
    'https://word-edit.officeapps.live.com/',
    'Preview'
  );

  thirdColumn.appendChild(previewLink);

  const cells = [
    headerRow,
    [firstColumn, secondColumn, thirdColumn],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}