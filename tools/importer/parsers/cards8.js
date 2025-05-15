/* global WebImporter */
export default function parse(element, { document }) {
    // Create section break
    const hr = document.createElement('hr');

    // Extract content from the element
    const image = element.querySelector('.addressImg img');
    const title = element.querySelector('.addressTxtSec span');
    const heading = element.querySelector('.addressTxtSec h2');
    const description = element.querySelector('.addressTxtSec p');
    const phoneLink = element.querySelector('.directionCallNumber a');

    // Create the cells array for the table
    const cells = [['Cards']]; // Header row

    // Generate row content
    const rowContent = [];

    if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        rowContent.push(imgElement);
    }

    const textContent = [];

    if (title) {
        const titleElement = document.createElement('span');
        titleElement.textContent = title.textContent;
        textContent.push(titleElement);
    }

    if (heading) {
        const headingElement = document.createElement('h2');
        headingElement.textContent = heading.textContent;
        textContent.push(headingElement);
    }

    if (description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = description.innerHTML; // To preserve the <br> tags
        textContent.push(descriptionElement);
    }

    if (phoneLink) {
        const phoneElement = document.createElement('a');
        phoneElement.href = phoneLink.href;
        phoneElement.textContent = phoneLink.textContent;
        textContent.push(phoneElement);
    }

    rowContent.push(textContent);

    // Add to cells
    cells.push(rowContent);

    // Create the table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new structure
    element.replaceWith(hr, blockTable);
}