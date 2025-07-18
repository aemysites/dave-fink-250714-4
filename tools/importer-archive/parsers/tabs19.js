/* global WebImporter */
export default function parse(element, { document }) {
  // Review: The HTML is empty and contains no tab data, so we only create the header row as per the example requirement.
  // There is nothing else to extract or add.
  const cells = [
    ['Tabs']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}