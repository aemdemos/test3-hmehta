/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant data from the element
  const button = element.querySelector('button');
  const img = button && button.querySelector('img');
  const externalVideoUrl = 'https://vimeo.com/454418448'; // Example video URL

  // Create image element if applicable
  const imgElement = img ? (() => {
    const image = document.createElement('img');
    image.src = img.dataset.src || ''; // Extract `data-src` attribute
    image.alt = img.alt || 'Embedded video poster';
    return image;
  })() : null;

  // Create table content
  const cells = [
    ['Embed'], // Header row
    [
      imgElement ? [imgElement, (() => {
        const link = document.createElement('a');
        link.href = externalVideoUrl; // External video URL
        link.textContent = externalVideoUrl;
        return link;
      })()] : 'No video source available'
    ]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new content
  element.replaceWith(block);
}