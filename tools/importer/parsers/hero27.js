/* global WebImporter */
export default function parse(element, { document }) {
  // Extract title
  const titleElement = element.querySelector('h4');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract form's fields (Name, Mobile, Email, City, Driving School)
  const nameField = element.querySelector('input[name="Name"]');
  const mobileField = element.querySelector('input[name="Mobile"]');
  const emailField = element.querySelector('input[name="Email"]');
  const cityField = element.querySelector('select[name="City"]');
  const dealerField = element.querySelector('select[name="Dealer"]');

  const formFields = [];
  if (nameField) {
    formFields.push(`Name: ${nameField.placeholder}`);
  }
  if (mobileField) {
    formFields.push(`Mobile: ${mobileField.placeholder}`);
  }
  if (emailField) {
    formFields.push(`Email: ${emailField.placeholder}`);
  }
  if (cityField) {
    const cityPlaceholder = cityField.getAttribute('placeholder') || cityField.options[0]?.textContent;
    formFields.push(`City: ${cityPlaceholder}`);
  }
  if (dealerField) {
    const dealerPlaceholder = dealerField.getAttribute('placeholder') || dealerField.options[0]?.textContent;
    formFields.push(`Driving School: ${dealerPlaceholder}`);
  }

  // CTA button
  const ctaButton = element.querySelector('input.btnEnquireNow');
  const cta = ctaButton ? ctaButton.value.trim() : '';

  // Combine all extracted content into one cell
  const combinedContent = document.createElement('div');
  if (title) {
    const titleHeader = document.createElement('h1');
    titleHeader.textContent = title;
    combinedContent.appendChild(titleHeader);
  }
  formFields.forEach((field) => {
    const fieldElement = document.createElement('p');
    fieldElement.textContent = field;
    combinedContent.appendChild(fieldElement);
  });
  if (cta) {
    const ctaElement = document.createElement('button');
    ctaElement.textContent = cta;
    combinedContent.appendChild(ctaElement);
  }

  // Construct the table data
  const tableData = [
    ['Hero'],
    [combinedContent]
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(blockTable);
}