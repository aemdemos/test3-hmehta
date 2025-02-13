import { getMetadata, buildBlock, loadBlock, decorateBlock } from '../../scripts/aem.js';
import { div, h1 } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
   loadNews(block);

}


async function loadNewsBlock(block,matchingItems) {
    const cardsBlock = buildBlock('cards',matchingItems);
    block.append(cardsBlock);
    decorateBlock(cardsBlock);
    const newsBlock = await loadBlock(cardsBlock);
  }

/**
 * 
 * @param {*} matchingItems 
 */
async function createNewsBlock(block, matchingItems) {

    const newsBlock = await loadBlock(decorateBlock(buildBlock('cards',matchingItems)));

    block.textContent = '';
    block.append(newsBlock);
    
}



/**
 * Fetches matching news items from query-index.json
 * @param {string} currentPath - Current URL path
 * @returns {Promise<Array>} Matching news items
 */
async function fetchNewsItems(currentPath) {
    try {
      const response = await fetch('/query-index.json');
      const queryData = await response.json();
      
      // Normalize current path (lowercase and remove .html)
      const normalizedPath = currentPath.toLowerCase().replace('.html', '');
      
      // Find matching items
      const formattedItems = queryData.data.map(item => [{
        elems: [
          `<div class="card-title">${item.title || ''}</div>`,
          `<div class="card-description">${item.description || ''}</div>`,
          item.image ? `<div class="card-image"><img src="${item.image}" alt="${item.title}"></div>` : '',
          item['publication-date'] ? `<div class="card-date">${item['publication-date']}</div>` : '',
          `<div class="card-link"><a href="${item.path}">Read More</a></div>`
        ]
      }]);
  
      console.log('Formatted for buildBlock:', formattedItems);
      return formattedItems;
    } catch (error) {
      console.error('Error fetching news items:', error);
      return [];
    }
  }

  /**
   * 
   */

async function loadNews(block) {
    const currentPath = window.location.pathname;
  
    try {
      // 1. Fetch matching news items
      const matchingItems = await fetchNewsItems(currentPath);

      await loadNewsBlock(block, matchingItems);

      // 2. Create news landing page

      // 3. Replace block content with news landing

    } catch (error) {
        console.error('Error in news block decoration:', error);
    }
}
      