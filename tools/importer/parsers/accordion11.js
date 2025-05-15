/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract content
  function extractContent(blogElement) {
    const title = blogElement.querySelector('.blogTxtSec h3')?.textContent.trim();
    const summary = blogElement.querySelector('.blogcontentSummary')?.textContent.trim();
    const readMore = blogElement.querySelector('.readNdateSec a');
    const readMoreLink = readMore?.href;
    const readMoreText = readMore?.textContent.trim();

    const bannerImg = blogElement.querySelector('.blogBanner img');
    const imageSource = bannerImg?.getAttribute('data-src');

    const contentCellElements = [];

    if (imageSource) {
      const imageElement = document.createElement('img');
      imageElement.src = imageSource;
      contentCellElements.push(imageElement);
    }
    
    const textContent = document.createElement('div');
    textContent.innerHTML = `${summary} <br><br>`;
    
    if (summary) {
      contentCellElements.push(textContent);
    }

    if (readMoreLink && readMoreText) {
      const linkElement = document.createElement('a');
      linkElement.href = readMoreLink;
      linkElement.textContent = readMoreText;
      contentCellElements.push(linkElement);
    }

    return [title || '', contentCellElements];
  }

  const rows = [['Accordion']]; // Header row

  const blogSections = element.querySelectorAll('.blogRptSec');

  blogSections.forEach((section) => {
    rows.push(extractContent(section));
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Explicitly validate that no Section Metadata is being added
  const needsSectionMetadata = false; // Based on the example markdown structure

  if (needsSectionMetadata) {
    const hr = document.createElement('hr');
    const sectionMetadata = WebImporter.DOMUtils.createTable([
      ['Section Metadata']
    ], document);
    element.replaceWith(hr, sectionMetadata, table);
  } else {
    element.replaceWith(table);
  }
}