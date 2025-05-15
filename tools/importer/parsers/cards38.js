/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as per the example
  const headerRow = ['Cards'];

  // Extract relevant content, filtering out duplicates and items with missing src
  const rows = Array.from(element.querySelectorAll('.roadSafetyImgTxt')).filter(item => {
    const imgElement = item.querySelector('img');
    return imgElement && imgElement.getAttribute('src'); // Filter out items without src
  }).map(item => {
    const imgElement = item.querySelector('img');
    const src = imgElement.getAttribute('src');
    const alt = imgElement.getAttribute('alt') || 'No alt text'; // Use existing alt text or fallback

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;

    const titleElement = item.querySelector('span');
    const titleText = titleElement?.textContent || 'No title';
    const title = document.createElement('p');
    title.textContent = titleText;

    return [img, title];
  });

  // Combine header and rows
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new structured block
  element.replaceWith(block);
}