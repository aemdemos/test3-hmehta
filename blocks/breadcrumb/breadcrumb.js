/**
 * Builds a breadcrumb trail from current path to root
 * @param {Element} block The breadcrumb block element
 */
export default async function decorate(block) {
  const currentPath = window.location.pathname;
  const paths = currentPath.split('/').filter(Boolean);
  const breadcrumbs = [];

  // Fetch metadata from query-index
  const resp = await fetch('/query-index.json');
  const json = await resp.json();
  const pathsMetadata = json.data;

  // Build array of breadcrumb items
  let accumPath = '';
  paths.forEach((segment) => {
    accumPath += `/${segment}`;
    const pathData = pathsMetadata.find((p) => p.path === accumPath);
    breadcrumbs.push({
      text: pathData?.['breadcrumb-title'] || segment,
      path: accumPath,
    });
  });

  // Create breadcrumb HTML
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');

  // Create mobile version (Back button)
  const mobileNav = document.createElement('div');
  mobileNav.className = 'breadcrumb-mobile';
  const backButton = document.createElement('a');
  backButton.href = breadcrumbs.length > 0
    ? breadcrumbs[breadcrumbs.length - 2]?.path || '/'
    : '/';
  backButton.innerHTML = '← Back';
  mobileNav.appendChild(backButton);
  nav.appendChild(mobileNav);

  // Create desktop version (full breadcrumb)
  const desktopNav = document.createElement('div');
  desktopNav.className = 'breadcrumb-desktop';
  const list = document.createElement('ul');

  // Add home link
  const homeLi = document.createElement('li');
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Home';
  homeLi.appendChild(homeLink);
  list.appendChild(homeLi);

  // Add remaining breadcrumbs
  breadcrumbs.forEach((crumb, index) => {
    const li = document.createElement('li');
    if (index === breadcrumbs.length - 1) {
      li.textContent = crumb.text;
      li.setAttribute('aria-current', 'page');
    } else {
      const a = document.createElement('a');
      a.href = crumb.path;
      a.textContent = crumb.text;
      li.appendChild(a);
    }
    list.appendChild(li);
  });

  desktopNav.appendChild(list);
  nav.appendChild(desktopNav);
  block.appendChild(nav);
}
