import View from "./View.js";
import rightArrow from "../../images/right-arrow.png";
import leftArrow from "../../images/left-arrow.png";

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");

  // Add event listener to the pagination buttons
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".nextPage, .previousPage");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  // Generate the markup for the pagination buttons
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;
    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto = "${currentPage + 1}" class="nextPage">
            <span class="nextText">Page ${currentPage + 1}</span>
            <img src="${rightArrow}" alt="" class="rightArrow" />
          </button>
      `;
    }
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-goto = "${currentPage - 1}" class="previousPage">
            <img src="${leftArrow}" alt="" class="leftArrow" />
            <span class="previousText">Page ${currentPage - 1}</span>
          </button>`;
    }

    //Other page
    if (currentPage < numPages) {
      return `
        <button data-goto = "${currentPage - 1}" class="previousPage">
              <img src="${leftArrow}" alt="" class="leftArrow" />
              <span class="previousText">Page ${currentPage - 1}</span>
            </button>
            <button data-goto = "${currentPage + 1}" class="nextPage">
            <span class="nextText">Page ${currentPage + 1}</span>
            <img src="${rightArrow}" alt="" class="rightArrow" />
          </button>`;
    }

    // Page 1 and there are no other pages
    return ``;
  }
}

export default new paginationView();
