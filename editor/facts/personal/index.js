const Personal = {
  /**
   * Check if the entry is valid
   * @param {string} entry
   */
  isValid: function (entry) {
    return typeof entry === 'string' && entry.trim().length > 0;
  },

  /**
   * Update the personal data
   * @param {Object} personal
   * @param {string} personal.first
   * @param {string} personal.last
   * @param {string} personal.city
   */
  update: function ({ first, last, city }) {

    if (first && this.isValid(first)) {
      localStorage.setItem("personal.first", first.trim());
    }
    if (last && this.isValid(last)) {
      localStorage.setItem("personal.last", last.trim());
    }
    if (city && this.isValid(city)) {
      localStorage.setItem("personal.city", city.trim());
    }
  },

  first: function () {
    return localStorage.getItem("personal.first")?.trim() || '';
  },

  last: function () {
    return localStorage.getItem("personal.last")?.trim() || '';
  },

  city: function () {
    return localStorage.getItem("personal.city")?.trim() || '';
  }
}

