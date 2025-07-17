/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, per the example
  const headerRow = ['Cards (cards1)'];

  // Card row: one row with two cells: icon/image, text content
  // Try to find image/icon
  let icon = element.querySelector('img') || element.querySelector('svg');
  if (!icon) {
    const spanIcon = element.querySelector('span');
    if (spanIcon && /icon/i.test(spanIcon.className)) {
      icon = spanIcon;
    }
  }

  // Text content cell
  const textDiv = element.querySelector('.field-content') || element;

  // Compose rows
  const rows = [
    headerRow,                // single cell header row
    [icon || '', textDiv]     // card row, two cells
  ];

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
