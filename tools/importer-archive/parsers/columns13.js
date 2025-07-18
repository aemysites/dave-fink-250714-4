/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children divs, which are the columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Compose the content row (one cell per column)
  const contentRow = columns;

  // Create the table element manually to control the header colspan
  const table = document.createElement('table');

  // Header row with one <th> spanning number of columns
  const theadTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns13)';
  th.setAttribute('colspan', columns.length);
  theadTr.appendChild(th);
  table.appendChild(theadTr);

  // Content row with one <td> per column
  const tbodyTr = document.createElement('tr');
  columns.forEach(col => {
    const td = document.createElement('td');
    td.appendChild(col);
    tbodyTr.appendChild(td);
  });
  table.appendChild(tbodyTr);

  element.replaceWith(table);
}
