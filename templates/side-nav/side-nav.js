import { getMetadata } from '../../scripts/aem.js';
import { div, h1 } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  // Find breadcrumb section if it exists
  const breadcrumb = block.querySelector('.breadcrumb-container');
  const breadcrumbTitle = getMetadata('breadcrumb-title');
  breadcrumb.classList.add('grey-background');
  breadcrumb.appendChild(div({ class: 'default-content-wrapper' }, h1(breadcrumbTitle)));
  const outDiv = div();

  // Move all sections to wrapper div except breadcrumb
  const sections = block.querySelectorAll('.section');
  sections.forEach((section) => {
    if (!section.classList.contains('breadcrumb-container')) {
      outDiv.appendChild(section);
    }
  });

  // console.log(output);

  // Clear the block and add breadcrumb (if exists) and wrapper div
  block.innerHTML = '';
  if (breadcrumb) {
    block.appendChild(breadcrumb);
  }

  block.appendChild(outDiv);
}
