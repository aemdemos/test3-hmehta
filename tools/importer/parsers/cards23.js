/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const cardsHeader = ['Cards'];
  const cardsContent = Array.from(element.querySelectorAll('.owl-item .item')).map(item => {
    const imageElement = item.querySelector('img');
    const image = imageElement ? document.createElement('img') : null;
    if (image) {
      image.src = imageElement.getAttribute('src') || imageElement.getAttribute('data-src');
      image.alt = imageElement.alt;
    }

    const blogContent = item.querySelector('.blogContent');
    let title = blogContent.querySelector('h3') ? blogContent.querySelector('h3').textContent.trim() : '';
    let description = blogContent.querySelector('.blogcontentSummary') ? blogContent.querySelector('.blogcontentSummary').textContent.trim() : '';
    let cta = blogContent.querySelector('a.readMoreLink');

    const textContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      textContent.push(titleElement);
    }
    if (description) {
      textContent.push(document.createElement('br'));
      textContent.push(document.createTextNode(description));
    }
    if (cta) {
      textContent.push(document.createElement('br'));
      const linkElement = document.createElement('a');
      linkElement.href = cta.href;
      linkElement.textContent = cta.textContent.trim();
      textContent.push(linkElement);
    }

    return [image, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([cardsHeader, ...cardsContent], document);

  element.replaceWith(hr, table);
}