/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    const courses = [...element.querySelectorAll('.owl-item .item')].map((item) => {
        const image = item.querySelector('.courseBanner img');
        const title = item.querySelector('h3');
        const description = item.querySelector('p');
        const moduleCount = item.querySelector('.noCourseSecMain .noCourseSec ul li label')?.textContent.trim();
        const moduleText = item.querySelector('.noCourseSecMain .noCourseSec ul li span')?.textContent.trim();
        const hourCount = item.querySelectorAll('.noCourseSecMain .noCourseSec ul li label')[1]?.textContent.trim();
        const hourText = item.querySelectorAll('.noCourseSecMain .noCourseSec ul li span')[1]?.textContent.trim();
        const price = item.querySelector('.homeCourPriceTxt')?.textContent.trim();
        const link = item.querySelector('.viewLearnerBtn a');

        return [
            (() => {
                const imgElement = document.createElement('img');
                imgElement.src = image?.src;
                imgElement.alt = image?.alt;
                return imgElement;
            })(),
            title?.textContent || '',
            description?.textContent || '',
            moduleCount ? `${moduleCount} Modules` : '',
            moduleText || '',
            hourCount ? `${hourCount} Hours` : '',
            hourText || '',
            price || '',
            (() => {
                const linkElement = document.createElement('a');
                linkElement.href = link?.href;
                linkElement.textContent = 'View Course';
                return linkElement;
            })()
        ];
    });

    const cells = [
        headerRow,
        ...courses
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(table);
}