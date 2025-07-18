/* global WebImporter */
export default function parse(element, { document }) {
  // Find the navigation container
  const navContainer = element.querySelector('.container');
  if (!navContainer) return;
  // Get immediate child divs (cards)
  const navs = navContainer.querySelectorAll(':scope > div');
  if (!navs.length) return;

  // Start with header row (single column)
  const rows = [['Cards (cards5)']];

  navs.forEach((nav) => {
    // For each nav card, extract the anchor (link)
    const link = nav.querySelector('a');
    // Each card row is two columns: first is empty (no image), second is the text
    if (link) {
      rows.push(['', link]);
    }
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
