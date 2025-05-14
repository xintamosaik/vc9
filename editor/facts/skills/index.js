const Skills = {
    isValid: function(entry) {
        return typeof entry === 'string' && entry.trim().length > 0;
    },
    update: function(text) {
     
        if (text && this.isValid(text)) {
            localStorage.setItem("skills", text.trim());
        }
    },
    text: function() {
        const text = localStorage.getItem("skills");
        if (text) {
            return text.trim();
        }
        return "";
    }
    
}

