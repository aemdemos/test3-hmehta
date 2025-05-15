/* global WebImporter */
export default function parse(element, { document }) {
    // Step 1: Extract dynamic content from the provided elements
    const headerRow = [document.createElement('strong')]; // Matches the example header row exactly
    headerRow[0].textContent = 'Hero';

    const heading = element.querySelector('h2'); // Extract main heading dynamically
    const subHeading = element.querySelector('.selectCitySec p'); // Extract subheading dynamically
    const searchButton = element.querySelector('input[type="button"]'); // Extract button dynamically

    // Step 2: Create a call-to-action link if a button exists
    let callToAction;
    if (searchButton && searchButton.value) {
        callToAction = document.createElement('a');
        callToAction.textContent = searchButton.value; // Dynamic button text
        callToAction.href = '#'; // Ensure fallback to '#'
    }

    // Step 3: Compose the content row dynamically
    const contentRow = [];
    if (heading) {
        const headingWrapper = document.createElement('div');
        headingWrapper.appendChild(heading);
        contentRow.push(headingWrapper); // Wrap heading in a single container to ensure one column
    }
    if (subHeading) {
        const subHeadingWrapper = document.createElement('div');
        subHeadingWrapper.appendChild(subHeading);
        contentRow.push(subHeadingWrapper); // Wrap subheading in a single container to ensure one column
    }
    if (callToAction) {
        const ctaWrapper = document.createElement('div');
        ctaWrapper.appendChild(callToAction);
        contentRow.push(ctaWrapper); // Wrap call-to-action in a single container to ensure one column
    }

    // Step 4: Ensure the table structure has consistent one column per row
    const tableContent = [
        headerRow, // First row is the header row
        [contentRow] // Second row wraps all content in a single cell for one column
    ];

    // Step 5: Generate the block table using WebImporter.DOMUtils.createTable()
    const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

    // Step 6: Replace the original element with blockTable
    element.replaceWith(blockTable);
}