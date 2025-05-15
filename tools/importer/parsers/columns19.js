/* global WebImporter */
export default function parse(element, { document }) {
  // Critical Review:
  // 1. Ensure dynamic extraction of all content
  // 2. Validate against example markdown structure
  // 3. No hardcoded values unless explicitly mentioned

  const headerRow = ['Columns'];

  // Extract heading dynamically
  const headingElement = element.querySelector('.courseHeading h2');
  const heading = headingElement ? headingElement.textContent.trim() : '';

  // Extract description dynamically
  const descriptionElement = element.querySelector('p');
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';

  // Extract session details dynamically
  const sessionDetailsElements = element.querySelectorAll('.noSliderCourse ul li');
  const sessionDetails = sessionDetailsElements.length > 0 
    ? Array.from(sessionDetailsElements).map((item) => {
        const label = item.querySelector('label') ? item.querySelector('label').textContent.trim() : '';
        const sessionType = item.querySelector('span') ? item.querySelector('span').textContent.trim() : '';
        return `${label} ${sessionType}`;
      }).join(', ') 
    : '';

  // Extract buttons dynamically
  const buttonElements = element.querySelectorAll('.courseSlideButton a');
  const buttons = buttonElements.length > 0 
    ? Array.from(buttonElements).map((button) => {
        const link = document.createElement('a');
        link.href = button.getAttribute('href');
        link.textContent = button.textContent.trim();
        return link;
      }) 
    : [];

  // Extract image dynamically
  const imgElement = element.querySelector('.courseSecImg img');
  const image = imgElement ? document.createElement('img') : null;
  if (image) {
    image.src = imgElement.getAttribute('src');
    image.alt = imgElement.getAttribute('alt');
  }

  // Create block table dynamically
  const cells = [
    headerRow,
    [heading, description],
    [sessionDetails, buttons],
    [image],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // No section metadata block required as per example markdown structure

  // Replace original element with newly created block
  element.replaceWith(block);
}