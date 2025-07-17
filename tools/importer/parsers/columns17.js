/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name, exactly one cell
  const headerRow = ['Columns (columns17)'];

  // Extract all immediate li children
  const columns = Array.from(element.querySelectorAll(':scope > li'));

  // For each li, build a cell containing its contents (e.g., the <a> link; for active tab, emphasize)
  const colCells = columns.map(li => {
    const link = li.querySelector('a');
    if (!link) return '';
    // Reference the existing <a>, but do not modify it in-place
    // For active tab, wrap the text in <strong>
    if (li.classList.contains('active')) {
      // Create a new link referencing the same href and class
      const newLink = document.createElement('a');
      // Copy attributes
      Array.from(link.attributes).forEach(attr => newLink.setAttribute(attr.name, attr.value));
      // Add <strong> for the text
      const strong = document.createElement('strong');
      strong.textContent = link.textContent.trim();
      newLink.appendChild(strong);
      return newLink;
    } else {
      return link;
    }
  });

  // One header row (1 cell), followed by one row with as many columns as there are <li>s
  const tableData = [
    headerRow,
    colCells // This is a single row, with N cells (N columns)
  ];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
