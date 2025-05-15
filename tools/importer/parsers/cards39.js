/* global WebImporter */

export default function parse(element, { document }) {
    const rows = [];

    // Add header row
    rows.push(['Cards']);

    // Extract content from the given HTML
    const items = element.querySelectorAll('.owl-item .item .testimonialBox');

    const seenEntries = new Set(); // To avoid duplicate rows

    items.forEach((item) => {
        const textSection = item.querySelector('.testimonialTxtSec');

        // Extract image
        const imageContainer = item.querySelector('.testimonialImg img');
        let imageElement = null;
        if (imageContainer) {
            imageElement = document.createElement('img');
            imageElement.setAttribute('src', imageContainer.getAttribute('data-src'));
            imageElement.setAttribute('alt', imageContainer.getAttribute('alt'));
        } 

        // Extract text content
        const title = textSection.querySelector('h3')?.textContent.trim();
        const description = textSection.querySelector('h4')?.textContent.trim();
        const additionalContent = textSection.querySelector('p')?.textContent.trim();

        const textElements = [];
        if (title) {
            const titleElement = document.createElement('strong');
            titleElement.textContent = title;
            textElements.push(titleElement);
        }

        if (description) {
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description;
            textElements.push(descriptionElement);
        }

        if (additionalContent) {
            const additionalContentElement = document.createElement('p');
            additionalContentElement.textContent = additionalContent;
            textElements.push(additionalContentElement);
        }

        // Combine content to check for duplicates
        const entryKey = `${title}|${description}|${additionalContent}`;
        if (!seenEntries.has(entryKey)) {
            seenEntries.add(entryKey);
            rows.push([imageElement || '', textElements]);
        }
    });

    // Create table
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element
    element.replaceWith(blockTable);
}