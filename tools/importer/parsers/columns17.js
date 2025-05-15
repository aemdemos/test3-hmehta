/* global WebImporter */

export default function parse(element, { document }) {
  const cells = [
    ['Columns'],
    [
      [
        element.querySelector('.blogBanner img') || '',
        element.querySelector('.blogTxtSec h3') || '',
        element.querySelector('.blogcontentSummary') || '',
        element.querySelector('.readNdateSec a') || ''
      ]
    ]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}