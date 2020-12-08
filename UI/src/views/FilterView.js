class FilterView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display() {
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
