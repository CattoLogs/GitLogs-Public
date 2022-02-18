const _shortner = (text) => {
    if (text && text.length > 500) {
        return text.substring(0, 500) + "..."
    } else {
        return text ? text : "No description"
    }
}

module.exports = {
    _shortner
}