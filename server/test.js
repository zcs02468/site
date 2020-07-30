// function sumOfMultiples() {
    // Implement your solution here
//     function getSum(targetNum, num) {
//         let maxNum = Math.floor((targetNum - 1) / num);
//         return (((1 + maxNum) * maxNum) / 2) * num;
//     }
//     return getSum(1000, 3) + getSum(1000, 5);
// }
// sumOfMultiples();

let a = 0;
function queryFn(time) {
    a++;
    console.log(time);
    return a > 3;
}
function callback(time) {
    console.log(time);
    console.log("true");
}
// simplePoller(queryFn, callback);
// function simplePoller(queryFn, callback) {
//     // Implement your solution here
//     let time = 1000;
//     aa(time);
//     function aa(time) {
//         setTimeout(() => {
//             if (queryFn(time)) {
//                 callback(time);
//             } else {
//                 aa(time * 1.5);
//             }
//         }, time);
//     }
// }

simplePoller(queryFn, callback);
async function simplePoller(queryFn, callback) {
    // Implement your solution here
    let time = 1000;
    setTimeout(() => {
       console.log("===="); 
    }, 900);
    let res = await setTimeout(() => {}, time);
    console.log("---");
    // timeFun(time);
    // function timeFun(time) {
    //     setTimeout(() => {
    //         if (queryFn(time)) {
    //             callback(time);
    //         } else {
    //             timeFun(time * 1.5);
    //         }
    //     }, time);
    // }
}


// var c =function *() {
//     setTimeout(() => {
//         console.log("====");
//     }, 900);
//     var res = yield setTimeout(() => {}, 1000);
//     console.log("---");
// }
// var b = c()
// b.next()
// b.next()
