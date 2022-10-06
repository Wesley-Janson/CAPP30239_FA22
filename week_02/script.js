/*
This is a block
comment - Wesley Janson
*/

let num = 100; //integer
let num1 = 200;

// function foo() {
//     console.log(num);
// };

// foo();

console.log(num1);

// Must call to run
let anonFun = function() {
    console.log("hello");
};

anonFun();

// Runs immediately
(function() {
    console.log("Hello");
})();

// Arrow functions-shortcut way to run functions
(() => console.log(100))();

let foo = () => console.log(num);

foo = () => console.log(num1);
foo();

let bar = 100;
bar = 200;

/* 
ARRAYS
*/
let arr = ["foo", 123, ["zar", "car"]];

console.log(arr[1]);

// Set item in array
arr[1] = "barbar";

console.log(arr[1]);

// Add item at the end of the array
arr.push("par");

// Removing an item from the array (index, deleted)
arr.splice(2, 1);

console.log(arr);

// Loop trough each item of array
let newArr = ["cow", "turtle", "goat"]

for (let item of newArr) {
    console.log(item);
}

// Loop trough each item of array
for (let i in newArr) {
    console.log(i + " " + newArr[i]);
}

// This is equivalent loop to above
newArr.forEach((item, i) => console.log(i + " " + item));


/* 
OBJECTS 
*/
let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};
//Access Property
//Method 1-period notation
console.log(obj1.name);
// Method 2-bracket notation
console.log(obj1["name"]);

// Set value
obj1.job = "Barista";

// Loop through all properties
for (let key in obj1) {
    let value = obj1[key];
    console.log(`This pair is ${key}: ${value}`);
}

// Two ways to create strings:
// let str = "Hello " + key + " more text here " + foo;
// let str = `Hello ${key} more text here ${foo}`;

/*
Loops and logical statements
*/
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// Conditionals
let val = 80;

if (val > 80) {
    console.log("good")
} else if (val > 50) {
    console.log("okay")
} else {
    console.log("terrible")
}

// ifelse statement
let y = (val >= 80) ? console.log("good") : console.log("not good")



/********************
Traversing the Dom 
********************/
let newVar = document.getElementById("example");

// Appending
newVar.innerHTML += "Hello world!"



