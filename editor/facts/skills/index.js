// const Personal = {
//     /**
//      * Check if the entry is valid
//      * @param {string} entry
//      */
//     isValid: function (entry) {
//       return typeof entry === 'string' && entry.trim().length > 0;
//     },
  
//     /**
//      * Update the personal data
//      * @param {Object} personal
//      * @param {string} personal.first
//      * @param {string} personal.last
//      * @param {string} personal.city
//      */
//     update: function ({ first, last, city }) {
  
//       if (first && this.isValid(first)) {
//         localStorage.setItem("personal.first", first.trim());
//       }
//       if (last && this.isValid(last)) {
//         localStorage.setItem("personal.last", last.trim());
//       }
//       if (city && this.isValid(city)) {
//         localStorage.setItem("personal.city", city.trim());
//       }
//     },
  
//     first: function () {
//       return localStorage.getItem("personal.first")?.trim() || '';
//     },
  
//     last: function () {
//       return localStorage.getItem("personal.last")?.trim() || '';
//     },
  
//     city: function () {
//       return localStorage.getItem("personal.city")?.trim() || '';
//     }
//   }
// Abovve is for reference

const Skills = {
    /**
     * Check if the entry is valid
     * @param {Object} skill
     * @param {string} skill.name
     * @param {string} skill.level
     */
    isValid: function(skill) {
        if (!skill || typeof skill !== 'object') return false;
        if (!this.isValidString(skill.name)) return false;
        if (!this.isValidLevel(skill.level)) return false;
        return true;
    },

    /**
     * Check if string is valid
     * @param {string} str
     */
    isValidString: function(str) {
        return typeof str === 'string' && str.trim().length > 0;
    },

    /**
     * Check if level is valid
     * @param {string} level
     */
    isValidLevel: function(level) {
        if (!this.isValidString(level)) return false;
        return ['beginner', 'intermediate', 'advanced', 'expert'].includes(level.toLowerCase());
    },

    /**
     * Get all skills
     * @returns {Array<Object>}
     */
    all: function() {
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
     * @returns {Object} The stored skill with timestamp
     */
    add: function(skill) {
        if (!this.isValid(skill)) {
            throw new Error('Invalid skill data');
        }

        const timestamp = Date.now();
        const data = {
            name: skill.name.trim(),
            level: skill.level.toLowerCase(),
            timestamp
        };

        localStorage.setItem(`skill.${timestamp}`, JSON.stringify(data));
        return data;
    },

    /**
     * Remove a skill by timestamp
     * @param {number} timestamp
     * @returns {boolean} Whether the skill was removed
     */
    remove: function(timestamp) {
        const key = `skill.${timestamp}`;
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    },

    /**
     * Update a skill
     * @param {number} timestamp
     * @param {Object} skill
     * @param {string} skill.name
     * @param {string} skill.level
     * @returns {Object|null} The updated skill or null if not found
     */
    update: function(timestamp, skill) {
        if (!this.isValid(skill)) {
            throw new Error('Invalid skill data');
        }

        const key = `skill.${timestamp}`;
        const existing = localStorage.getItem(key);
        if (!existing) return null;

        const data = {
            name: skill.name.trim(),
            level: skill.level.toLowerCase(),
            timestamp
        };

        localStorage.setItem(key, JSON.stringify(data));
        return data;
    },

    /**
     * Clear all skills
     */
    clear: function() {
        const keys = Object.keys(localStorage).filter(key => 
            key.startsWith("skill.")
        );
        keys.forEach(key => localStorage.removeItem(key));
    }
}


  
  