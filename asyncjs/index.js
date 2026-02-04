// async await

// promise chaining  -> then



function fakeFetch() {
    return new Promise(
        resolve => {
            setTimeout(
                () => resolve("Fetched Data!"),
                1000)
        }
    )
}


//  promise version
fakeFetch().then(
    data => {
        console.log(data);
    }
)




