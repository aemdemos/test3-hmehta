/* global WebImporter */
export default function parse(element, { document }) {
    // Create header row for the Columns block
    const headerRow = ['Columns'];

    // Extract rows for the Columns block
    const rows = [headerRow];

    const contentRows = [];
    const coursesContentRows = element.querySelectorAll('.coursesContentRow');
    coursesContentRows.forEach((contentRow) => {
        const icon = contentRow.querySelector('img');
        const title = contentRow.querySelector('.coursesRightTitle');
        const cell = [];

        if (icon) {
            const img = document.createElement('img');
            img.src = icon.src;
            img.alt = icon.alt;
            cell.push(img);
        }

        if (title) {
            const paragraph = document.createElement('p');
            paragraph.textContent = title.innerHTML.replace(/<br>/g, ' '); // Properly replace <br> tags
            cell.push(paragraph);
        }

        contentRows.push([cell]); // Each cell is a single column in a new row
    });

    rows.push(...contentRows);

    const columnsTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the element with the Columns block table
    element.replaceWith(columnsTable);
}