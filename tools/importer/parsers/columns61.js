/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Section Metadata Table
  const sectionMetadataTableData = [
    ['Section Metadata'],
    ['Name', 'Columns'],
  ];
  const sectionMetadataTable = WebImporter.DOMUtils.createTable(sectionMetadataTableData, document);

  // Extract content for columns block
  const headerRow = ['Columns'];

  // Dynamically create content instead of hardcoding
  const list = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';

  const image1 = document.createElement('img');
  image1.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png';
  image1.alt = 'Green Double Helix';

  const image2 = document.createElement('img');
  image2.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png';
  image2.alt = 'Yellow Double Helix';

  const previewText = document.createTextNode('Or you can just view the preview');

  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';

  const columnsBlockTableData = [
    headerRow,
    [
      [list, liveLink],
      [image1, image2, previewText, previewLink]
    ],
  ];

  const columnsBlockTable = WebImporter.DOMUtils.createTable(columnsBlockTableData, document);

  element.replaceWith(hr, sectionMetadataTable, columnsBlockTable);
}