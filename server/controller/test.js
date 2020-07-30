const Quote = require("../db").Quote;

module.exports = {
    async getList(ctx, next) {
        try {
            let res = await Quote.find({}).sort("-date");
            let data = res[res.length - 1].content;
            ctx.body = {
                code: 200,
                msg: "获取数据成功！",
                data: {
                    list: ["早上4点起床，锻炼身体", "中午下班游泳一小时", "晚上8点到10点，学习两个小时"],
                },
            };
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: "获取每日一句失败！",
                data:{
                    list: []
                }
            };
        }
    },
};
