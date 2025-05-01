const Work = {
    /**
     * Check if the entry is valid
     * @param {Object} work
     * @param {string} work.title
     * @param {string} work.company
     * @param {string} work.city
     * @param {string} work.start
     * @param {string} [work.end]
     * @param {string} [work.description]
     */
    isValid: function (work) {
        if (!work || typeof work !== 'object') return false;
        if (!this.isValidString(work.title)) return false;
        if (!this.isValidString(work.company)) return false;
        if (!this.isValidString(work.city)) return false;
        if (!this.isValidString(work.start)) return false;
        if (work.end && !this.isValidString(work.end)) return false;
        if (work.description && !this.isValidString(work.description)) return false;
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
     * Get a work entry by id
     * @param {number} id
     * @returns {Object|null} The work entry or null if not found
     */
    get: function (id) {
        const key = `work.${id}`;
        const value = localStorage.getItem(key);
        if (!value) return null;
        
        try {
            return JSON.parse(value);
        } catch (e) {
            console.error('Failed to parse work entry:', e);
            return null;
        }
    },

    /**
     * Get all work entries
     * @returns {Array<Object>}
     */
    all: function () {
        const entries = [];
        const filtered = Object.entries(localStorage).filter(([key]) => 
            key.startsWith("work.")
        );

        filtered.forEach(([_, value]) => {
            try {
                entries.push(JSON.parse(value));
            } catch (e) {
                console.error('Failed to parse work entry:', e);
            }
        });

        return entries;
    },

    /**
     * Add a new work entry
     * @param {Object} work
     * @param {string} work.title
     * @param {string} work.company
     * @param {string} work.city
     * @param {string} work.start
     * @param {string} [work.end]
     * @param {string} [work.description]
     * @returns {Object} The stored work entry with id
     */
    add: function (work) {
        if (!this.isValid(work)) {
            throw new Error('Invalid work data');
        }

        const id = Date.now();
        const data = {
            title: work.title.trim(),
            company: work.company.trim(),
            city: work.city.trim(),
            start: work.start.trim(),
            end: work.end?.trim() || null,
            description: work.description?.trim() || '',
            id
        };

        localStorage.setItem(`work.${id}`, JSON.stringify(data));
        return data;
    },

    /**
     * Remove a work entry by id
     * @param {number} id
     * @returns {boolean} Whether the entry was removed
     */
    remove: function (id) {
        const key = `work.${id}`;
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    },

    /**
     * Update a work entry
     * @param {number} id
     * @param {Object} work
     * @param {string} work.title
     * @param {string} work.company
     * @param {string} work.city
     * @param {string} work.start
     * @param {string} [work.end]
     * @param {string} [work.description]
     * @returns {Object|null} The updated work entry or null if not found
     */
    update: function (id, work) {
        if (!this.isValid(work)) {
            throw new Error('Invalid work data');
        }

        const key = `work.${id}`;
        const existing = localStorage.getItem(key);
        if (!existing) return null;

        const data = {
            title: work.title.trim(),
            company: work.company.trim(),
            city: work.city.trim(),
            start: work.start.trim(),
            end: work.end?.trim() || null,
            description: work.description?.trim() || '',
            id
        };

        localStorage.setItem(key, JSON.stringify(data));
        return data;
    },

    /**
     * Clear all work entries
     */
    clear: function () {
        const keys = Object.keys(localStorage).filter(key => 
            key.startsWith("work.")
        );
        keys.forEach(key => localStorage.removeItem(key));
    },

    /**
     * Get all work entries sorted by start date (most recent first)
     * @returns {Array<Object>} Sorted work entries
     */
    sorted: function () {
        const entries = this.all();
        return entries.sort((a, b) => {
            // Sort by start date in descending order (most recent first)
            return new Date(b.start) - new Date(a.start);
        });
    }
}

window.Work = Work;



