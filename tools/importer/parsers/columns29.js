/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create and normalize links
  const createLink = (url, text) => {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = text;
    return link;
  };

  // Extracting content from the given HTML structure
  const questionButton = element.querySelector('.card-header button');
  const questionText = questionButton ? questionButton.textContent.trim() : '';

  const bodyContent = element.querySelector('.card-body');
  const paragraph = bodyContent.querySelector('p');
  const paragraphParts = paragraph ? paragraph.textContent.split("Here's the link to -") : [];
  const paragraphText = paragraphParts[0] ? paragraphParts[0].trim() : '';

  const anchor = bodyContent.querySelector('a');
  const scheduleLink = anchor ? createLink(anchor.href, anchor.textContent.trim()) : null;

  // Creating the block structure
  const headerRow = ['Columns'];
  const contentRow = [
    questionText,
    [paragraphText, scheduleLink],
  ];

  const tableCells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace element with structured table
  element.replaceWith(blockTable);
}