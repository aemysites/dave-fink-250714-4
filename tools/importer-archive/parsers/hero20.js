/* global WebImporter */
export default function parse(element, { document }) {
  // Get the image element (background image)
  let img = null;
  const imgEl = element.querySelector('img');
  if (imgEl) img = imgEl;

  // Collect all text content from the element that is not the image itself
  // Get all direct children (to capture text and the label)
  const directChildren = Array.from(element.childNodes);
  const textContentNodes = [];
  directChildren.forEach(node => {
    // If element and not an image, and not a container for the image, add
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Exclude element containing the image
      if (!node.querySelector('img')) {
        textContentNodes.push(node);
      }
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      textContentNodes.push(document.createTextNode(node.textContent));
    }
  });

  // Table structure: header, image, text content
  const cells = [
    ['Hero (hero20)'],
    [img ? img : ''],
    [textContentNodes.length ? textContentNodes : '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
