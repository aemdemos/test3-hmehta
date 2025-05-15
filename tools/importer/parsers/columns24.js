/* global WebImporter */
export default function parse(element, { document }) {
  // Header row specifying the type of block
  const headerRow = ['Columns'];

  // Extract elements for the columns
  const titleElement = element.querySelector('.courseHeading h2');
  const title = titleElement ? titleElement.textContent.trim() : '';

  const descriptionElement = element.querySelector('p');
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';

  const listItems = Array.from(element.querySelectorAll('.noSliderCourse ul li')).map((listItem) => {
    const label = listItem.querySelector('label') ? listItem.querySelector('label').textContent.trim() : '';
    const span = listItem.querySelector('span') ? listItem.querySelector('span').textContent.trim() : '';
    return `${label} ${span}`.trim();
  }).filter(item => item !== '');

  const exploreLink = element.querySelector('.blueButton a');
  const exploreButton = document.createElement('a');
  if (exploreLink) {
    exploreButton.href = exploreLink.href;
    exploreButton.textContent = exploreLink.textContent.trim();
  }

  const interestedLink = element.querySelector('.whiteButton a');
  const interestedButton = document.createElement('a');
  if (interestedLink) {
    interestedButton.href = interestedLink.href;
    interestedButton.textContent = interestedLink.textContent.trim();
  }

  const contentColumn1 = document.createElement('div');
  contentColumn1.append(
    document.createTextNode(title),
    document.createElement('br'),
    document.createTextNode(description),
    document.createElement('br'),
    document.createTextNode(listItems.join(', '))
  );

  const contentColumn2 = document.createElement('div');
  contentColumn2.append(
    exploreLink ? exploreButton : document.createTextNode(''),
    document.createElement('br'),
    interestedLink ? interestedButton : document.createTextNode('')
  );

  // Create rows for the table
  const rows = [
    headerRow,
    [contentColumn1, contentColumn2],
  ];

  // There is no section metadata block defined in the Example Markdown Structure
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new structure
  element.replaceWith(block);
}