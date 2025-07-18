/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: handle missing columns
  const leftCol = columns[0] || document.createElement('div');
  const rightCol = columns[1] || document.createElement('div');

  // Header row: single column/cell
  const headerRow = ['Columns (columns22)'];
  // Content row: two columns
  const contentRow = [leftCol, rightCol];

  // Compose the table: header has one cell, content row has two
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
