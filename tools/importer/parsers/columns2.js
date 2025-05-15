/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Dynamically extract list content for the first column
  const listElement = document.createElement('ul');
  const listItems = Array.from(element.querySelectorAll('ul li'));
  if (listItems.length > 0) {
    listItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.textContent.trim();
      listElement.appendChild(li);
    });
  }

  // Dynamically extract link for the first column
  let liveLink;
  const linkElement = element.querySelector('a[href]');
  if (linkElement) {
    liveLink = document.createElement('a');
    liveLink.setAttribute('href', linkElement.href);
    liveLink.textContent = linkElement.textContent.trim();
  }

  const firstColumnContent = ['Columns block'];
  if (listElement.hasChildNodes()) {
    firstColumnContent.push(listElement);
  }
  if (liveLink) {
    firstColumnContent.push(liveLink);
  }

  // Extract images and dynamic content for the second column
  const images = Array.from(element.querySelectorAll('img')).filter(img => img.src && img.src.trim() !== '').map(img => {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', img.src);
    imgElement.setAttribute('alt', img.alt || '');
    return imgElement;
  });

  const textParagraph = document.createElement('p');
  textParagraph.textContent = 'Or you can just view the preview';

  let previewLink;
  const previewElement = element.querySelector('a.readMoreLink');
  if (previewElement) {
    previewLink = document.createElement('a');
    previewLink.setAttribute('href', previewElement.href);
    previewLink.textContent = previewElement.textContent.trim() || 'Preview';
  }

  const secondColumnContent = [...images, textParagraph];
  if (previewLink) {
    secondColumnContent.push(previewLink);
  }

  // Creating the table array
  const tableData = [
    headerRow,
    [firstColumnContent, secondColumnContent]
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}