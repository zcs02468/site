const getOneData = require('../module/getOneData/index')
const sendMail = require('../module/email/index')
const schedule = require('node-schedule');



const timeTask = async function () {
    schedule.scheduleJob('01 0 0 * * *', ()=> {
        getOneData()
    })
    schedule.scheduleJob('0 30 9 * * *', ()=> {
        sendMail()
    })
}
module.exports = timeTask;








//1. 确定的时间执行  2016年6月13日15点50分执行
// var date = new Date(2016,6,13,15,50,0);  
// schedule.scheduleJob(date, function(){  
//    console.log("执行任务");
// });

// 每天0点01分执行
// const scheduleCrons = () => {
//     schedule.scheduleJob('01 0 0 * * *', ()=> {
//         getSiteData()
//     })
// }


//2. 秒为单位执行 
//比如:每5秒执行一次
// var rule1     = new schedule.RecurrenceRule();  
// var times1    = [1,6,11,16,21,26,31,36,41,46,51,56];  
// rule1.second  = times1;  
// schedule.scheduleJob(rule1, function(){
//     console.log("执行任务");    
// });

//3.以分为单位执行
//比如:每5分种执行一次
// var rule2     = new schedule.RecurrenceRule();  
// var times2    = [1,6,11,16,21,26,31,36,41,46,51,56];  
// rule2.minute  = times2;  
// schedule.scheduleJob(rule2, function(){  
//     console.log("执行任务");    
// });  
