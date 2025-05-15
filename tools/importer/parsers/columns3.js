/* global WebImporter */
export default function parse(element, { document }) {
  // Correcting header row
  const headerRow = ['Columns'];

  // Extract headline
  const headlineText = element.querySelector('h1')?.textContent.trim();
  const headline = document.createElement('p');
  headline.textContent = headlineText || '';

  // Extract image
  const imgElement = element.querySelector('.mediaImg img');
  const image = document.createElement('img');
  image.src = imgElement?.getAttribute('src') || '';

  // Extract paragraphs and sanitize empty ones
  const contentParagraphs = Array.from(element.querySelectorAll('.mediaDetailTxtBox > table p'))
    .filter(p => p.textContent.trim())
    .map(p => {
      const paragraph = document.createElement('p');
      paragraph.textContent = p.textContent.trim();
      return paragraph;
    });

  // Extract list items and structure them correctly inside a <ul>
  const listItems = Array.from(element.querySelectorAll('.mediaDetailTxtBox ul li')).map(li => {
    const listItem = document.createElement('li');
    listItem.textContent = li.textContent.trim();
    return listItem;
  });
  const list = document.createElement('ul');
  list.append(...listItems);

  // Organize paragraphs into individual cells for clarity
  const leftColumnContent = [headline, ...contentParagraphs, list];

  // Create rows with individual cells for each paragraph
  const rows = leftColumnContent.map(content => [content]);

  // Create cells array
  const cells = [
    headerRow,
    ...rows,
    [[image]],
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}