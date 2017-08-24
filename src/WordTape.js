goog.provide('tse.WordTape');

tse.WordTape = function (options) {
    this.source = options.source;
    this.target = document.getElementById(options.target);

    var text = this.source.textContent;
    var words = text.split(/\s+/);

    var spoolDiv = document.createElement('div');
    spoolDiv.className = 'tse-spool';


    var tapeDiv = document.createElement('div');
    tapeDiv.className = 'tse-tape';
    tapeDiv.innerHTML = '<span>' + words.join('</span><a>&mdash;</a><span>') + '</span>';
    spoolDiv.appendChild(tapeDiv);

    this.target.appendChild(spoolDiv);
    //document.body.appendChild(document.createTextNode());
};
