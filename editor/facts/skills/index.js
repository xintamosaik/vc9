const Skills = {
    /**
     * Check if the entry is valid
     * @param {Object} skill
     * @param {string} skill.name
     * @param {string} skill.level
     * @param {string} skill.category
     */
    isValid: function (skill) {
        if (!skill || typeof skill !== 'object') return false;
        if (!this.isValidString(skill.name)) return false;
        if (!this.isValidString(skill.level)) return false;
        if (!this.isValidString(skill.category)) return false;
        return true;
    },

    /**
     * Check if string is valid
     * @param {string} str
     */
    isValidString: function (str) {
        return typeof str === 'string' && str.trim().length > 0;
    },

    get: function (id) {
        const key = `skill.${id}`;
        const parsed = JSON.parse(localStorage.getItem(key))
        return parsed
    },

    /**
     * Get all skills
     * @returns {Array<Object>}
     */
    all: function () {
        const skills = [];
        const entries = Object.entries(localStorage).filter(([key]) =>
            key.startsWith("skill.")
        );

        entries.forEach(([_, value]) => {
            try {
                skills.push(JSON.parse(value));
            } catch (e) {
                console.error('Failed to parse skill:', e);
            }
        });

        return skills;
    },

    /**
     * Add a new skill
     * @param {Object} skill
     * @param {string} skill.name
     * @param {string} skill.level
     * @param {string} skill.category
     * @returns {Object} The stored skill with id
     */
    add: function (skill) {
        if (!this.isValid(skill)) {
            throw new Error('Invalid skill data');
        }

        const id = Date.now();
        const data = {
            name: skill.name.trim(),
            level: skill.level.toLowerCase(),
            category: skill.category.trim(),
            id
        };

        localStorage.setItem(`skill.${id}`, JSON.stringify(data));
        return data;
    },

    /**
     * Remove a skill by id
     * @param {number} id
     * @returns {boolean} Whether the skill was removed
     */
    remove: function (id) {
        const key = `skill.${id}`;
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    },

    /**
     * Update a skill
     * @param {number} id
     * @param {Object} skill
     * @param {string} skill.name
     * @param {string} skill.level
     * @param {string} skill.category
     * @returns {Object|null} The updated skill or null if not found
     */
    update: function (id, skill) {
        if (!this.isValid(skill)) {
            throw new Error('Invalid skill data');
        }

        const key = `skill.${id}`;
        const existing = localStorage.getItem(key);
        if (!existing) return null;

        const data = {
            name: skill.name.trim(),
            level: skill.level.toLowerCase(),
            category: skill.category.trim(),
            id
        };

        localStorage.setItem(key, JSON.stringify(data));
        return data;
    },

    /**
     * Clear all skills
     */
    clear: function () {
        const keys = Object.keys(localStorage).filter(key =>
            key.startsWith("skill.")
        );
        keys.forEach(key => localStorage.removeItem(key));
    },

    /**
     * Get all skills sorted by category and name
     * @returns {Array<Object>} Sorted skills
     */
    sorted: function () {
        const skills = this.all();
        return skills.sort((a, b) => {
            // First sort by category
            const categoryCompare = a.category.localeCompare(b.category);
            if (categoryCompare !== 0) return categoryCompare;

            // Then by name within same category
            return a.name.localeCompare(b.name);
        });
    }
}



