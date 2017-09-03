goog.provide('tse.WordTape');

goog.require('goog.events');

tse.WordTape = function (options) {
    this.source = options.source;
    this.target = document.getElementById(options.target);

    this.createTape();
};

tse.WordTape.prototype.cut = function (selection) {
    var s = selection;
    var dividend = document.createElement('p');
    var clickedParagraph = s.anchorNode.parentNode;

    if (s.anchorOffset == s.anchorNode.data.length) {
        console.info('did not split because beginning of tag');
        return;
    }

    dividend.innerHTML = s.anchorNode.data.substr(0, s.anchorOffset);
    clickedParagraph.innerHTML  = s.anchorNode.data.substr(s.anchorOffset);
    clickedParagraph.parentNode.insertBefore(dividend, clickedParagraph);
};

tse.WordTape.prototype.glue = function (selection) {
    var s = selection;
    var isReverse = s.anchorNode !== s.getRangeAt(0).startContainer;
    var first, last, current;
    var text;

    /*
     *  anchorNode}━━┑             ┍{focusNode
     * THIS IS AN EXAMP🅻🅴 🆂🅴🅻🅴🅲🆃🅸ON
     */
    first   = isReverse ? s.focusNode.parentNode  : s.anchorNode.parentNode;
    last    = isReverse ? s.anchorNode.parentNode : s.focusNode.parentNode;
    current = first;

    text = first.textContent;

    while ((current !== last) && (current = first.nextSibling)) {
        text += current.textContent;
        current.remove();
    }
    first.innerHTML = text;
    selection.removeAllRanges();
};

tse.WordTape.prototype.boundaryClicked = function (e) {
    var selection = window.getSelection();
    //diagram: https://stackoverflow.com/a/33586253/1860663
    if (selection.isCollapsed) {
        this.cut(selection);
    } else if (selection.anchorNode !== selection.focusNode) {
        this.glue(selection);
        //console.log(selection.anchorNode.data);
        //console.log(selection.focusNode.data);
        //this.glue(selection);
    }
};

tse.WordTape.prototype.createTape = function () {

    var p = document.createElement('p');
    p.innerHTML = this.source.textContent.trim();

    this.spoolDiv = document.createElement('div');
    this.spoolDiv.className = 'tse-spool';

    this.tapeDiv = document.createElement('div');
    this.tapeDiv.className = 'tse-tape';

    this.spoolDiv.appendChild(this.tapeDiv);
    this.tapeDiv.appendChild(p);
    this.target.appendChild(this.spoolDiv);
    //this.createTape();

    goog.events.listen(this.tapeDiv, goog.events.EventType.CLICK, this.boundaryClicked, false, this);
};
