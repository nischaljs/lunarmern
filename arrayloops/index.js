// console.log("hello")


// //map filter reduce


// // map() → transforms an array into another array
// const numbers = [1, 2, 3]

// const doubled = numbers.map(n => n * 2)

// console.log(doubled)  // [2, 4, 6]


// // filter() → keeps only items that match a condition
// const nums = [1, 2, 3, 4, 5]

// const evens = nums.filter(n => n % 2 === 0)


// // reduce() → combines values into one output
// const prices = [10, 20, 30]

// const total = prices.reduce((sum, p) => sum + p, 0)




//map
const numbers = [1, 2, 3, 4, 5]

const newNumbers = numbers.map(
    (a) => {
        return a * a * a;
    }
)

console.log("===============")

numbers.forEach(
    (elem) => {
        // console.log(elem)
    }
)

console.log("============")

newNumbers.forEach(
    (elem) => {
        // console.log(elem)
    }
)




//filter


const randomNumbers = [2, 3, 4, 5, 6, 8, 90, 10, 23];

const evenNumbers = randomNumbers.filter(
    (elem) => (
        elem % 2 == 0    // true bhayo bhane return or else doensot return
    )
);

randomNumbers.forEach(
    (elem) => {
        console.log(elem)
    }
)
console.log("*********")

evenNumbers.forEach(
    (elem) => {
        console.log(elem)
    }
)
