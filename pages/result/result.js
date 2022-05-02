var a, t = getApp();

Page({
    data: {
        score: 0,
        useTime: "",
        rightCnt: 0,
        loading: !0
    },
    onLoad: function(e) {
        a = this;
        var o = getApp().globalData.score;
        getApp().globalData.isDoneCount++;
        var n = Math.floor((new Date() - t.globalData.startTime) / 1e3), i = Math.floor(n / 60) + "分" + n % 60 + "秒";
        a.setData({
            score: o,
            useTime: i,
            rightCnt: getApp().globalData.rightCnt
        }), wx.cloud.callFunction({
            name: "uploadScore",
            data: {
                openid: t.globalData.openid,
                score: o,
                isDoneCount: t.globalData.isDoneCount,
                useTime: n
            }
        }).then(function(e) {
            "success" === e.result.status && (t.globalData.totalScore += e.result.data.score), 
            a.setData({
                loading: !1
            });
        });
    },
    returnMainPage: function() {
        wx.switchTab({
            url: "../choiceMain/choiceMain"
        });
    }
});