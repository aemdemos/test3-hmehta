/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get text content and handle empty values
  const getTextContent = (node) => (node ? node.textContent.trim() : '');

  // Initialize rows with header row
  const rows = [['Cards']];

  // Get all items within the testimonial slider
  const items = element.querySelectorAll('.owl-item .item');

  items.forEach((item) => {
    const testimonialBox = item.querySelector('.testimonialBox');

    if (testimonialBox) {
      const testimonialTxtSec = testimonialBox.querySelector('.testimonialTxtSec');
      const testimonialImg = testimonialBox.querySelector('.testimonialImg img');

      // Extract image or placeholder if missing
      const imgElement = testimonialImg
        ? document.createElement('img')
        : document.createElement('span'); // Use a span when no image is present

      if (testimonialImg) {
        imgElement.src = testimonialImg.getAttribute('data-src');
        imgElement.alt = testimonialImg.getAttribute('alt') || '';
      }

      // Extract text content
      const heading = getTextContent(testimonialTxtSec.querySelector('h3'));
      const subHeading = getTextContent(testimonialTxtSec.querySelector('h4'));
      const description = getTextContent(testimonialTxtSec.querySelector('p'));
      const captionNameLocation = getTextContent(testimonialTxtSec.querySelector('.captionNameLocation'));

      // Combine text content
      const textCellContent = document.createElement('div');
      textCellContent.innerHTML = `<h3>${heading}</h3><h4>${subHeading}</h4><p>${description}</p><p>${captionNameLocation}</p>`;

      // Push row to rows
      rows.push([imgElement, textCellContent]);
    }
  });

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}