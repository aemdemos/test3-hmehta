/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract heading
  const headingElement = element.querySelector('h2');
  const heading = headingElement ? headingElement.textContent.trim() : '';

  // Extract description
  const descriptionElement = element.querySelector('p');
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';

  // Extract session list
  const sessionElements = element.querySelectorAll('ul li');
  const sessions = Array.from(sessionElements).map((li) => {
    const label = li.querySelector('label') ? li.querySelector('label').textContent.trim() : '';
    const span = li.querySelector('span') ? li.querySelector('span').textContent.trim() : '';
    return `${label} ${span}`;
  }).join(', ');

  // Extract buttons
  const buttonElements = element.querySelectorAll('.courseSlideButton a');
  const buttons = Array.from(buttonElements).map((button) => {
    const link = document.createElement('a');
    link.setAttribute('href', button.getAttribute('href'));
    link.textContent = button.textContent.trim();
    return link;
  });

  // Extract image
  const imageElement = element.querySelector('.courseSecImg img');
  const image = imageElement ? (() => {
    const img = document.createElement('img');
    img.setAttribute('src', imageElement.getAttribute('src'));
    img.setAttribute('alt', imageElement.getAttribute('alt'));
    return img;
  })() : null;

  // Construct table cells according to the corrected structure
  const cells = [
    ['Columns'],
    [
      [
        document.createTextNode(heading),
        document.createElement('br'),
        document.createTextNode(description),
      ],
      image,
    ],
    [
      [
        document.createTextNode(sessions),
        document.createElement('br'),
        ...buttons
      ],
    ],
  ];

  // Create table block
  const block = createTable(cells, document);

  // Replace original element with the block
  element.replaceWith(block);
}