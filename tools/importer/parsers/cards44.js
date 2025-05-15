/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Cards']);

  // Extract individual cards
  const navItems = element.querySelectorAll('li.nav-item');
  navItems.forEach((item) => {
    const imgActiveIn = item.querySelector('img.activeIn');
    const imgActiveOut = item.querySelector('img.activeOut');
    const title = item.querySelector('p');

    const image = document.createElement('img');
    image.src = imgActiveIn ? imgActiveIn.src : imgActiveOut.src;

    const text = document.createElement('div');
    if (title) {
      const heading = document.createElement('h2');
      heading.textContent = title.textContent;
      text.appendChild(heading);
    }

    rows.push([image, text]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element with the created table
  element.replaceWith(table);
}