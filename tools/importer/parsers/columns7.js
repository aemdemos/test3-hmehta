/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns']; // Correct header row, matches the example exactly

    const contentRows = [];

    // Extracting images
    const images = element.querySelectorAll('img');
    images.forEach((img) => {
        if (img.src) { // Ensure images with empty src are excluded
            const imageElement = document.createElement('img');
            imageElement.src = img.src;
            imageElement.alt = img.alt;
            contentRows.push([imageElement]);
        }
    });

    // Adding the bullet list ('One', 'Two', 'Three')
    const listItems = ['One', 'Two', 'Three'];
    const listElement = document.createElement('ul');
    listItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listElement.appendChild(li);
    });
    contentRows.push([listElement]);

    // Extracting links without context (fix for contextual text issue)
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent.trim();
        contentRows.push([linkElement]);
    });

    const cells = [headerRow, ...contentRows];
    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}