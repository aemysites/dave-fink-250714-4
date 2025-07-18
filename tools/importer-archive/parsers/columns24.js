/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must contain exactly one cell, even if the content row has 2+ cells.
  const headerRow = ['Columns (columns24)'];

  // Get left and right column elements
  const leftCol = element.querySelector('.col-md-7');
  const rightCol = element.querySelector('.col-md-5');

  // For the left cell: include all children of leftCol in a wrapper div for resilience
  const leftCell = document.createElement('div');
  while (leftCol.firstChild) {
    leftCell.appendChild(leftCol.firstChild);
  }

  // For the right cell: only the <ul> menu, or empty div if not found
  let rightCell;
  const rightMenu = rightCol.querySelector('ul');
  if (rightMenu) {
    rightCell = rightMenu;
  } else {
    rightCell = document.createElement('div');
  }

  // Final block table: 1 header cell, then 2 cells in the second row
  const rows = [
    headerRow,
    [leftCell, rightCell]
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
