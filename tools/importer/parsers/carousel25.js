/* global WebImporter */

export default function parse(element, { document }) {
  const blocks = [];

  // Split the element content by '---' for different sections
  const sections = element.innerHTML.split(/---/g).map(sectionHtml => {
    const sectionElement = document.createElement('div');
    sectionElement.innerHTML = sectionHtml;
    return sectionElement;
  });

  sections.forEach((sectionElement, index) => {
    const button = sectionElement.querySelector('button');

    if (button) {
      const buttonContent = button.cloneNode(true); // Clone the button element

      // Create the carousel block table with exact header row text
      const table = WebImporter.DOMUtils.createTable([
        ['Carousel'], // Header row with exact text
        [buttonContent], // Content row with the button
      ], document);

      // Add section break if necessary
      if (index > 0) {
        const hr = document.createElement('hr');
        blocks.push(hr);
      }

      blocks.push(table);
    }
  });

  // Replace the original element with the created blocks
  element.replaceWith(...blocks);
}