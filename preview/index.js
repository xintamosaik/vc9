
/**
 * Removes the leading dash from a line.
 * 
 * @param {string} line
 */
function removeLeadingDash(line) {
    const indexOfLine = line.indexOf('-');
    if (indexOfLine === -1) {
        return line;
    }

    return line.slice(indexOfLine + 1).trim();
}


/**
 * Converts double asterisks in a line to <strong> HTML tags.
 * 
 * @param {string} line 
 */
function asterisks2Strong(line) {
    const parts = line.trim().split('**');

    if (parts.length === 1) {
        return line;
    }

    const asterisks = parts.length - 1;
    const validAsterisks = asterisks - asterisks % 2 

    // mind that we start from 1 and iterate by 2. This way we only catch the "between" parts
    for (let i = 1; i < validAsterisks; i += 2) { 
        parts[i] = `<strong>${parts[i]}</strong>`;
    }

    return parts.join('');
}

/**
 * A procedure that converts a markdown string to HTML.
 * 
 * It replaces dashes with <li> tags and double asterisks with <strong> tags.
 * @param {string} markdown 
 * @returns 
 */
function convert(markdown) {
    const splitted = markdown.split('\n').filter(line => line.trim() !== '');
    const converted = splitted.map(line => {
        const toStrong = asterisks2Strong(line);
        const isListItem = toStrong.trim().startsWith('-');

        if (isListItem) {
            const lineWithoutDash = removeLeadingDash(toStrong);
            return `<li>${lineWithoutDash}</li>`;
        } else {
            return toStrong;
        }
    });
    const compiled = converted.filter(line => line !== undefined).join('\n');

    // Check if there are any <li> tags in the converted lines. If so, wrap in <ul> tags.
    const hasListItems = converted.some(line => line.startsWith('<li>'));

    return hasListItems ? `<ul>\n${compiled}\n</ul>` : compiled;
}

