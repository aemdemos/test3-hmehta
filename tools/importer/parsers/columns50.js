/* global WebImporter */
export default function parse(element, { document }) {
  const header = ['Columns'];

  // Extract left column content
  const leftColumnContent = [];

  const h1 = element.querySelector('h1');
  if (h1) {
    const h1Clone = document.createElement('p');
    h1Clone.textContent = h1.textContent;
    leftColumnContent.push(h1Clone);
  }

  const paragraphs = element.querySelectorAll('p');
  paragraphs.forEach((p) => {
    const paragraphClone = document.createElement('p');
    paragraphClone.textContent = p.textContent;
    leftColumnContent.push(paragraphClone);
  });

  const ul = element.querySelector('ul');
  if (ul) {
    const ulClone = document.createElement('ul');
    Array.from(ul.querySelectorAll('li')).forEach((li) => {
      const liClone = document.createElement('li');
      liClone.textContent = li.textContent;
      ulClone.appendChild(liClone);
    });
    leftColumnContent.push(ulClone);
  }

  // Extract right column content
  const img = element.querySelector('img');
  const rightColumnContent = img ? document.createElement('img') : '';
  if (img) {
    rightColumnContent.src = img.src;
  }

  // Create table rows
  const tableRows = [
    header,
    [leftColumnContent, rightColumnContent],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with the block table
  element.replaceWith(block);
}