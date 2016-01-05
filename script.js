'use strict';

console.log('Open');

Date.prototype.isLeapYear = function(utc) {
    var y = utc ? this.getUTCFullYear() : this.getFullYear();
    return !(y % 4) && (y % 100) || !(y % 400);
};

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};

var myArray = [],
    currentWeek = (new Date()).getWeek();

var populateArray = function () {
    for(var i = 1; i <= 365; i++) {
        myArray.push(i);
    }
};

var getCurrentDay = function () {
    var now = new Date(),
        start = new Date(now.getFullYear(), 0, 0),
        diff = now - start,
        oneDay = 1000 * 60 * 60 * 24;

    return Math.floor(diff / oneDay);
};

var getPennySavingSoFar = function (currentDay) {
    var cost = null;

    for (var i = 0; i <= currentDay; i++) {
        cost += i;
    }

    return cost;
};

var getPennyCostForEachWeek = function (currentWeek, currentDay) {
    var weeks = [],
        weeksCost = [];

    for (var y = 1; y < 55; y++) {
        var number = (y * 7);

        weeks.push(number);
    }

    for (var i = 0; i < weeks.length; i++) {
        var costToAdd = null;
        for (var j = 1; j <= weeks[i]; j++) {
            costToAdd += j;

        }
        weeksCost.push(costToAdd);
    }

    return weeksCost;
};

var runMaths = function () {
    var possiblePennySavedElement = document.getElementById('possiblePennySaving');
    var pennySavingsSoFar = document.getElementById('pennySavingsSoFar');
    var addToday = document.getElementById('addToday');


    var daysInYear = null,
        weeksCostArray = getPennyCostForEachWeek(currentWeek, currentDay);

    if ((new Date).isLeapYear() == false) {
        daysInYear = 365;
    } else {
        daysInYear = 366
    }

    var currentDay = getCurrentDay();
    addToday.innerHTML = '£' + currentDay / 100;
    populateArray();

    console.log('saving so far (pennies): -- £', getPennySavingSoFar(currentDay) / 100);
    var penniesSoFar = getPennySavingSoFar(currentDay) / 100;
    pennySavingsSoFar.innerHTML = '£' + penniesSoFar;

    console.log('saving by end of year (pennies): -- £', getPennySavingSoFar(daysInYear) / 100);
    var possibleSavingsPenny = getPennySavingSoFar(daysInYear) / 100;
    possiblePennySavedElement.innerHTML = '£' + possibleSavingsPenny;

    console.log('week number:   ', currentWeek);

    console.log('saving this week (pennies): -- £', weeksCostArray[currentWeek] / 100);
};

runMaths();
