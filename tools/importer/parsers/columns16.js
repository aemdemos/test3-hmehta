/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create an image or link element based on src attributes
  function createImageOrLink(src, altText = '') {
    const link = document.createElement('a');
    link.href = src;

    const image = document.createElement('img');
    image.src = src;
    image.alt = altText;

    link.appendChild(image);
    return link;
  }

  const headerRow = ['Columns'];

  const contentRows = [];

  const textContainer = element.querySelector('.innerBannerTxt .container');
  const pictureElement = element.querySelector('picture');
  const imgElement = pictureElement ? pictureElement.querySelector('img') : null;

  if (textContainer || imgElement) {
    const title = textContainer ? textContainer.querySelector('h1') : null;
    const titleText = title ? title.textContent.trim() : '';

    const description = textContainer ? textContainer.querySelector('p') : null;
    const descriptionText = description ? description.textContent.trim() : '';

    const imageLink = imgElement ? createImageOrLink(imgElement.src, imgElement.alt) : null;

    // Combine extracted elements into a single cell
    const combinedCellContent = [];
    if (titleText) combinedCellContent.push(titleText);
    if (descriptionText) combinedCellContent.push(document.createElement('br'), descriptionText);
    if (imageLink) combinedCellContent.push(document.createElement('br'), imageLink);

    contentRows.push([combinedCellContent]);
  }

  const tableData = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}