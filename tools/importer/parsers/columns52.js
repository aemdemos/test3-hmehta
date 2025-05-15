/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Adding the header row for block name
  rows.push(['Columns']);

  // Extracting the columns data
  const columns = Array.from(element.querySelectorAll('.coursesRptSec')).map((columnEl) => {
    const columnContent = [];

    const image = columnEl.querySelector('img');
    const heading = columnEl.querySelector('h3');
    const description = columnEl.querySelector('p');
    const modulesSection = columnEl.querySelectorAll('.noCourseSec ul li');
    const price = columnEl.querySelector('.homeCourPriceTxt');
    const viewCourseLink = columnEl.querySelector('.viewLearnerBtn a');

    // Extract image
    if (image) {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt || '';
      columnContent.push(img);
    }

    // Extract heading
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      columnContent.push(h3);
    }

    // Extract description
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      columnContent.push(p);
    }

    // Extract modules section
    if (modulesSection.length > 0) {
      const modulesList = document.createElement('ul');
      modulesSection.forEach((module) => {
        const li = document.createElement('li');

        if (module.querySelector('label[data-count]')) {
          const countSpan = document.createElement('span');
          countSpan.textContent = module.querySelector('label[data-count]').textContent.trim();
          li.appendChild(countSpan);
        }

        if (module.querySelector('h5')) {
          const titleSpan = document.createElement('span');
          titleSpan.textContent = module.querySelector('h5').textContent.trim();
          li.appendChild(titleSpan);
        }

        if (module.querySelector('span')) {
          const descriptionSpan = document.createElement('span');
          descriptionSpan.textContent = module.querySelector('span').textContent.trim();
          li.appendChild(descriptionSpan);
        }

        modulesList.appendChild(li);
      });
      columnContent.push(modulesList);
    }

    // Extract price
    if (price) {
      const priceDiv = document.createElement('div');
      priceDiv.textContent = price.textContent.trim();
      columnContent.push(priceDiv);
    }

    // Extract view course link
    if (viewCourseLink) {
      const a = document.createElement('a');
      a.href = viewCourseLink.href;
      a.textContent = viewCourseLink.textContent.trim();
      columnContent.push(a);
    }

    return columnContent;
  });

  // Add the columns data to rows
  rows.push(columns);

  // Create the final block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the generated block
  element.replaceWith(block);
}