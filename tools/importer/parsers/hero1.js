/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the block header
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Extract and structure the content
  const content = [];

  // Extract the image
  const imageContainer = element.querySelector('.mediaImg img');
  if (imageContainer && imageContainer.src) {
    const img = document.createElement('img');
    img.src = imageContainer.src;
    img.alt = imageContainer.alt || '';
    content.push(img);
  }

  // Extract the title
  const title = element.querySelector('h1');
  if (title) {
    const heading = document.createElement('h1');
    heading.textContent = title.childNodes[0]?.textContent.trim() || title.textContent.trim();
    content.push(heading);

    // Extract the subtitle (date) if available
    const subtitle = title.querySelector('span');
    if (subtitle) {
      const subHeading = document.createElement('h2');
      subHeading.textContent = subtitle.textContent.trim();
      content.push(subHeading);
    }
  }

  // Extract additional text content
  const textContents = element.querySelectorAll('.mediaDetailTxtBox p');
  textContents.forEach((p) => {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = p.innerHTML.trim();
    content.push(paragraph);
  });

  // Extract call-to-action links
  const links = element.querySelectorAll('.mediaDetailTxtBox a');
  links.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.textContent.trim();
    content.push(anchor);
  });

  // Add the content to the table
  cells.push([content]);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new table
  element.replaceWith(table);
}