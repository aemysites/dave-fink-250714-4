/* global WebImporter */
export default function parse(element, { document }) {
  // Get all the immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare content row: one cell per column, each containing the <ul> or other content
  const contentRow = columns.map(col => {
    const ul = col.querySelector('ul');
    if (ul) return ul;
    // fallback: all child nodes if no ul
    const kids = Array.from(col.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    return kids.length ? kids : '';
  });

  // Construct the table data: header is a single cell, content row has N columns
  const tableData = [
    ['Columns (columns9)'],
    contentRow
  ];

  // Create the table with the correct structure
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
