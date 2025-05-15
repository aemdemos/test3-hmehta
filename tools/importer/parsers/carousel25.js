/* global WebImporter */
export default function parse(element, { document }) {
    // Header row for the Carousel block
    const headerRow = ['Carousel'];

    // Extract the button text dynamically
    const button = element.querySelector('button'); 
    const buttonText = button ? button.textContent.trim() : '';

    // Construct the table rows
    const tableRows = [
        headerRow,
        [buttonText],
    ];

    // Create the final table
    const carouselBlock = WebImporter.DOMUtils.createTable(tableRows, document);

    // Replace the original element with the carousel block
    element.replaceWith(carouselBlock);
}