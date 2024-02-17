import View from "./View.js";
import question from "../../images/question.png";
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarkResults");
  _errorMessage = "No bookmarks yet. Find a recipe and bookmark it";
  _message = "";
  _generateMarkup() {
    return this._data.map(this.generateMarkupPreview).join("");
  }

  render(data) {
    // Clear the parent element first
    this._clear();

    // If there are no bookmarks, render the default message
    if (!data || data.length === 0) {
      const defaultMarkup = `
        <li class="bookmarkPreviewList">
          <a href="" class="bookmarkPreviewLink"></a>
          <figure class="bookmarkPreviewPic">
            <img src="${question}" alt="" class="bookmarkPreviewImg" />
          </figure>
          <div class="bookmarkPreviewData">
            <span class="bookmarkPreviewTitle">No bookmarks yet. Find a recipe and bookmark it</span>
            <span class="bookmarkPreviewPublisher"></span>
          </div>
        </li>`;
      this._parentElement.insertAdjacentHTML("beforeend", defaultMarkup);
      return;
    }

    // If there are bookmarks, render each bookmark
    const markup = data.map(this.generateMarkupPreview).join("");
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    
    <li class="bookmarkPreviewList ${
      result.id === id ? "activePreviewList" : ""
    }">
            <a href="#${
              result.id
            }" class="bookmarkPreviewLink"><figure class="bookmarkPreviewPic">
              <img
                src="${result.image}"
                class="bookmarkPreviewImg"
              />
            </figure>
            <div class="bookmarkPreviewData">
              <span class="bookmarkPreviewTitle"
                >${
                  result.title.length < 26
                    ? result.title
                    : `${result.title.slice(0, 23)}...`
                }</span
              >
              <span class="bookmarkPreviewPublisher">${result.publisher}</span>
            </div></a>
          </li>`;
  }
}

export default new BookmarksView();
