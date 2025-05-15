/* global WebImporter */
export default function parse(element, { document }) {
  // Validate presence of element
  if (!element || !document) {
    console.error('Invalid element or document');
    return;
  }

  const hr = document.createElement('hr');

  // Correct header row as per example
  const headerRow = ['Columns'];

  const contentRows = [];

  // Extract content from the element
  const wrapCity = element.querySelector('.wrapCity');
  if (!wrapCity) {
    console.error('Missing wrapCity element');
    return;
  }

  // Extract city search input
  const inputField = wrapCity.querySelector('input[type="text"][placeholder="Search city"]');
  const inputFieldContent = inputField ? inputField.placeholder : '';

  // Extract the city search icon image
  const image = wrapCity.querySelector('img[alt="address-gey"]');
  const imageElement = image ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = image.src;
    imageElement.alt = image.alt;
  }

  // Extract list items for suggested options
  const suggestedOptions = wrapCity.querySelectorAll('.suggestedOptions ul li');
  const listItems = Array.from(suggestedOptions).map((item) => item.textContent);
  const listContent = document.createElement('ul');
  listItems.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    listContent.appendChild(li);
  });

  // Extract a dynamic link (Live link)
  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';

  // Combine content into one cell for the first row
  const firstRowContent = document.createElement('div');
  firstRowContent.appendChild(document.createTextNode('Columns block'));
  firstRowContent.appendChild(listContent);
  firstRowContent.appendChild(liveLink);

  // Add first row
  contentRows.push([firstRowContent]);

  // Extract images for the second section
  const secondSectionImages = element.querySelectorAll('.locatorPanelShowHide img');
  const imagesContent = Array.from(secondSectionImages).map((img) => {
    const imageEl = document.createElement('img');
    imageEl.src = img.src;
    imageEl.alt = img.alt;
    return imageEl;
  });

  // Combine images into a single cell for the second row
  const secondRowContent = document.createElement('div');
  imagesContent.forEach((img) => secondRowContent.appendChild(img));

  // Add second row
  contentRows.push([secondRowContent]);

  // Extract 'preview' link for the third section
  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';

  const previewContent = document.createElement('div');
  previewContent.appendChild(document.createTextNode('Or you can just view the preview '));
  previewContent.appendChild(previewLink);

  // Add third row
  contentRows.push([previewContent]);

  // Create block table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  // Replace the original element with the new structure
  element.replaceWith(hr, table);
}