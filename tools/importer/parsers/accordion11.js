/* global WebImporter */
export default function parse(element, { document }) {
  // Block table header -- EXACT match as directed
  const headerRow = ['Accordion (accordion11)'];

  // Get the direct children of the element -- robust for future multi-row use
  // Each accordion is structured: header then content
  const children = Array.from(element.children);
  let rows = [headerRow];

  // Find all pairs of header/content among immediate children
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // Header: has views-field-field-accordion-title and ui-accordion-header
    if (child.classList.contains('views-field-field-accordion-title') || child.classList.contains('views-accordion-header')) {
      // Next sibling should be content
      let contentElem = null;
      // Defensive: skip to next sibling with ui-accordion-content
      for (let j = i + 1; j < children.length; j++) {
        if (children[j].classList.contains('ui-accordion-content')) {
          contentElem = children[j];
          break;
        }
      }
      // Title cell: get the .field-content inside header, fallback to header itself
      let titleCell = child.querySelector('.field-content') ? child.querySelector('.field-content') : child;

      // Content cell: get the .field-content inside content, fallback to content itself
      let contentCell = null;
      if (contentElem) {
        contentCell = contentElem.querySelector('.field-content') ? contentElem.querySelector('.field-content') : contentElem;
      } else {
        // No content -- empty cell
        contentCell = document.createTextNode('');
      }
      rows.push([titleCell, contentCell]);
    }
  }

  // If no rows extracted, create a fallback empty row
  if (rows.length === 1) {
    rows.push(['', '']);
  }

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
