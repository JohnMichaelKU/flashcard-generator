module.exports = function(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.partial = this.text.replace(this.cloze, '_______');

    if (!text.includes(cloze)) {
        console.log('ERROR: cloze-deletion does not appear within full text -- <' + cloze + '>');
        return;
    }
}