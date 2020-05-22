module.exports = {
    formatDate(date = new Date()) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = ("0" + month).slice(-2);
        day = ("0" + day).slice(-2);
        return year + "年" + month + "月" + day + "日 ";
    }, 
    formatTime(date = new Date()) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
    
        let hour = date.getHours();
        let minutes  = date.getMinutes();
        let seconds = date.getSeconds();
    
        month = ("0" + month).slice(-2);
        day = ("0" + day).slice(-2);
    
        hour = ("0" + hour).slice(-2);
        minutes = ("0" + minutes).slice(-2);
        seconds = ("0" + seconds).slice(-2);
    
        return{
            Y: year,
            M: month,
            D: day,
            h: hour,
            m: minutes,
            s: seconds
        }
        
    }
}