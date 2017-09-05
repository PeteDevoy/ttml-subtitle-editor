goog.require('tse.WordTape');

var textarea = document.getElementById('tse-transcript');

var tape = new tse.WordTape({
    source: textarea,
    target: 'tape'
});
