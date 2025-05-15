/* global WebImporter */
export default function parse(element, { document }) {
    const cards = new Set(); // Use a Set to eliminate duplicates

    // Extract all unique items
    const items = element.querySelectorAll('.item .mediaRptSec');
    items.forEach((item) => {
        const imageSection = item.querySelector('.mediaBanner img');
        const textSection = item.querySelector('.mediaTxtSec');
        const title = textSection?.querySelector('h3');
        const description = textSection?.querySelector('p');

        // Create elements for table cells
        const image = document.createElement('img');
        image.src = imageSection?.getAttribute('src') || '';
        image.alt = imageSection?.getAttribute('alt') || '';

        const textContainer = document.createElement('div');
        if (title) {
            const heading = document.createElement('strong');
            heading.textContent = title.textContent;
            textContainer.appendChild(heading);
        }
        if (description) {
            const paragraph = document.createElement('p');
            paragraph.textContent = description.textContent;
            textContainer.appendChild(paragraph);
        }

        // Add unique row to cards
        const cardKey = `${image.src}${title?.textContent}${description?.textContent}`; // Unique key
        cards.add([image, textContainer, cardKey]);
    });

    // Convert Set to array excluding key
    const uniqueCards = Array.from(cards).map(([image, textContainer]) => [image, textContainer]);

    // Create table with unique rows
    const tableCells = [
        ['Cards'],
        ...uniqueCards
    ];

    const table = WebImporter.DOMUtils.createTable(tableCells, document);

    // Replace element with the new table
    element.replaceWith(table);
}