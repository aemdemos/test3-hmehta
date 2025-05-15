/* global WebImporter */

export default function parse(element, { document }) {
  const blocks = [];

  // Helper to create block table
  const createBlockTable = (header, contentRows) => {
    const cells = [header, ...contentRows];
    return WebImporter.DOMUtils.createTable(cells, document);
  };

  const extractLinksAndText = (container) => {
    return Array.from(container.querySelectorAll('li > a')).map((link) => {
      const spanText = link.querySelector('span')?.textContent || '';
      const href = link.getAttribute('href') || '';
      return document.createTextNode(`${spanText} (${href})`);
    });
  };

  const extractImages = (container) => {
    return Array.from(container.querySelectorAll('li > a > img')).map((img) => {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      const imgElement = document.createElement('img');
      imgElement.src = src;
      imgElement.alt = alt;
      return imgElement;
    });
  };

  // Extracted sections
  element.querySelectorAll('.footerLinkMain .footerLink').forEach((footerSection) => {
    const headerText = footerSection.querySelector('h3')?.textContent || '';
    const listItems = footerSection.querySelector('ul');

    let content = [];

    if (listItems) {
      content = extractLinksAndText(listItems);
    } else if (footerSection.querySelector('.appStoreGooglePlay')) {
      content = extractImages(footerSection.querySelector('.appStoreGooglePlay'));
    }

    if (headerText && content.length) {
      blocks.push(createBlockTable([headerText], [content]));
    }
  });

  // Replace original element with blocks
  element.replaceChildren(...blocks);
}