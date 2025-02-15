import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
// const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  
  // Define classes for the divs in order
  const divClasses = ['global-header', 'global-quicklinks', 'local-header', 'dropdown-menu'];
  let divIndex = 0;
  
  while (fragment.firstElementChild) {
    const element = fragment.firstElementChild;
    if (element.tagName === 'DIV' && divIndex < divClasses.length) {
      element.classList.add(divClasses[divIndex]);
      
      // Add wrapper for sublist items
      if (element.classList.contains('dropdown-menu')) {
        const subLists = element.querySelectorAll('ul > li > ul');
        subLists.forEach(subList => {
          const wrapper = document.createElement('div');
          wrapper.className = 'submenu-wrapper';
          wrapper.style.display = 'none';
          
          // Get the parent link element
          const parentLi = subList.parentNode;
          const parentLink = parentLi.querySelector('a');
          const originalHref = parentLink.href;  // Store original href
          
          // Add click event handler
          parentLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if this submenu is already visible
            const isVisible = wrapper.style.display === 'block';
            
            // Hide all submenu wrappers
            document.querySelectorAll('.submenu-wrapper').forEach(submenu => {
              submenu.style.display = 'none';
            });
            
            // Toggle this submenu wrapper - show only if it wasn't visible before
            wrapper.style.display = isVisible ? 'none' : 'block';
          });
          
          // Create h3 with a link inside
          const heading = document.createElement('h3');
          const headingLink = document.createElement('a');
          headingLink.href = originalHref;  // Use original href
          headingLink.textContent = parentLink.textContent;
          heading.appendChild(headingLink);
          
          // Create submenu content wrapper
          const submenuContent = document.createElement('div');
          submenuContent.className = 'submenu-content';
          
          // Insert wrapper and move sublist into content wrapper
          subList.parentNode.insertBefore(wrapper, subList);
          wrapper.appendChild(heading);
          wrapper.appendChild(submenuContent);
          submenuContent.appendChild(subList);
        });
      }
      
      divIndex++;
    }
    nav.append(element);
  }

  

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
