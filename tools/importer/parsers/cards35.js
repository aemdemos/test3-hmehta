/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure no 'Section Metadata' table is generated unless explicitly specified

  // Extract relevant content dynamically
  const cards = Array.from(element.querySelectorAll('.listboxes')).map((listbox) => {
    const mediaBanner = listbox.querySelector('.mediaBanner img');
    const mediaTxtSec = listbox.querySelector('.mediaTxtSec');

    // Handle missing data gracefully
    const image = document.createElement('img');
    image.src = mediaBanner?.getAttribute('src') || '';
    image.alt = mediaBanner?.getAttribute('alt') || 'Image unavailable';

    const titleContent = mediaTxtSec?.querySelector('h3')?.textContent || 'Title unavailable';
    const title = document.createElement('h3');
    title.textContent = titleContent;

    const descriptionContent = mediaTxtSec?.querySelector('p')?.innerHTML || 'Description unavailable';
    const description = document.createElement('p');
    description.innerHTML = descriptionContent;

    const readMoreLink = mediaTxtSec?.querySelector('.readMoreLink')?.cloneNode(true) || document.createElement('span');
    const date = mediaTxtSec?.querySelector('.datesR')?.textContent || '';

    const cta = document.createElement('div');
    cta.append(readMoreLink);
    if (date) {
      const dateText = document.createTextNode(` (${date})`);
      cta.append(dateText);
    }

    return [image, [title, description, cta]];
  });

  // Add exact header row from the example, matching the required structure
  const tableData = [['Cards'], ...cards];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the element with newly structured content
  element.replaceWith(table);
}