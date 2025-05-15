/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row from the example
  const headerRow = ['Table (bordered)'];

  // Extract content dynamically
  const corporateTrainingImageMobile = element.querySelector('.corporateTrainingImg img[data-src]');
  const corporateTrainingText = element.querySelector('.corporateTrainingTxt');

  const heading = corporateTrainingText?.querySelector('h2')?.textContent || '';
  const description = corporateTrainingText?.querySelector('p')?.textContent || '';
  const button = corporateTrainingText?.querySelector('.blueButton a');

  const corporateTrainingImageDesktop = element.querySelector('.corporateTrainingImg img[data-src][alt=""]');

  // Create proper HTML elements for button and images
  const buttonElement = button ? document.createElement('a') : null;
  if (buttonElement) {
    buttonElement.textContent = button.textContent;
    buttonElement.href = button.href;
  }

  const mobileImageElement = corporateTrainingImageMobile ? document.createElement('img') : null;
  if (mobileImageElement) {
    mobileImageElement.src = corporateTrainingImageMobile.dataset.src;
    mobileImageElement.alt = corporateTrainingImageMobile.alt;
  }

  const desktopImageElement = corporateTrainingImageDesktop ? document.createElement('img') : null;
  if (desktopImageElement) {
    desktopImageElement.src = corporateTrainingImageDesktop.dataset.src;
    desktopImageElement.alt = corporateTrainingImageDesktop.alt;
  }

  // Dynamically construct table content matching the example structure
  const tableContent = WebImporter.DOMUtils.createTable([
    headerRow, // Header row matches the example EXACTLY
    [
      heading,
      description,
      buttonElement,
      mobileImageElement,
      desktopImageElement,
    ],
  ], document);

  // Replace the original element with the new structure
  element.replaceWith(tableContent);
}