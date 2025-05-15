/* global WebImporter */
export default function parse(element, { document }) {
  function extractCards(element) {
    const cards = [];
    const items = element.querySelectorAll('.owl-item .item');
    items.forEach((item) => {
      const imageElement = item.querySelector('.mediaBanner img');
      const textSection = item.querySelector('.mediaTxtSec');
      const titleElement = textSection.querySelector('h3');
      const descriptionElement = textSection.querySelector('.mediacontentSummary');
      const readMoreElement = textSection.querySelector('.readMoreLink');
      const dateElement = textSection.querySelector('.datesR');

      const image = document.createElement('img');
      image.src = imageElement?.getAttribute('data-src') || imageElement?.src || '';
      image.alt = imageElement?.alt || '';

      const title = document.createElement('strong');
      title.textContent = titleElement?.textContent.trim() || '';

      const description = document.createElement('p');
      description.textContent = descriptionElement?.textContent.trim() || '';

      const readMoreLink = document.createElement('a');
      readMoreLink.href = readMoreElement?.getAttribute('href') || '';
      readMoreLink.textContent = 'READ MORE';

      const date = document.createElement('span');
      date.textContent = dateElement?.textContent.trim() || '';

      const contentCell = document.createElement('div');
      contentCell.appendChild(title);
      contentCell.appendChild(description);
      contentCell.appendChild(readMoreLink);
      contentCell.appendChild(date);

      cards.push([image, contentCell]);
    });
    return cards;
  }

  const headerRow = ['Cards'];
  const cardsData = extractCards(element);

  const tableData = [headerRow, ...cardsData];
  const cardsTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(cardsTable);
}