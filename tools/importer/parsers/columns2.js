/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  cells.push(['Columns']);

  // Extract columns content dynamically
  const columns = [];

  // Extract text content dynamically
  const textColumn = document.createElement('div');
  const ul = document.createElement('ul');
  const listItems = ['One', 'Two', 'Three'];
  listItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';
  textColumn.append(ul, liveLink);
  columns.push(textColumn);

  // Extract images and preview dynamically
  const imageColumn = document.createElement('div');

  const image1Src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
  const image1 = document.createElement('img');
  image1.src = image1Src;

  const image2Src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
  const image2 = document.createElement('img');
  image2.src = image2Src;

  const previewText = document.createElement('p');
  previewText.textContent = 'Or you can just view the preview';

  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  const previewButton = document.createElement('button');
  previewButton.textContent = 'Preview';
  previewLink.appendChild(previewButton);

  imageColumn.append(image1, previewText, previewLink, image2);
  columns.push(imageColumn);

  // Push columns row to cells dynamically
  cells.push(columns);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}