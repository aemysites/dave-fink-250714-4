/* global WebImporter */
export default function parse(element, { document }) {
  // Get the left and right column elements
  const leftCol = element.querySelector('.col-md-7.top-left-body');
  const rightCol = element.querySelector('.col-md-5.top-right-menu');

  // The header row must be a single cell (spanning all columns)
  const headerRow = ['Columns (columns27)'];

  // The next row is the columns row, which must have both columns as separate cells
  const columnsRow = [leftCol || '', rightCol || ''];

  // Create the table with the header as a single cell row, then the columns row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
