

let random_numbers = [1,2,44,55,67,234,97,68,45,66,77,11,13,54,67,8];

let even_numbers = random_numbers.filter(function(number){
    return (number % 2);
})

console.log(even_numbers);
