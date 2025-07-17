/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as specified
  const cells = [['Cards (cards12)']];

  // Find the card container (with both columns)
  const cardContainer = element.querySelector('.onc-global-two');
  if (!cardContainer) return;
  const columns = cardContainer.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column is always image/icon
  const img = columns[0].querySelector('img');

  // Second column is text content
  const textCol = columns[1];
  const textWrap = textCol.querySelector('.onc-in') || textCol;

  // Extract heading (can be missing)
  const heading = textWrap.querySelector('h2');
  // Extract description (can be missing)
  const desc = textWrap.querySelector('p');
  // Extract CTA area (may be missing, can be more robust)
  const cta = textWrap.querySelector('.cta-button');

  // Build content for the text cell, referencing existing elements in order, skipping nulls
  const textCell = [];
  if (heading) textCell.push(heading);
  if (desc) textCell.push(desc);
  if (cta) textCell.push(cta);

  // Add card row to the table
  cells.push([
    img,
    textCell
  ]);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
