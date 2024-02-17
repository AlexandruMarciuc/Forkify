import View from "./View.js";

class resultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "No recipes found for your query! Please try again with a different query";
  _message = "";
  _generateMarkup() {
    return this._data.map(this.generateMarkupPreview).join("");
  }

  generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="previewList ${result.id === id ? "activePreviewList" : ""}">
            <a href="#${
              result.id
            }" class="previewLink"><figure class="previewPic">
              <img
                src="${result.image}"
                class="previewImg"
              />
            </figure>
            <div class="previewData">
              <span class="previewTitle"
                >${
                  result.title.length < 26
                    ? result.title
                    : `${result.title.slice(0, 23)}...`
                }</span
              >
              <span class="previewPublisher">${result.publisher}</span>
            </div></a>
          </li>`;
  }
}

export default new resultsView();
