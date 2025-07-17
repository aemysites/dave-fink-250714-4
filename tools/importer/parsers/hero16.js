/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row - block name as in example
  const headerRow = ['Hero (hero16)'];

  // 2. Background image row (optional, not present in provided HTML)
  // Check for an <img> as direct/descendant of the element
  let backgroundImg = null;
  const img = element.querySelector('img');
  if (img) {
    backgroundImg = img;
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (headline, subheading, CTA, etc). In example HTML, it's all the text/banner.
  // For robustness, include the main banner content. In this HTML, it's .sc-caption (contains <p> with inline <span>)
  let contentElem = null;
  const caption = element.querySelector('.sc-caption');
  if (caption) {
    contentElem = caption;
  } else {
    // fallback: all content
    contentElem = element;
  }
  const contentRow = [contentElem];

  // Compose the table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
