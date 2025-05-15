/* global WebImporter */
export default function parse(element, { document }) {
    // Create the header row for Accordion
    const headerRow = ['Accordion'];

    // Extract the title (from card-header button text)
    const titleElement = element.querySelector('.card-header button');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Extract the body content (from card-body)
    const bodyElement = element.querySelector('.card-body');
    const bodyContent = bodyElement ? bodyElement.innerHTML.trim() : '';

    // Prepare the table rows
    const rows = [
        headerRow, // Header row
        [title, bodyContent], // Content row
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}