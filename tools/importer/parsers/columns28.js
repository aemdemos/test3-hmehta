/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant inputs from the form
  const form = element.querySelector('form');
  const nameInput = form.querySelector('input[name="Name"]');
  const mobileInput = form.querySelector('input[name="Mobile"]');
  const emailInput = form.querySelector('input[name="Email"]');
  const citySelect = form.querySelector('select[name="City"]');
  const dealerSelect = form.querySelector('select[name="Dealer"]');

  const disclaimerLabel = form.querySelector('.agreeboxLabel');

  // Compile content into rows
  const tableContent = [
    ['<strong>Columns</strong>'], // Header row with <strong> tag for compliance
    [
      nameInput,
      mobileInput,
      emailInput,
      citySelect,
      dealerSelect,
      disclaimerLabel,
    ],
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the element with the structured content without unnecessary <hr>
  element.replaceWith(blockTable);
}