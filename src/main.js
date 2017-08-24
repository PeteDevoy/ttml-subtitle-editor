goog.provide('tse');

goog.require('goog.dom');
goog.require('goog.ui.Component');
goog.require('goog.ui.TwoThumbSlider');


var el = document.getElementById('s1');
var s = new goog.ui.TwoThumbSlider;
s.decorate(el);
s.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
  document.getElementById('out1').innerHTML = 'start: ' + s.getValue() +
    ' end: ' + (s.getValue() + s.getExtent());
});
