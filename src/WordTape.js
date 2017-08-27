goog.provide('tse.WordTape');

goog.require('goog.events');

tse.WordTape = function (options) {
    this.source = options.source;
    this.target = document.getElementById(options.target);

    this.spoolDiv = document.createElement('div');
    this.spoolDiv.className = 'tse-spool';

    this.tapeDiv = document.createElement('div');
    this.tapeDiv.className = 'tse-tape';

    this.spoolDiv.appendChild(this.tapeDiv);

    this.createTape();

    goog.events.listen(this.tapeDiv, goog.events.EventType.CLICK, this.boundaryClicked, false, this);
};

tse.WordTape.prototype.boundaryClicked = function (e) {
    var boundary = e.target;
    var p = document.createElement('p');
    var nextSibling;

    var moveNext = function () {
        try {
            p.appendChild(e.target.nextSibling);
            moveNext();
        } catch (e) {

        }
    };
    moveNext();

    /*
    while (e.target.nextSibling != null) {
        console.log(typeof e.target.nextSibling);
        console.log(e.target.nextSibling);

    }
    */
    if (p.children.length) {
        this.tapeDiv.appendChild(p);
    } else {
        console.log('join!');
    }

    /*
    if (e.target.nextSibling.tagName === 'SPAN') {
        referenceNode = e.target.nextSibling;
        e.target.parentNode.insertBefore(p, referenceNode);
    }

    */
};

tse.WordTape.prototype.createTape = function () {
    var text  = this.source.textContent;
    var words = text.split(/\s+/);
    var a, span, p;

    p = document.createElement('p');

    var addWords = function (word) {
        a = document.createElement('a');
        a.innerHTML = '&mdash;';

        span = document.createElement('span');
        span.innerHTML = word;
        p.appendChild(a);
        p.appendChild(span);
    }

    words.forEach(addWords, this);
    p.removeChild(p.lastChild);
    this.tapeDiv.appendChild(p);

    this.target.appendChild(this.spoolDiv);
    /*
    tapeDiv.innerHTML = '<span>' + words.join('</span><a onclick="tse.WordTape.boundaryHit()">&mdash;</a><span>') + '</span>';

    //document.body.appendChild(document.createTextNode());

    goog.event.listen();
    */
};
