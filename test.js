console.log("Hello World");
let nums = [1,2,3,5,4,6,7,8,9];
// for of loop selects every item in array
for(let any_name_i_want of nums){
    console.log(any_name_i_want);
}

// This is a higher order function. A higher order function is just a function that either accepts a function as an argument, or returns a function as a result
[2,4,6,8,10].forEach(function(number){
    console.log(number);
})

// Below is an inefficient way of creating a new array by doubling another one
let unfinished_arr = [9,8,7,6];
let doubled_array = [];
unfinished_arr.forEach(function(n){
doubled_array.push(n*2);
});
console.log(arr);

let unfinished_arr = [2,4,6,8,10];

let doubled_array = unfinished_arr.map(function(value){
    //the map callback REQUIRES that you return a new value for each element
    return value*2
})

console.log(doubled_array);


// How to filter things inefficiently
let random_numbers = [1,2,44,55,67,234,97,68,45,66,77,11,13,54,67,8];

let even_numbers = [];

for(let num of random_numbers){
    if(num%2 == 0){
        even_numbers.push(num);
    }
    else{
        console.log(`uneven number, ${num}`);
    }
}
console.log(even_numbers);




let random_numbers = [1,2,44,55,67,234,97,68,45,66,77,11,13,54,67,8];

let even_numbers = random_numbers.filter(function(number){
    return (number % 2);
})

console.log(even_numbers);
