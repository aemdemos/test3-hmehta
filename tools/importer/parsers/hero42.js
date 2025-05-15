/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [
        ['Hero'], // Header row
    ];

    // Extracting content for the second row
    const contentCell = document.createElement('div');

    // Extracting image source dynamically
    const image = element.querySelector('img[data-src]');
    if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image.getAttribute('data-src');
        imgElement.alt = image.getAttribute('alt') || ''; // Alt text handled dynamically
        contentCell.appendChild(imgElement);
    }

    // Extracting headline text dynamically
    const headline = element.querySelector('h3');
    if (headline) {
        const headlineElement = document.createElement('h1');
        headlineElement.textContent = headline.textContent.trim(); // Trim whitespace for cleaner output
        contentCell.appendChild(headlineElement);
    }

    // Extracting links dynamically (Call-to-Actions)
    const link = element.querySelector('a[href]');
    if (link) {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent.trim() || 'Learn More'; // Handle empty link text
        contentCell.appendChild(linkElement);
    }

    // Adding content to the second row as a single cell
    cells.push([contentCell]);

    // Creating the block table using the helper function
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replacing the original element
    element.replaceWith(block);
}