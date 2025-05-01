const Contact = {
    /**
     * Check if the entry is a valid string
     * @param {string} entry
     */
    isValid: function(entry) {
        return typeof entry === 'string' && entry.trim().length > 0;
    },
    /**
     * Update the contact data
     * @param {Object} contact
     * @param {string} contact.email
     * @param {string} contact.linkedin
     * @param {string} contact.github
     */
    update: function({email, linkedin, github}) {
        if (email && this.isValid(email)) {
            localStorage.setItem("contact.email", email.trim());
        }
        if (linkedin && this.isValid(linkedin)) {
            localStorage.setItem("contact.linkedin", linkedin.trim());
        }
        if (github && this.isValid(github)) {
            localStorage.setItem("contact.github", github.trim());
        }
    },
    email: function() {
        return localStorage.getItem("contact.email")?.trim() || '';
    },
    linkedin: function() {
        return localStorage.getItem("contact.linkedin")?.trim() || '';
    },
    github: function() {
        return localStorage.getItem("contact.github")?.trim() || '';
    }
}

