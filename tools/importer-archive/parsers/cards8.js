/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the cards block
  const headerRow = ['Cards (cards8)'];

  // Find the card container (the .row inside)
  const cardRow = element.querySelector('.row');
  if (!cardRow) return;

  // First column: image (inside .col-md-2 > img)
  const imageCol = cardRow.querySelector('.col-md-2 img');

  // Second column: content (inside .col-md-10)
  const contentCol = cardRow.querySelector('.col-md-10');

  // Prepare text cell for the card: can include heading, description, and CTA
  const textFragments = [];

  // Heading (h2, optional)
  const heading = contentCol.querySelector('h2');
  if (heading) textFragments.push(heading);

  // Description (all <p> inside contentCol)
  // In this HTML there's only one <p>, but generalize for future-proofing
  const paragraphs = contentCol.querySelectorAll('p');
  paragraphs.forEach(p => textFragments.push(p));

  // Add any CTA buttons/links (with non-empty .cta-button)
  contentCol.querySelectorAll('.cta-button').forEach(ctaDiv => {
    // Only include if it has a link
    const ctaLink = ctaDiv.querySelector('a');
    if (ctaLink) textFragments.push(ctaLink);
  });

  // Build the block table: header, then [image, text-content]
  const rows = [
    headerRow,
    [imageCol, textFragments]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
