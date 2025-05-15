/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create rows from the given items
  const createRow = (imgSrc, title, description) => {
    const image = document.createElement('img');
    image.src = imgSrc;

    const titleElem = document.createElement('h3');
    titleElem.textContent = title;

    const descriptionElem = document.createElement('p');
    descriptionElem.textContent = description;

    return [image, [titleElem, descriptionElem]];
  };

  const cards = [];

  // Adding header
  cards.push(['Cards']);

  const uniqueContent = new Set(); // To track unique card content

  // Extracting card content
  const items = element.querySelectorAll('.whyUsIconTxtSec');
  items.forEach((item) => {
    const imgElem = item.querySelector('img');
    const imgSrc = imgElem ? imgElem.src : '';

    const titleElem = item.querySelector('h3');
    const title = titleElem ? titleElem.textContent.trim() : '';

    const descriptionElem = item.querySelector('p');
    const description = descriptionElem ? descriptionElem.textContent.trim() : '';

    const contentKey = `${title}||${description}`; // Create a unique key for deduplication

    if (!uniqueContent.has(contentKey)) {
      uniqueContent.add(contentKey);
      cards.push(createRow(imgSrc, title, description));
    }
  });

  // Section Metadata Table (if required)
  // Assumes metadata is created dynamically based on provided structure
  // Uncomment and add logic if metadata is needed based on the markdown example

  // const hr = document.createElement('hr');
  // const sectionMetadata = WebImporter.DOMUtils.createTable([
  //   ['Section Metadata'],
  //   ['metadata goes here'],
  // ], document);

  // Replace element with new structure
  const block = WebImporter.DOMUtils.createTable(cards, document);
  element.replaceWith(block);
}