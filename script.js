/* globals: countUp */

Date.prototype.isLeapYear = function(utc) {
    var y = utc ? this.getUTCFullYear() : this.getFullYear();
    return !(y % 4) && (y % 100) || !(y % 400);
};

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.floor((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

var myArray = [],
    currentWeek = (new Date()).getWeekNumber();

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

var getPennyCostForEachWeek = function () {
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

var getDaysInYear = function () {
    if ((new Date).isLeapYear() == false) {
        return 365;
    } else {
        return 366;
    }
};

var runMaths = function () {
    var daysInYear = getDaysInYear(),
        weeksCostArray = getPennyCostForEachWeek(currentWeek, currentDay),
        possiblePennySavedElement = document.getElementById('possiblePennySaving'),
        pennySavingsSoFar = document.getElementById('pennySavingsSoFar'),
        possibleSavingsPennyThisWeekElement = document.getElementById('possibleSavingsPennyThisWeekElement'),
        possibleSavingsPoundsThisWeekElement = document.getElementById('possibleSavingsPoundsThisWeekElement'),
        addToday = document.getElementById('addToday'),
        animOptions = {
            useEasing : true,
            useGrouping : true,
            separator : ',',
            decimal : '.',
            prefix : '',
            suffix : ''
        };


    var currentDay = getCurrentDay();
    var todaysPennys = currentDay / 100;

    if (todaysPennys < 1.00) {
        addToday.innerHTML = todaysPennys;
    } else {
        var todaysPennySavingsSoFarAnim = new countUp("addToday", 0, todaysPennys, 2, 2.5, animOptions);
        todaysPennySavingsSoFarAnim.start();
    }

    populateArray();

    var penniesSoFar = getPennySavingSoFar(currentDay) / 100;
    if (penniesSoFar < 1) {
        pennySavingsSoFar.innerHTML = penniesSoFar;
    } else {
        var pennySavingsSoFarAnim = new countUp("pennySavingsSoFar", 0, penniesSoFar, 2, 2.5, animOptions);
        pennySavingsSoFarAnim.start();
    }

    var possibleSavingsPenny = getPennySavingSoFar(daysInYear) / 100;
    if (possibleSavingsPenny < 5) {
        possiblePennySavedElement.innerHTML = possibleSavingsPenny;
    } else {
        var possibleSavingsPennyAnim = new countUp("possiblePennySaving", 0, possibleSavingsPenny, 2, 2.5, animOptions);
        possibleSavingsPennyAnim.start();
    }


    var currentWeekAnim = new countUp("currentWeek", 0, currentWeek, 0, 2.5, animOptions);
    currentWeekAnim.start();

    var currentDayAnim = new countUp("currentDay", 0, currentDay, 0, 2.5, animOptions);
    currentDayAnim.start();

    var possibleSavingsPennyThisWeek = currentWeek;
    if (possibleSavingsPennyThisWeek < 1) {
        possibleSavingsPennyThisWeekElement.innerHTML = possibleSavingsPennyThisWeek;
    } else {
        var possibleSavingsPennyThisWeekAnim = new countUp("possibleSavingsPennyThisWeekElement", 0, possibleSavingsPennyThisWeek, 2, 2.5, animOptions);
        possibleSavingsPennyThisWeekAnim.start();
    }

    var poundsSavingsArray = [];
    var addThis = null;
    for (var i = 1; i < 53; i++) {
        addThis += i;

        poundsSavingsArray.push(addThis);
    }

    var possibleSavingsPoundsThisWeek = poundsSavingsArray[currentWeek - 1];
    var possibleSavingsPoundsThisWeekAnim = new countUp("possibleSavingsPoundsThisWeekElement", 0, possibleSavingsPoundsThisWeek, 2, 2.5, animOptions);
    possibleSavingsPoundsThisWeekAnim.start();

    var possibleSavingsPounds = poundsSavingsArray[poundsSavingsArray.length -1];
    var possibleSavingsPoundsAnim = new countUp("possibleSavingsPoundsElement", 0, possibleSavingsPounds, 2, 2.5, animOptions);
    possibleSavingsPoundsAnim.start();

};

runMaths();
