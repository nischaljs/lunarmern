//array
const arrayOfName = ["ram", "shyam", "sita"];

//objects
const Person = {
    name: "Donald",
    age: 45,
    class: 7
}

console.log(arrayOfName[0])
console.log(Person.name)


// for loop
// do loop
// do while loop


//for each loop
// for in loop
// for of


// for (const arrayItem of arrayOfName) {
//     console.log(arrayItem);
// }

// for (let i = 0; i < arrayOfName.length; i++) {
//     console.log(arrayOfName[i])
// }



//for each loop is a property of the array

arrayOfName.forEach(
    (value, index) => {
        console.log("The item named this " +value + " " + index);
        console.log(`The item named ${value} is in index ${index}`);
    }
)



// for in loop

for(const parbat in Person){
    console.log(parbat);
    // console.log(Person.parbat)  // this doesnot return value
    console.log(Person[parbat])
}



