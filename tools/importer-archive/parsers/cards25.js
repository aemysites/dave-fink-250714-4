/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards25)'];

  // The card does not have an image in this HTML, so first cell is blank
  const imgCell = '';

  // Compose the second cell: title as heading, and a list for the menu items
  const cellParts = [];

  // Title: the top-level <a>, keep as link, but bold via <strong>
  const mainLink = element.querySelector(':scope > a');
  if (mainLink) {
    const strong = document.createElement('strong');
    // Use the link itself for semantics
    const link = mainLink; // Use the existing element, not clone
    strong.appendChild(link);
    cellParts.push(strong);
  }

  // List of menu items, from the dropdown <ul>
  const dropdownMenu = element.querySelector(':scope > ul.dropdown-menu');
  if (dropdownMenu) {
    const links = dropdownMenu.querySelectorAll('a');
    if (links.length > 0) {
      const ul = document.createElement('ul');
      links.forEach(link => {
        const li = document.createElement('li');
        li.appendChild(link); // Use the actual <a> element from the DOM, not a clone
        ul.appendChild(li);
      });
      cellParts.push(ul);
    }
  }

  const row = [imgCell, cellParts];

  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
