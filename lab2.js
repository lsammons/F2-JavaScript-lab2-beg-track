'use strict';

/* ********************************************************
LAB 2: LOOPY SCI-FI

Welcome to Lab 2 =)

Be sure to read all the comments!

All of the instructions are inline with the assignment below.
Look for the word TODO in comments.  Each TODO will have a
description of what is required.

To run this file (in the terminal) use: node lab2.js */

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington. */

 // constructor function
var Blob = function() {
  //console.log('blob instance created');
};

// instance
var blob = new Blob();

// START OF FIRST PART OF PROBLEM 1

// variables to be used in loop
var population = 1000;
var count = 0;
var hoursSpentInDowington; // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// loop which calculates how long it took the blob to finish with Downington
for (var i = 1; population > 0; i++) {

  count += i;
  population = (population - count);

  if (population < 0) {
    hoursSpentInDowington = i;
  }

}
/*
//output to console confirming result:
console.log('It took the blob ' + hoursSpentInDowington + ' hours to finish Downington');
*/

// END OF FIRST PART OF PROBLEM 1

// START SECOND PART OF PROBLEM 1
// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {

  var consumptionRate = peoplePerHour;

  if (consumptionRate > 0) {

    if (population === 0) {
      return 0;
    }

    var count = 0;

    for (var i = 1; population > 0; i++) {

      count += i;
      population = (population - count);

      if (population <= 0) {
        hoursSpentInDowington = i;
        return i; // return num hours blob took to ooze
      }
    }
  }
  return 0; // return zero if blob's peoplePerHour rate is zero
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

assert(blob.hoursToOoze(10, 1) === 3, '10 people takes the blob 3 hours to consume');
assert(blob.hoursToOoze(100, 1) === 8, '100 people takes the blob 8 hours to consume');
assert(blob.hoursToOoze(500, 1) === 14, '500 people takes the blob 14 hours to consume.');
assert(blob.hoursToOoze(500, 0) === 0, '0 people consumed per hour means no time needed.');

// END SECOND PART OF PROBLEM 1

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************
var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

var klingonGreeting;
var romulanGreeting;
var humanGreeting;

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.
function SentientBeing(hmPlanet, lang) {
  this.homePlanet = hmPlanet;
  this.language = lang;
  klingonGreeting = hello.klingon;
  romulanGreeting = hello.romulan;
  humanGreeting = hello['federation standard'];

  if (lang === 'klingon') {
    this.myHello = klingonGreeting;
  }
  if (lang == 'romulan') {
    this.myHello = romulanGreeting;
  }
  if (lang == 'federation standard') {
    this.myHello = humanGreeting;
  }
}

// sb is a SentientBeing object
SentientBeing.prototype.sayHello = function(sb) {
  if (sb.language === 'klingon') {
    return klingonGreeting;
  }
  if (sb.language === 'romulan') {
    return romulanGreeting;
  }
  if (sb.language === 'federation standard') {
    return humanGreeting;
  }
};

// TODO: create three SentientBeings, one for each language in the
// 'hello' object above.
var klingon = new SentientBeing('Qo\'noS', 'klingon');
var romulan = new SentientBeing('Romulus', 'romulan');
var human = new SentientBeing('Earth', 'federation standard');

assert(human.sayHello(klingon) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.
assert(human.sayHello(romulan) === 'Jolan\'tru',
  'the romulan should hear "Jolan\'tru"');
assert(klingon.sayHello(romulan) === 'Jolan\'tru',
  'the romulan should hear "Jolan\'tru"');
assert(klingon.sayHello(human) === 'hello',
  'the human should hear hello');
assert(romulan.sayHello(klingon) === 'nuqneH',
  'the klingon should hear nuqneH');
assert(romulan.sayHello(human) === 'hello',
  'the human should hear hello');

//*********************************************************
// PROBLEM 3: Moar Loops. 20 points.
//
// Implement the following functions. Write at least 3
// assertions for each one
//*********************************************************
function max(array) {
  var result = array.sort(compareFunction);
  return result.pop();
}

function compareFunction(a, b) {
  // return a neg num if a < b
  if (a < b) {
    return -1;
  }
  // return pos num if a > b
  if (a > b) {
    return 1;
  }
  // return zero if they are equal
  if (a === b) {
    return 0;
  }
}

// TODO: write three more assertions
assert(max([1, 3, 2]) === 3, '[1,3,2]');
// three more:
assert(max([-12, 2233, 432, 0, 11]) === 2233, '[-12, 2233, 432, 0, 11]');
assert(max([13, -233, 202, 0, 99, 77372]) === 77372, '[13, -233, 202, 0, 99, 77372]');
assert(max([0, 81, -11, 82, 2]) === 82, '[0, 81, -11, 82, 2]');

function variablify(string) {
  var str = string;
  str = str.toLowerCase();
  str = str.split(' ');
  var finalStr;
  finalStr = str[0];

  for (var i = 1; i < str.length; i++) {

    var word  = str[i];
    var str2 = word.split('');
    var str3 = str2.shift();
    var str3Cap = str3.toUpperCase();
    str2.unshift(str3Cap);
    var capStr = str2.join('');
    finalStr += capStr;
  }
  return finalStr;
}

assert(variablify('one two three') === 'oneTwoThree',
  'variablify(\'one two three\')');
// TODO: write three more assertions
assert(variablify('thrEE bLiND MiCE') === 'threeBlindMice',
  'variablify(\'thrEE bLiND MiCE\')');

assert(variablify('and oNe HUNgrY caT') === 'andOneHungryCat',
  'variablify(\'and oNe HUNgrY caT\')');

assert(variablify('mICe at ZERO cAT is FULL') === 'miceAtZeroCatIsFull',
  'variablify(\'mICe at ZERO cAT is FULL\')');
//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
