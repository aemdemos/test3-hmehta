/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Creating the header row with 'Columns'
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extracting column content
  const footerLinksContainer = element.querySelector('.footerLinkMain');
  const footerLinkSections = footerLinksContainer ? footerLinksContainer.querySelectorAll('.footerLink') : [];

  const rowContent = [];

  footerLinkSections.forEach((footerLink) => {
    const columnContent = [];

    // Extract list items as links
    const listItems = footerLink.querySelectorAll('ul li a');
    listItems.forEach((link) => {
      if (link.textContent.trim()) {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent.trim();
        columnContent.push(linkElement);
      }
    });

    // Add column content
    if (columnContent.length > 0) {
      rowContent.push(columnContent);
    }
  });

  // Handle 'DOWNLOAD APP' specifically to populate valid links
  const downloadAppSection = footerLinksContainer ? footerLinksContainer.querySelector('.appStoreGooglePlay') : null;
  if (downloadAppSection) {
    const appLinks = [];
    const appItems = downloadAppSection.querySelectorAll('a');
    appItems.forEach((link) => {
      if (link.href.trim()) {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = 'Download from ' + (link.href.includes('apple') ? 'Apple Store' : 'Google Play');
        appLinks.push(linkElement);
      }
    });
    if (appLinks.length > 0) {
      rowContent.push(appLinks);
    }
  }

  cells.push(rowContent);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}