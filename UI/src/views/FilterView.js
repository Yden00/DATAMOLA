class FilterView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(filterObj) {
    document.querySelector(
      `#${this.containerId}`
    ).innerHTML = `
    <div class="dropdown-content">
      <input class="date" type="date">
      <input class="private" type="checkbox">
      <label for="private">show only private</label>
    </div>`; 
  }
}

const filterView = new FilterView('dropdown');
filterView.display('')