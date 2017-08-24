goog.provide('tse');

goog.require('tse.WordTape');

goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.ui.TwoThumbSlider');

var textarea = document.getElementById('tse-transcript');

var tape = new tse.WordTape({
    source: textarea,
    target: 'tape'
});

<!--
var el = document.getElementById('s1');
var s = new goog.ui.TwoThumbSlider;
s.decorate(el);
s.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
  document.getElementById('out1').innerHTML = 'start: ' + s.getValue() +
    ' end: ' + (s.getValue() + s.getExtent());
});
-->
