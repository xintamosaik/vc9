const Summary = {
    isValid: function(entry) {
        return typeof entry === 'string' && entry.trim().length > 0;
    },
    update: function({title, description}) {
        if (title && this.isValid(title)) {
            localStorage.setItem("summary.title", title.trim());
        }
        if (description && this.isValid(description)) {
            localStorage.setItem("summary.description", description.trim());
        }
    },
    title: function() {
        return localStorage.getItem("summary.title")?.trim() || '';
    },
    description: function() {
        return localStorage.getItem("summary.description")?.trim() || '';
    }
}

