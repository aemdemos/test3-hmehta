/* global WebImporter */
export default function parse(element, { document }) {
  const blockTable = [];

  // Add header row
  const headerRow = ['Columns'];
  blockTable.push(headerRow);

  // Extract elements for columns
  const columns = [];

  // Extract unique list items from '.suggestedOptions ul li'
  const listItems = Array.from(new Set(Array.from(element.querySelectorAll('.suggestedOptions ul li')).map(li => li.textContent.trim())));
  if (listItems.length > 0) {
    const list = document.createElement('ul');
    listItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    columns.push(list);
  }

  // Extract anchor tag for 'Live' and ensure href is populated
  const liveLink = element.querySelector('.locationbutton a');
  if (liveLink && liveLink.href) {
    const linkElement = document.createElement('a');
    linkElement.href = liveLink.href;
    linkElement.textContent = 'Live';
    columns.push(linkElement);
  }

  // Extract and group images without duplicates
  const images = Array.from(new Set(Array.from(element.querySelectorAll('img')).map(img => img.src))).map(src => {
    const imgElement = document.createElement('img');
    imgElement.src = src;
    return imgElement;
  });
  if (images.length > 0) {
    columns.push(images);
  }

  // Add the extracted columns to the block table
  blockTable.push(columns);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(blockTable, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}