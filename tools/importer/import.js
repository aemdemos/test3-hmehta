/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import accordion6Parser from './parsers/accordion6.js';
import columns4Parser from './parsers/columns4.js';
import tableStripedBordered5Parser from './parsers/tableStripedBordered5.js';
import hero1Parser from './parsers/hero1.js';
import search10Parser from './parsers/search10.js';
import columns2Parser from './parsers/columns2.js';
import search14Parser from './parsers/search14.js';
import columns16Parser from './parsers/columns16.js';
import cards12Parser from './parsers/cards12.js';
import columns19Parser from './parsers/columns19.js';
import cards21Parser from './parsers/cards21.js';
import columns15Parser from './parsers/columns15.js';
import columns13Parser from './parsers/columns13.js';
import columns20Parser from './parsers/columns20.js';
import columns22Parser from './parsers/columns22.js';
import cards23Parser from './parsers/cards23.js';
import columns3Parser from './parsers/columns3.js';
import carousel26Parser from './parsers/carousel26.js';
import carousel25Parser from './parsers/carousel25.js';
import hero27Parser from './parsers/hero27.js';
import accordion30Parser from './parsers/accordion30.js';
import columns24Parser from './parsers/columns24.js';
import embedVideo32Parser from './parsers/embedVideo32.js';
import columns29Parser from './parsers/columns29.js';
import tableBordered34Parser from './parsers/tableBordered34.js';
import cards37Parser from './parsers/cards37.js';
import cards36Parser from './parsers/cards36.js';
import accordion11Parser from './parsers/accordion11.js';
import columns9Parser from './parsers/columns9.js';
import cards38Parser from './parsers/cards38.js';
import cards40Parser from './parsers/cards40.js';
import cards43Parser from './parsers/cards43.js';
import cards35Parser from './parsers/cards35.js';
import columns17Parser from './parsers/columns17.js';
import columns41Parser from './parsers/columns41.js';
import columns28Parser from './parsers/columns28.js';
import cards44Parser from './parsers/cards44.js';
import cards47Parser from './parsers/cards47.js';
import columns49Parser from './parsers/columns49.js';
import hero42Parser from './parsers/hero42.js';
import columns7Parser from './parsers/columns7.js';
import cards39Parser from './parsers/cards39.js';
import columns50Parser from './parsers/columns50.js';
import cards54Parser from './parsers/cards54.js';
import hero55Parser from './parsers/hero55.js';
import cards53Parser from './parsers/cards53.js';
import columns52Parser from './parsers/columns52.js';
import hero48Parser from './parsers/hero48.js';
import columns59Parser from './parsers/columns59.js';
import hero62Parser from './parsers/hero62.js';
import embedVideo46Parser from './parsers/embedVideo46.js';
import columns60Parser from './parsers/columns60.js';
import cards8Parser from './parsers/cards8.js';
import columns58Parser from './parsers/columns58.js';
import columns57Parser from './parsers/columns57.js';
import columns45Parser from './parsers/columns45.js';
import columns31Parser from './parsers/columns31.js';
import columns56Parser from './parsers/columns56.js';
import columns61Parser from './parsers/columns61.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  accordion6: accordion6Parser,
  columns4: columns4Parser,
  tableStripedBordered5: tableStripedBordered5Parser,
  hero1: hero1Parser,
  search10: search10Parser,
  columns2: columns2Parser,
  search14: search14Parser,
  columns16: columns16Parser,
  cards12: cards12Parser,
  columns19: columns19Parser,
  cards21: cards21Parser,
  columns15: columns15Parser,
  columns13: columns13Parser,
  columns20: columns20Parser,
  columns22: columns22Parser,
  cards23: cards23Parser,
  columns3: columns3Parser,
  carousel26: carousel26Parser,
  carousel25: carousel25Parser,
  hero27: hero27Parser,
  accordion30: accordion30Parser,
  columns24: columns24Parser,
  embedVideo32: embedVideo32Parser,
  columns29: columns29Parser,
  tableBordered34: tableBordered34Parser,
  cards37: cards37Parser,
  cards36: cards36Parser,
  accordion11: accordion11Parser,
  columns9: columns9Parser,
  cards38: cards38Parser,
  cards40: cards40Parser,
  cards43: cards43Parser,
  cards35: cards35Parser,
  columns17: columns17Parser,
  columns41: columns41Parser,
  columns28: columns28Parser,
  cards44: cards44Parser,
  cards47: cards47Parser,
  columns49: columns49Parser,
  hero42: hero42Parser,
  columns7: columns7Parser,
  cards39: cards39Parser,
  columns50: columns50Parser,
  cards54: cards54Parser,
  hero55: hero55Parser,
  cards53: cards53Parser,
  columns52: columns52Parser,
  hero48: hero48Parser,
  columns59: columns59Parser,
  hero62: hero62Parser,
  embedVideo46: embedVideo46Parser,
  columns60: columns60Parser,
  cards8: cards8Parser,
  columns58: columns58Parser,
  columns57: columns57Parser,
  columns45: columns45Parser,
  columns31: columns31Parser,
  columns56: columns56Parser,
  columns61: columns61Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => instance.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      // parse the element
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, publishUrl });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, publishUrl });

    return [{
      element: main,
      path,
    }];
  },
};
