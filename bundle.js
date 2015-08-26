(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var blakesBirthday = new Date(1994, 7, 14);
var keyuesBirthday = new Date(1996, 7, 12);
var anniversary = new Date(2013, 10, 30);
var primaryEl = document.querySelector('.primary');
var blakesEl = document.querySelector('.blake');
var keyuesEl = document.querySelector('.keyue');
var SECOND = 1000;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var YEAR = 365.25 * DAY;
function update() {
    var now = new Date();
    var duration = now.getTime() - anniversary.getTime();
    var blakesAge = now.getTime() - blakesBirthday.getTime();
    var keyuesAge = now.getTime() - keyuesBirthday.getTime();
    render(primaryEl, now, anniversary, duration * 2 / (blakesAge + keyuesAge));
    render(blakesEl, now, blakesBirthday, duration / blakesAge);
    render(keyuesEl, now, keyuesBirthday, duration / keyuesAge);
    setTimeout(update, 60);
}
setup(primaryEl);
setup(blakesEl);
setup(keyuesEl);
update();
function render(el, now, milestone, percentage) {
    var nextMilestone = new Date(milestone.getTime());
    var previousMilestone = new Date(milestone.getTime());
    nextMilestone.setFullYear(now.getFullYear());
    previousMilestone.setFullYear(now.getFullYear());
    if (now >= nextMilestone) {
        nextMilestone.setFullYear(now.getFullYear() + 1);
    }
    else {
        previousMilestone.setFullYear(now.getFullYear() - 1);
    }
    var totalYears = previousMilestone.getFullYear() - milestone.getFullYear();
    var percentageYear = (now.getTime() - previousMilestone.getTime()) /
        (nextMilestone.getTime() - previousMilestone.getTime());
    el.querySelector('.years').textContent = String(totalYears);
    el.querySelector('.decimal').textContent = percentageYear.toFixed(10).substr(1);
    el.querySelector('.percentage').textContent = (percentage * 100).toFixed(6) + '%';
}
function setup(el) {
    el.innerHTML = "\n    <div class=\"timer\">\n      <span class=\"years\"></span>\n      <span class=\"decimal\"></span>\n    </div>\n    <div class=\"percentage\"></div>\n  ";
}

},{}]},{},[1]);
