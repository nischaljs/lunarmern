// array destructing ra object destructing and spread operator



// array destructing

const numbers = [1,2,3,4,5,6];

const [ a,b,c,d,e] = numbers;


console.log(a)

//object destructing

const Person = {
    name : "Ram",
    age:12,
    phone:"984734638"
}

const {name, phone} = Person

console.log(name)
console.log(phone)


//spread operator
//  ...

const Man = {
    legs:4,
    species:"homo sapiens"
}

const boy = {
    name:"Ram",
    age:15
}

const manBoy = {...Man, ...boy, country:"Nepal"}  // object spread

console.log(manBoy)


const evenNumbers = [ 2,4,6,8]
const oddNumbers= [3,5,7]
const allNumbers=[1,...evenNumbers,...oddNumbers]  // array spread
console.log(allNumbers)
