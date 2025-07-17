/* global WebImporter */
export default function parse(element, { document }) {
  // The given HTML is: <a href="" class="blue-shades-no-menu" target="_self"><none></none></a>
  // There is no image as a background, no heading, no text, no CTA, etc. Only an empty anchor with a <none> element.
  // So, the block structure should be:
  // [header]
  // [background image cell: empty]
  // [text cell: empty]
  const cells = [
    ['Hero (hero18)'],
    [''],
    ['']
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}