/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [['Cards']];

  const navItems = element.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    const link = item.querySelector('a');
    const images = link.querySelectorAll('img');
    const text = link.querySelector('p');

    const imageElements = Array.from(images).map((img) => {
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt;
      return image;
    });

    const titleElement = document.createElement('strong');
    titleElement.textContent = text ? text.textContent.trim() : '';

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = ''; // Description left empty as per example

    const cardText = document.createElement('div');
    cardText.append(titleElement, descriptionElement);

    rows.push([imageElements, cardText]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}