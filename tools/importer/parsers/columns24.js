/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract relevant content from the input element
  const title = element.querySelector('.courseHeading h2');
  const description = element.querySelector('p');

  // Combine title and description into one cell
  const combinedContent = document.createElement('div');
  combinedContent.append(title, description);

  // Extract list items and buttons, and combine them into one cell
  const listItems = element.querySelectorAll('.noSliderCourse ul li');
  const listContent = document.createElement('ul');
  listItems.forEach((li) => {
    const item = document.createElement('li');
    item.textContent = `${li.querySelector('label').textContent} ${li.querySelector('span').textContent}`;
    listContent.appendChild(item);
  });

  const exploreButton = element.querySelector('.blueButton a');
  const interestedButton = element.querySelector('.whiteButton a');
  const buttonContent = document.createElement('div');
  buttonContent.append(exploreButton, interestedButton);

  const listAndButtons = document.createElement('div');
  listAndButtons.append(listContent, buttonContent);

  const cells = [
    headerRow,
    [combinedContent],
    [listAndButtons],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}