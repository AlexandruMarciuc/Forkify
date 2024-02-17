class searchView {
  _parentElement = document.querySelector(".searchForm");
  getQuery() {
    const query = this._parentElement.querySelector(".searchField").value;
    this._clear();
    return query;
  }
  _clear() {
    this._parentElement.querySelector(".searchField").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
