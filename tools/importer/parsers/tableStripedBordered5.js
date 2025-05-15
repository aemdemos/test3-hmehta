/* global WebImporter */
export default function parse(element, { document }) {
    // Initialize a section break (hr)
    const hr = document.createElement('hr');

    // Dynamically extract the table from the provided HTML structure
    const mediaDetailTable = element.querySelector('table.contenttable');

    if (!mediaDetailTable) {
        console.error('Table element not found!');
        return;
    }

    const extractedRows = [];

    // Extract the first row dynamically as the header row (exact match required)
    const headerRow = ['Table (striped, bordered)'];
    extractedRows.push(headerRow);

    // Extract content headers dynamically
    const contentHeaders = mediaDetailTable.querySelectorAll('tr:nth-child(2) th, tr:nth-child(2) td');
    const tableHeaderRow = Array.from(contentHeaders).map((header) => header.textContent.trim());
    extractedRows.push(tableHeaderRow);

    // Extract table body rows dynamically
    const bodyRows = mediaDetailTable.querySelectorAll('tbody tr');
    Array.from(bodyRows).forEach((row) => {
        const cells = row.querySelectorAll('td, th');
        const rowData = Array.from(cells).map((cell) => {
            const text = cell.textContent.trim();
            const image = cell.querySelector('img');
            const link = cell.querySelector('a');

            if (image) {
                const imageElement = document.createElement('img');
                imageElement.src = image.src;
                imageElement.alt = image.alt;
                return imageElement;
            } else if (link) {
                const linkElement = document.createElement('a');
                linkElement.href = link.href;
                linkElement.textContent = text;
                return linkElement;
            } else {
                return text || ''; // Handle empty cells
            }
        });
        extractedRows.push(rowData);
    });

    // Create the block table dynamically
    const blockTable = WebImporter.DOMUtils.createTable(extractedRows, document);

    // Replace the original element with the structured block table
    element.replaceWith(hr, blockTable);
}