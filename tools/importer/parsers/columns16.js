/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Fixing header row to match example exactly
  const headerRow = ['Columns'];

  // 2. Dynamically extract and organize content from <picture>
  const picture = element.querySelector('picture');
  const sources = Array.from(picture.querySelectorAll('source')).map((source) => {
    const link = document.createElement('a');
    link.href = source.srcset;
    link.textContent = source.srcset;
    return link;
  });
  const img = picture.querySelector('img');

  const pictureContent = [
    ...sources,
    img,
  ];

  // 3. Extract text content for the second row
  const header = element.querySelector('h1');
  const headerText = header ? header.textContent.trim() : '';

  // Create content array dynamically
  const blockContent = [
    [headerText],
    [pictureContent],
  ];

  // Check if Section Metadata needs to be added
  const sectionMetadataExists = false; // Example markdown did not define one

  let replacementContent;
  if (sectionMetadataExists) {
    const hr = document.createElement('hr');
    const metadataTable = WebImporter.DOMUtils.createTable([
      ['Section Metadata'],
      ['Key', 'Value'],
    ], document);
    replacementContent = [hr, metadataTable];
  } else {
    // Create table for main content
    const blockTable = WebImporter.DOMUtils.createTable([
      headerRow,
      ...blockContent,
    ], document);
    replacementContent = [blockTable];
  }

  // Replace original element with corrected structure
  element.replaceWith(...replacementContent);
}