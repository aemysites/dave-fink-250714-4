/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main field body container
  const body = element.querySelector('.field--name-body');
  if (!body) return;

  // Get all immediate column children (usually .col-md-6 etc.)
  const columnDivs = Array.from(body.children).filter(child => child.tagName === 'DIV');
  // Fallback to all children if no divs found
  const columns = columnDivs.length ? columnDivs : [body];

  // The header row must be a single cell, not one per column
  const headerRow = ['Columns (columns4)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
