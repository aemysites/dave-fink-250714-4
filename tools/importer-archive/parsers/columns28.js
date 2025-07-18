/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one cell, as in the markdown example
  const headerRow = ['Columns (columns28)'];

  // Gather all immediate columns
  const cols = element.querySelectorAll('.row > .anm-sev');

  // Build the columns content for the second row
  const contentRow = Array.from(cols).map((col) => {
    // Get the chart and the text
    const pieCol = col.querySelector('.col-md-4');
    const textCol = col.querySelector('.col-md-8');
    const pieDiv = pieCol ? pieCol.querySelector('.pie-title-center') : null;
    const h2 = textCol ? textCol.querySelector('h2') : null;
    // Container for both
    const container = document.createElement('div');
    if (pieDiv) container.appendChild(pieDiv);
    if (h2) container.appendChild(h2);
    return container;
  });

  // Structure: headerRow (one cell), then one row with as many columns as needed
  const rows = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
