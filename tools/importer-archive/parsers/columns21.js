/* global WebImporter */
export default function parse(element, { document }) {
  // Find immediate columns
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length !== 2) return; // Expecting two columns as per layout
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Compliant with example: header must be 'Columns (columns21)'
  const headerRow = ['Columns (columns21)'];
  const contentRow = [leftCol, rightCol];

  // No extra rows or Section Metadata block in example, so only one table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
