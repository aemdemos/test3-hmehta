/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [['Cards']];

  const items = element.querySelectorAll('.owl-item .mediaRptSec');

  items.forEach((item) => {
    const image = item.querySelector('img');
    const imgElement = document.createElement('img');
    imgElement.src = image.getAttribute('data-src') || image.getAttribute('src');

    const coachContent = item.querySelector('.coachContent');

    const title = coachContent.querySelector('strong')?.textContent || '';
    const location = coachContent.querySelector('span')?.textContent || '';
    const heading = coachContent.querySelector('h3')?.textContent || '';
    const description = coachContent.querySelector('p')?.textContent || '';

    const contentCell = document.createElement('div');

    const locationElement = document.createElement('span');
    locationElement.textContent = location;

    contentCell.appendChild(document.createElement('strong')).textContent = title;
    contentCell.appendChild(locationElement);
    contentCell.appendChild(document.createElement('h3')).textContent = heading;
    contentCell.appendChild(document.createElement('p')).textContent = description;

    cells.push([imgElement, contentCell]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}