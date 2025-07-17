/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero3)'];

  // 2. Get background image (prefer desktop)
  let bgImg = null;
  const innerBanner = element.querySelector('.inner-banner');
  if (innerBanner) {
    const desktopImg = innerBanner.querySelector('.hidden-xs img');
    const mobileImg = innerBanner.querySelector('.visible-xs img');
    bgImg = desktopImg || mobileImg || null;
  }
  const backgroundRow = [bgImg ? bgImg : ''];

  // 3. Get title
  let titleElem = '';
  if (innerBanner) {
    const titleDiv = innerBanner.querySelector('.inner-banner-title');
    if (titleDiv && titleDiv.textContent.trim()) {
      // Use an h1 for semantic heading if present
      const h = document.createElement('h1');
      h.textContent = titleDiv.textContent.trim();
      titleElem = h;
    }
  }
  const contentRow = [titleElem];

  // 4. Compose block table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
