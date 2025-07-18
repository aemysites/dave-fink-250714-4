/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get the desktop image element from .home-slider
  function getDesktopImage(homeSlider) {
    let img = homeSlider.querySelector('.hidden-xs img');
    if (!img) {
      img = homeSlider.querySelector('img');
    }
    return img;
  }

  // Helper: get the text/heading/CTA content from .slider-content
  function getTextContent(sliderContent) {
    if (!sliderContent) return '';
    const pieces = [];
    // Prefer .sld-txt if present
    const sldTxt = sliderContent.querySelector('.sld-txt');
    if (sldTxt) {
      pieces.push(sldTxt);
    } else {
      // fallback: all immediate children except .cta-button
      Array.from(sliderContent.children).forEach(child => {
        if (!child.classList.contains('cta-button')) {
          pieces.push(child);
        }
      });
    }
    // Add CTA button if present
    const cta = sliderContent.querySelector('.cta-button');
    if (cta) {
      pieces.push(document.createElement('br'));
      pieces.push(cta);
    }
    return pieces.length > 0 ? pieces : '';
  }

  // Prepare the table
  const rows = [['Carousel']]; // Header row as in example

  // For each carousel item/slide
  const items = element.querySelectorAll(':scope > .item');
  items.forEach(item => {
    const viewsRow = item.querySelector('.views-row');
    if (!viewsRow) return;
    const fieldContent = viewsRow.querySelector('.field-content');
    if (!fieldContent) return;
    const homeSlider = fieldContent.querySelector('.home-slider');
    const sliderContent = fieldContent.querySelector('.slider-content');
    // Desktop image goes in column 1
    let imageEl = null;
    if (homeSlider) imageEl = getDesktopImage(homeSlider);
    // Text/heading/cta goes in column 2
    const contentArr = getTextContent(sliderContent);
    rows.push([
      imageEl || '',
      contentArr && contentArr.length > 0 ? contentArr : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
