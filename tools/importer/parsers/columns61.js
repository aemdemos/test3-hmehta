/* global WebImporter */

export default function parse(element, { document }) {
  // Helper function to create a list from plain text elements
  const createList = (items, document) => {
    const ul = document.createElement('ul');
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    return ul;
  };

  // Extracting content for 'Columns' block
  const headerRow = ['Columns'];

  const firstColumn = [
    document.createTextNode('Columns block'),
    createList(['One', 'Two', 'Three'], document),
    (() => {
      const link = document.createElement('a');
      link.href = 'https://word-edit.officeapps.live.com/';
      link.textContent = 'Live';
      return link;
    })(),
  ];

  const secondColumn = (() => {
    const img = document.createElement('img');
    img.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
    img.alt = 'Green Double Helix';
    return img;
  })();

  const thirdColumn = [
    (() => {
      const img2 = document.createElement('img');
      img2.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
      img2.alt = 'Yellow Double Helix';
      return img2;
    })(),
    document.createTextNode('Or you can just view the preview'),
    (() => {
      const link2 = document.createElement('a');
      link2.href = 'https://word-edit.officeapps.live.com/';
      link2.textContent = 'Preview';
      return link2;
    })(),
  ];

  const cells = [
    headerRow,
    [firstColumn, secondColumn, thirdColumn],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing original element with structured table
  element.replaceWith(table);
}