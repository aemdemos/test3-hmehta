/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title
  const title = element.querySelector('h2');

  // Extract the subheading
  const subheading = element.querySelector('.selectCitySec p');

  // Extract the call-to-action button
  const ctaElement = element.querySelector('#delLocationSearch');
  const cta = document.createElement('a');
  cta.href = '#';
  cta.textContent = ctaElement ? ctaElement.value : '';

  // Create the content array for the table
  const content = [];

  if (title) {
    const heading = document.createElement('h1');
    heading.textContent = title.textContent;
    content.push(heading);
  }

  if (subheading) {
    const paragraph = document.createElement('p');
    paragraph.textContent = subheading.textContent;
    content.push(paragraph);
  }

  if (ctaElement) {
    content.push(cta);
  }

  // Create the table
  const cells = [
    ['Hero'],
    [content],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element
  element.replaceWith(table);
}