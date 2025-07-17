/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .row div which contains the columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get all immediate child columns of the row
  const columns = Array.from(row.children);

  // Prepare the header row (exact match to example)
  const headerRow = ['Columns (columns23)'];

  // Prepare the content row, one cell per column
  const bodyRow = columns.map((col) => {
    // Collect all content from the column, preserving order
    const cellContent = [];
    // Add image(s) if present
    col.querySelectorAll(':scope > img').forEach(img => cellContent.push(img));
    // Add all other child nodes (headings, paragraphs, divs, spans) in their original order
    Array.from(col.childNodes).forEach(node => {
      // Skip images (already added above)
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'img') return;
      // Remove empty heading tags
      if (node.nodeType === Node.ELEMENT_NODE && /^h[1-6]$/i.test(node.tagName) && !node.textContent.trim()) return;
      // Skip empty div.cta-button
      if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('cta-button') && !node.textContent.trim() && node.children.length === 0) return;
      // Remove empty spans
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'span' && !node.textContent.trim() && node.children.length === 0) return;
      // If not empty, add to cellContent
      if (node.nodeType === Node.ELEMENT_NODE) {
        // For nested structural wrappers with only 1 child, flatten (e.g., .views-field-nothing, .field-content)
        if ((node.classList.contains('views-field-nothing') || node.classList.contains('field-content')) && node.childElementCount === 1) {
          const onlyChild = node.firstElementChild;
          cellContent.push(onlyChild);
        } else {
          cellContent.push(node);
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Wrap non-empty text nodes in a <span>
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        cellContent.push(span);
      }
    });
    // Remove leading/trailing empty text nodes
    while (cellContent.length && typeof cellContent[0] === 'string' && !cellContent[0].trim()) cellContent.shift();
    while (cellContent.length && typeof cellContent[cellContent.length-1] === 'string' && !cellContent[cellContent.length-1].trim()) cellContent.pop();
    // Return a single element or an array as required
    if (cellContent.length === 1) return cellContent[0];
    if (cellContent.length) return cellContent;
    // fallback: if no content found, return an empty string
    return '';
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);

  element.replaceWith(table);
}
