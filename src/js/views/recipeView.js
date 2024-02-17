import clock from "../../images/clock.png";
import bookmark from "../../images/bookmark.png";
import bookmarkSave from "../../images/bookmark-save.png";
import bookmarkFill from "../../images/bookmarkFill.png";
import cutlery from "../../images/cutlery.png";
import dot from "../../images/dot.png";
import leftArrow from "../../images/left-arrow.png";
import minus from "../../images/minus.png";
import notes from "../../images/notes.png";
import people from "../../images/people.png";
import plus from "../../images/plus.png";
import rightArrow from "../../images/right-arrow.png";
import search from "../../images/search.png";
import spinner from "../../images/spinner.png";
import upload from "../../images/upload.png";
import { Fraction } from "fractional";
import View from "./View";
const bookmarksButton = document.querySelector(".bookmarks");
const bookmarkList = document.querySelector(".bookmarkList");

// Function to toggle the visibility of the bookmarkList
function toggleBookmarkList(element) {
  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

// Add click event listener to the bookmarks button
bookmarksButton.addEventListener("click", function (e) {
  // Prevent the event from bubbling up to the document
  e.stopPropagation();
  toggleBookmarkList(bookmarkList);
});

// Add click event listener to the document
document.addEventListener("click", function () {
  bookmarkList.style.display = "none";
});

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _message = "";

  // Add event listener to the recipe container
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  // Add event listener to the servings buttons
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(
        ".btn-decrease-servings, .btn-increase-servings"
      );
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  // Add event listener to the bookmark button
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-bookmark-round");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${
      this._data.image
    }" alt="Cauliflower Pizza Crust (with BBQ Chicken Pizza)" class="recipe__img">
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>
  <div class="recipe-details-container">
    <div class="recipe-details">
      <div class="recipe-cooking-time">
          <img src="${clock}" alt="">
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>

          <div class="recipe-servings-number">
            <img src="${people}" alt="">
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>
          </div>

        <div class="recipe-servings-number-edit">
          <button class="btn-decrease-servings" data-update-to="${
            this._data.servings - 1
          }">
              <img src="${minus}" alt="">
          </button>
          <button class="btn-increase-servings" data-update-to="${
            this._data.servings + 1
          }">
              <img src="${plus}" alt="">
          </button>
        </div>

      <button class="btn-bookmark-round">
        <img src="${
          this._data.bookmarked ? bookmarkFill : bookmarkSave
        }" alt="">
      </button>
    </div>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-ul">
    <!-- loop through the ingredients and generate a markup for each one -->
    ${this._data.ingredients
      .map((ing) => this._generateMarkupIngredients(ing))
      .join("")}
  </ul></div>
  <div class="recipe__directions">
    <h2 class="heading--3">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a class="btn-directions" href="${this._data.sourceUrl}" target="_blank">
      <span>Directions</span>
    </a>
  </div>`;
  }

  _generateMarkupIngredients(ing) {
    return `<li class="recipe__ingredient">
    <img src="${dot}" alt="dot-list">
      <span class="recipe__unit">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ""
      } ${ing.unit ? ing.unit : ""}${ing.description}</span>   
  </li>`;
  }
}

export default new RecipeView();
