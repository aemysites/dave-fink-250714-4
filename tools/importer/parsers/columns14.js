/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the instructions
  const headerRow = ['Columns (columns14)'];

  // Find the two columns
  const columns = element.querySelectorAll(':scope > div');

  // Defensive: always expect two columns, but handle less gracefully
  let leftCell = '';
  let rightCell = '';

  // LEFT COL: combine all direct children of first col <div>
  if (columns[0]) {
    const leftCol = columns[0];
    // Instead of cloning, reference the actual elements
    const leftChildren = Array.from(leftCol.childNodes).filter(node => {
      // Only append non-empty text or elements
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim() !== '';
      }
      return true;
    });
    leftCell = leftChildren.length === 1 ? leftChildren[0] : leftChildren;
  }

  // RIGHT COL: assemble <ul> and note <div> into one cell
  if (columns[1]) {
    const rightCol = columns[1];
    const cellContent = [];
    // Add the pill list if present
    const pillList = rightCol.querySelector('ul');
    if (pillList) cellContent.push(pillList);
    // Add the note if present
    const note = rightCol.querySelector('.text-center');
    if (note) cellContent.push(note);
    rightCell = cellContent.length === 1 ? cellContent[0] : cellContent;
  }

  // Compose table data
  const tableData = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
