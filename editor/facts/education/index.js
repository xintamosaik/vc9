const Education = {
    /**
     * Check if the entry is valid
     * @param {Object} education
     * @param {string} education.subject
     * @param {string} education.degree
     * @param {string} education.city
     * @param {string} education.start
     * @param {string} education.end
     * @param {string} education.description
     */
    isValid: function (education) {
        if (!education || typeof education !== 'object') return false;
        if (!this.isValidString(education.subject)) return false;
        if (!this.isValidString(education.degree)) return false;
        if (!this.isValidString(education.city)) return false;
        if (!this.isValidString(education.start)) return false;
        if (!this.isValidString(education.end)) return false;
        if (!this.isValidString(education.description)) return false;
        return true;
    },

    /**
     * Check if string is valid
     * @param {string} str
     */
    isValidString: function (str) {
        return typeof str === 'string' && str.trim().length > 0;
    },

    /**
     * Get an education entry by id
     * @param {number} id
     * @returns {Object|null} The education entry or null if not found
     */
    get: function (id) {
        const key = `education.${id}`;
        const value = localStorage.getItem(key);
        if (!value) return null;
        
        try {
            return JSON.parse(value);
        } catch (e) {
            console.error('Failed to parse education entry:', e);
            return null;
        }
    },

    /**
     * Get all education entries
     * @returns {Array<Object>}
     */
    all: function () {
        const entries = [];
        const filtered = Object.entries(localStorage).filter(([key]) => 
            key.startsWith("education.")
        );

        filtered.forEach(([_, value]) => {
            try {
                entries.push(JSON.parse(value));
            } catch (e) {
                console.error('Failed to parse education entry:', e);
            }
        });

        return entries;
    },

    /**
     * Add a new education entry
     * @param {Object} education
     * @param {string} education.subject
     * @param {string} education.degree
     * @param {string} education.city
     * @param {string} education.start
     * @param {string} education.end
     * @param {string} education.description
     * @returns {Object} The stored education entry with id
     */
    add: function (education) {
        if (!this.isValid(education)) {
            throw new Error('Invalid education data');
        }

        const id = Date.now();
        const data = {
            subject: education.subject.trim(),
            degree: education.degree.trim(),
            city: education.city.trim(),
            start: education.start.trim(),
            end: education.end.trim(),
            description: education.description.trim(),
            id
        };

        localStorage.setItem(`education.${id}`, JSON.stringify(data));
        return data;
    },

    /**
     * Remove an education entry by id
     * @param {number} id
     * @returns {boolean} Whether the entry was removed
     */
    remove: function (id) {
        const key = `education.${id}`;
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    },

    /**
     * Update an education entry
     * @param {number} id
     * @param {Object} education
     * @param {string} education.subject
     * @param {string} education.degree
     * @param {string} education.city
     * @param {string} education.start
     * @param {string} education.end
     * @param {string} education.description
     * @returns {Object|null} The updated education entry or null if not found
     */
    update: function (id, education) {
        if (!this.isValid(education)) {
            throw new Error('Invalid education data');
        }

        const key = `education.${id}`;
        const existing = localStorage.getItem(key);
        if (!existing) return null;

        const data = {
            subject: education.subject.trim(),
            degree: education.degree.trim(),
            city: education.city.trim(),
            start: education.start.trim(),
            end: education.end.trim(),
            description: education.description.trim(),
            id
        };

        localStorage.setItem(key, JSON.stringify(data));
        return data;
    },

    /**
     * Clear all education entries
     */
    clear: function () {
        const keys = Object.keys(localStorage).filter(key => 
            key.startsWith("education.")
        );
        keys.forEach(key => localStorage.removeItem(key));
    },

    /**
     * Get all education entries sorted by start date (most recent first)
     * @returns {Array<Object>} Sorted education entries
     */
    sorted: function () {
        const entries = this.all();
        return entries.sort((a, b) => {
            // Sort by start date in descending order (most recent first)
            return new Date(b.start) - new Date(a.start);
        });
    }
}






