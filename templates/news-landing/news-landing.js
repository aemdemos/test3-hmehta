import { getMetadata, buildBlock, loadBlock, decorateBlock } from '../../scripts/aem.js';
import { div, h1 } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  loadNews(block);

}


async function loadNewsBlock(block, matchingItems) {
  const cardsBlock = buildBlock('news-cards', matchingItems);
  block.append(cardsBlock);
  decorateBlock(cardsBlock);
  const newsBlock = await loadBlock(cardsBlock);
}

/**
 * 
 * @param {*} matchingItems 
 */
async function createNewsBlock(block, matchingItems) {

  const newsBlock = await loadBlock(decorateBlock(buildBlock('cards', matchingItems)));

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
    const formattedItems = queryData.data.map(item => [`
      <a href="${item.path}" class="news-card">
        <img class="news-card-image" src=${item.image || "/for-parents/media_14d486ea46814365c71f7d6d83b417e682cf318f9.jpeg"} alt="${item.title}"/>
        <div class="news-card-content">
          <div class="news-card-category">/ News category</div>
          <h3 class="news-card-title">${item.title || ''}</h3>
          <div class="news-card-date">21 Oct 2024</div>
          <div class="news-card-description">${getTrimmedDescription(item.description || '')}</div>
        </div>
      </a>
      `]);
    console.log('Formatted for buildBlock:', formattedItems);
    return formattedItems;
  } catch (error) {
    console.error('Error fetching news items:', error);
    return [];
  }
}


const getTrimmedDescription = (description) => {
  const maxLength = 138;
  if (description.length > maxLength) {
    return description.substring(0, maxLength-3) + '...';
  }
  return description;
}

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
