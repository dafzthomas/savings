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

var runMaths = function () {
    var possiblePennySavedElement = document.getElementById('possiblePennySaving');
    var pennySavingsSoFar = document.getElementById('pennySavingsSoFar');
    var possibleSavingsPennyThisWeekElement = document.getElementById('possibleSavingsPennyThisWeekElement');
    var addToday = document.getElementById('addToday');

    var animOptions = {
        useEasing : true,
        useGrouping : true,
        separator : ',',
        decimal : '.',
        prefix : '',
        suffix : ''
    };


    var daysInYear = null,
        weeksCostArray = getPennyCostForEachWeek(currentWeek, currentDay);

    if ((new Date).isLeapYear() == false) {
        daysInYear = 365;
    } else {
        daysInYear = 366
    }

    var currentDay = getCurrentDay();
    var todaysPennys = currentDay / 100;

    if (todaysPennys < 1.00) {
        addToday.innerHTML = todaysPennys;
    } else {
        var pennySavingsSoFarAnim = new countUp("addToday", 0, todaysPennys, 2, 2.5, animOptions);
        pennySavingsSoFarAnim.start();
    }

    populateArray();

    var penniesSoFar = getPennySavingSoFar(currentDay) / 100;
    if (penniesSoFar < 5) {
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

    console.log('week number:   ', currentWeek);
    console.log('weeksCostArray:   ', weeksCostArray);
    console.log('weeksCostArray length:   ', weeksCostArray.length);

    console.log('saving this week (pennies): -- £', weeksCostArray[currentWeek - 1] / 100);

    var currentWeekAnim = new countUp("currentWeek", 0, currentWeek, 0, 2.5, animOptions);
    currentWeekAnim.start();

    var currentDay = new countUp("currentDay", 0, currentDay, 0, 2.5, animOptions);
    currentDay.start();

    var possibleSavingsPennyThisWeek = weeksCostArray[currentWeek - 1] / 100;
    if (possibleSavingsPennyThisWeek < 1) {
        possibleSavingsPennyThisWeekElement.innerHTML = possibleSavingsPennyThisWeek;
    } else {
        var possibleSavingsPennyThisWeekAnim = new countUp("possibleSavingsPennyThisWeekElement", 0, possibleSavingsPennyThisWeek, 2, 2.5, animOptions);
        possibleSavingsPennyThisWeekAnim.start();
    }
};

runMaths();
