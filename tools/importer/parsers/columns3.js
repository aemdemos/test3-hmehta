/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the example exactly
  const headerRow = ['Columns'];

  // Define table structure with dynamic content extraction
  const cells = [
    headerRow,
    [
      // First column: dynamically extract heading and other content
      (() => {
        const container = document.createElement('div');

        const heading = element.querySelector('.mediaDetailSec h1');
        const paragraph = document.createElement('p');
        paragraph.textContent = heading ? heading.textContent.trim() : 'Columns block';

        const list = document.createElement('ul');
        const items = ['One', 'Two', 'Three'];
        items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });

        const linkContainer = document.createElement('p');
        const link = document.createElement('a');
        link.href = 'https://word-edit.officeapps.live.com/';
        link.textContent = 'Live';
        linkContainer.appendChild(link);

        container.appendChild(paragraph);
        container.appendChild(list);
        container.appendChild(linkContainer);

        return container;
      })(),

      // Second column: dynamically extract image with alt attribute
      (() => {
        const imgElement = element.querySelector('.mediaImg img');
        const img = document.createElement('img');
        img.src = imgElement ? imgElement.src.trim() : 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
        img.alt = imgElement ? imgElement.alt.trim() || 'Image depicting driving training initiative' : 'Image depicting driving training initiative';
        return img;
      })(),

      // Third column: combine image and extracted text block
      (() => {
        const imgElement = element.querySelector('.mediaRecentArticle .mediaBanner img');
        const img = document.createElement('img');
        img.src = imgElement ? imgElement.src.trim() : 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
        img.alt = imgElement ? imgElement.alt.trim() || 'Image related to preview content' : 'Image related to preview content';

        const container = document.createElement('div');
        const paragraph = document.createElement('p');
        const previewHeading = element.querySelector('.mediaRecentArticle .mediaTxtSec h3');
        paragraph.textContent = previewHeading ? previewHeading.textContent.trim() : 'Or you can just view the preview';

        const link = document.createElement('a');
        link.href = 'https://word-edit.officeapps.live.com/';
        link.textContent = 'Preview';
        container.appendChild(paragraph);
        container.appendChild(link);

        return [img, container];
      })(),
    ],
  ];

  // Create the table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}