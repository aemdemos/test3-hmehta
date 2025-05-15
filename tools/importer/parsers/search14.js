/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [
        ['Search'],
        ['https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json']
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(table);
}