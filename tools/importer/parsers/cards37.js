/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  rows.push(['Cards']);

  // Loop through each card
  const items = element.querySelectorAll('.howGetLicenceBox');
  items.forEach((item) => {
    const img = item.querySelector('.howGetLicenceImg img');
    const imageElement = document.createElement('img');
    imageElement.src = img.getAttribute('data-src') || img.src;
    imageElement.alt = img.alt;

    const heading = item.querySelector('h3');
    const titleElement = document.createElement('p');
    titleElement.innerHTML = `<strong>${heading.textContent.trim()}</strong>`;

    const description = item.querySelector('.blogcontentSummary');
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description.textContent.trim();

    const link = item.querySelector('.readMoreLink');
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent.trim();

    const textCell = document.createElement('div');
    textCell.append(titleElement, descriptionElement, linkElement);

    rows.push([imageElement, textCell]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}