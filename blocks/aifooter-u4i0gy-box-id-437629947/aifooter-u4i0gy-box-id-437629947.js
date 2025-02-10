import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the aifooter-u4i0gy-box-id-437629947
 * @param {Element} block The aifooter-u4i0gy-box-id-437629947 block element
 */
export default async function decorate(block) {
  // load aifooter-u4i0gy-box-id-437629947 as fragment
  const aifooter-u4i0gy-box-id-437629947Meta = getMetadata('aifooter-u4i0gy-box-id-437629947');
  const aifooter-u4i0gy-box-id-437629947Path = aifooter-u4i0gy-box-id-437629947Meta ? new URL(aifooter-u4i0gy-box-id-437629947Meta, window.location).pathname : '/aifooter-u4i0gy-box-id-437629947';
  const fragment = await loadFragment(aifooter-u4i0gy-box-id-437629947Path);

  // decorate aifooter-u4i0gy-box-id-437629947 DOM
  block.textContent = '';
  const aifooter-u4i0gy-box-id-437629947 = document.createElement('div');
  while (fragment.firstElementChild) aifooter-u4i0gy-box-id-437629947.append(fragment.firstElementChild);

  block.append(aifooter-u4i0gy-box-id-437629947);
}
