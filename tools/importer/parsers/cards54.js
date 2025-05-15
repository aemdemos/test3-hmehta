/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the cards data
    const cards = Array.from(element.querySelectorAll('.owl-item > .item > .valueAddedBox')).map((card) => {
        const image = card.querySelector('img');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');

        // Create the image element
        const imgElement = document.createElement('img');
        imgElement.src = image.getAttribute('src');
        imgElement.alt = image.getAttribute('alt');

        // Create the title and description elements
        const titleElement = document.createElement('h3');
        titleElement.textContent = title.textContent;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description.textContent;

        return [imgElement, [titleElement, descriptionElement]];
    });

    // Create the block table
    const cells = [
        ['Cards'],
        ...cards
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}