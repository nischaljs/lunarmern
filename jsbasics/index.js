

// // // let person = {
// // //     name: "Nischal",
// // //     age: 12,
// // //     class: "IV"
// // // }

// // // console.log(person.name)


// // // let nameOfAnimal = ["dog", "cat", "rabbit"];   //3     //2

// // // console.log(nameOfAnimal[2]);

// // // for(let i = 0; i<=nameOfAnimal.length;i++){
// // //     console.log(nameOfAnimal[i])
// // // }


// // //concatenation

// // let a = 50;

// // console.log("I am "+a + "fsdkgfhsgf0 + a" +a )


// // //template literals

// // let name = "ram";
// // console.log(`my name is ${name} name ${name}`)




// // //type cohersion   and conditionals

// // if(" true ho ki false ho ")
// // {
// //    /// edhi true ho bhane yo
// // }
// // else
// // {
// //    // pr else yo run hunxa
// // }



// // console.log("2"==2);

// console.log("2"+"2");
// console.log(2+2)

// console.log("2"-2)


// // ==      ===
// // == xa bhane value matra check hunxa

// if(2==="2"){
//     console.log("they are same")
// }

// console.log(2==="2");
// console.log(2=="2");
// console.log(2==2);
// console.log(2===2);
// console.log("2"=="2");
// console.log("2"==="2");

// // gist
// // =   assign garna use hunxa  a = 5
// // ==   value matra check garna use hunxa
// // === value + data type check garna use hunxa



//traditional function
// function CheckAge(age,name) {
//     if (age > 18) {
//         console.log("You are above 18" + name);
//     }
//     else {
//         console.log("You are below 18" + name)
//     }
// }
//arrow function
const CheckAges = (age, name) => {
    if (age > 18) {
        console.log("You are above 18 " + String(name));
    }
    else {
        console.log("You are below 18" + name)
    }
}

// CheckAges(10,"ram");




const Person = {
    name: "Ram",
    class: "12",
    ageChecker: (age, name) => {
        if (age > 18) {
            console.log("You are above 18 " + String(name));
        }
        else {
            console.log("You are below 18" + name)
        }
    }
}


// Person.ageChecker(10 ,"shyam");

// console.log()






// let console = {
//     fjsdkjfhsd:"dfjhdskfjh",
//     log:() =>{

//     }
// }

// console.log




//higher order fn


// const GreetMe = () =>{
//     console.log("Hello How are you?")
// }


// const ShallIGreet = (Greetfn, age) => {
//     if(age>18){
//         Greetfn();
//     }
//     else{
//         console.log("I wont greet you ")
//     }
// }

// ShallIGreet(GreetMe, 20)


const square = (num) => {
    return num* num;
}


const squares = num => num*num

// console.log(square(2))
// console.log(squares(3))





