/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Exact header matching example

  // Extract the heading
  const heading = element.querySelector('h1');
  const headingContent = heading ? heading.textContent.trim() : '';

  // Extract the image
  const imageElement = element.querySelector('img');
  const image = imageElement ? document.createElement('img') : null;
  if (imageElement) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  // Extract subheadings
  const subheadings = [...element.querySelectorAll('h3')].map((h) => {
    return h.textContent.trim();
  });

  // Extract paragraphs
  const paragraphs = [...element.querySelectorAll('p')].map((p) => {
    return p.textContent.trim();
  });

  // Organize content into structured rows
  const rows = [
    [headingContent],
    [image],
  ];

  // Add subheadings and their corresponding paragraphs meaningfully grouped
  subheadings.forEach((subheading, index) => {
    const relatedParagraphs = paragraphs.slice(index, index + 1); // Assuming one paragraph per subheading
    rows.push([subheading, ...relatedParagraphs]);
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the element with the newly created table
  element.replaceWith(table);
}