const cheerio = require("cheerio");
const request = require("request");

const local = "shanghai/jinshan-district";
const WeatherUrl = "https://tianqi.moji.com/weather/china/" + local;
//当地拼音,需要在下面的墨迹天气url确认
function getWeatherData() {
    let p = new Promise(function(resolve, reject) {
        request(WeatherUrl, function(err, res, body) {
            if (!err && res.statusCode == 200) {
                const weatherData = parsingWeatherData(body);
                resolve(weatherData);
            } else {
                reject(err);
            }
        });
    });
    return p;
}

const parsingWeatherData = function(body) {
    $ = cheerio.load(body);
    let addressText = $(".search_default")
        .text()
        .trim()
        .split("， ")
        .reverse()
        .join("-");
    let weatherTip = $(".wea_tips em").text();
    const now = $(".wea_weather.clearfix");

    let nowInfo = {
        Temp: now.find("em").text(),
        WeatherText: now.find("b").text(),
        FreshText: now.find(".info_uptime").text()
    };
    //获取天气预报
    let threeDaysData = [];
    $(".forecast .days").each(function(i, elem) {
        const SingleDay = $(elem).find("li");
        threeDaysData.push({
            Day: $(SingleDay[0])
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
            WeatherImgUrl: $(SingleDay[1])
                .find("img")
                .attr("src"),
            WeatherText: $(SingleDay[1])
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
            Temperature: $(SingleDay[2])
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
            WindDirection: $(SingleDay[3])
                .find("em")
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
            WindLevel: $(SingleDay[3])
                .find("b")
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
            Pollution: $(SingleDay[4])
                .text()
                .replace(/(^\s*)|(\s*$)/g, ""),
            PollutionLevel: $(SingleDay[4])
                .find("strong")
                .attr("class")
        });
    });
    return {
        moji: {
            addressText,
            weatherTip,
            nowInfo,
            threeDaysData
        }
    };
};
module.exports = getWeatherData;
