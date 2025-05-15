/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the image element
    const img = element.querySelector('picture img');

    // Ensure the image element exists
    if (!img) {
        console.warn('No image found in element');
        return;
    }

    // Extract the image source and alt text
    const imageSrc = img.getAttribute('src');
    const imageAlt = img.getAttribute('alt') || '';

    // Create the content for the table
    const cells = [
        ['Hero'], // Header row
        [
            (() => {
                const div = document.createElement('div');
                const imageElement = document.createElement('img');
                imageElement.setAttribute('src', imageSrc);
                imageElement.setAttribute('alt', imageAlt);
                div.appendChild(imageElement);
                return div;
            })(),
        ],
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}