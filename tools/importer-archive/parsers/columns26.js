/* global WebImporter */
export default function parse(element, { document }) {
  // Get the top-level columns
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // LEFT COLUMN: .onc-in children (text + CTA)
  let leftCell = [];
  const leftCol = columns[0];
  const oncIn = leftCol.querySelector('.onc-in');
  if (oncIn) {
    leftCell = Array.from(oncIn.children).filter(n => n.tagName !== 'SCRIPT' && n.tagName !== 'STYLE');
  } else {
    leftCell = Array.from(leftCol.children);
  }

  // RIGHT COLUMN: image
  const rightCol = columns[1];
  const img = rightCol.querySelector('img');
  const rightCell = img ? [img] : [];

  // Create table rows (header + content)
  const rows = [
    ['Columns (columns26)'],
    [leftCell, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // FIX: Set colspan on the header cell to span the number of columns in the content row
  const headerRow = table.querySelector('tr:first-child');
  const headerCell = headerRow ? headerRow.querySelector('th') : null;
  if (headerCell) {
    headerCell.setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
