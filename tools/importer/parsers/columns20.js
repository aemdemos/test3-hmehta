/* global WebImporter */
export default function parse(element, { document }) {
  const columnsContent = [];

  // Find all 'quizScoreCourseBox' elements
  const boxes = element.querySelectorAll('.quizScoreCourseBox');
  boxes.forEach((box) => {
    const img = box.querySelector('.quizScoreCourseImg img');
    const title = box.querySelector('.quizScoreCourseTxt h2');
    const description = box.querySelector('.quizScoreCourseTxt p');
    const button = box.querySelector('.quizScoreCourseTxt a');

    const contents = [];

    // Add the image
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt;
      contents.push(imageElement);
    }

    // Add the title
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent.trim();
      contents.push(titleElement);
    }

    // Add the description
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent.trim();
      contents.push(descriptionElement);
    }

    // Add the button
    if (button) {
      const buttonElement = document.createElement('a');
      buttonElement.href = button.href;
      buttonElement.textContent = button.textContent.trim();
      contents.push(buttonElement);
    }

    columnsContent.push(contents);
  });

  // Create the block table
  const tableContent = [
    ['Columns'],
    ...columnsContent,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the element with the block table
  element.replaceWith(blockTable);
}