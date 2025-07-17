/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the accordion header (title)
  let title = '';
  let contentCell = null;
  // Get all direct children (to be robust to variations)
  const children = element.querySelectorAll(':scope > div');
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // Find the title
    if (child.classList.contains('views-accordion-header')) {
      const titleDiv = child.querySelector('.field-content');
      if (titleDiv && titleDiv.textContent.trim()) {
        title = titleDiv.textContent.trim();
      }
    }
    // Find the content
    if (child.classList.contains('ui-accordion-content')) {
      const fieldContent = child.querySelector('.views-field-field-accordion-content .field-content');
      if (fieldContent) {
        contentCell = fieldContent;
      }
    }
  }
  // Fallbacks for robustness
  if (!title) {
    const firstTitle = element.querySelector('.views-accordion-header .field-content');
    if (firstTitle && firstTitle.textContent.trim()) {
      title = firstTitle.textContent.trim();
    }
  }
  if (!contentCell) {
    const fieldContent = element.querySelector('.ui-accordion-content .field-content');
    if (fieldContent) {
      contentCell = fieldContent;
    }
  }
  // Compose the table header as a single cell (one column)
  const headerRow = ['Accordion (accordion7)'];
  // Compose the data row as two columns: title, content
  const row = [title, contentCell];
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Ensure the header row visually spans both columns if data row has two columns
  const headerTh = table.querySelector('th');
  if (headerTh && table.rows.length > 1 && table.rows[1].cells.length === 2) {
    headerTh.setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
