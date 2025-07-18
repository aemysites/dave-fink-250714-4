/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main content block
  const study = element.querySelector('.vzm-study');
  if (!study) return;

  // Gather the heading and intro paragraph
  const heading = study.querySelector('h2');
  const introPara = study.querySelector('p');

  // Choose chart image (prefer desktop, fallback to mobile)
  let chartImg = study.querySelector('.hidden-xs img');
  if (!chartImg) {
    chartImg = study.querySelector('.visible-xs img');
  }

  // Gather the vst-list blocks (ul + heading)
  const vstLists = study.querySelectorAll('.vst-list');
  // Defensive: ensure both lists exist
  const criteriaBlock = vstLists[0] || null;
  const effectivenessBlock = vstLists[1] || null;

  // Compose left column: heading, intro, chart image
  const firstColContent = [];
  if (heading) firstColContent.push(heading);
  if (introPara) firstColContent.push(introPara);
  if (chartImg) firstColContent.push(chartImg);

  // Compose right column: both vst-list blocks
  // Each vst-list may have heading and ul
  const secondColContent = [];
  if (criteriaBlock) secondColContent.push(criteriaBlock);
  if (effectivenessBlock) secondColContent.push(effectivenessBlock);

  // Table: header row, then one row with two columns
  const cells = [
    ['Columns (columns15)'],
    [firstColContent, secondColContent]
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
