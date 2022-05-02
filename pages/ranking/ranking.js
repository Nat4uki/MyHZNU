var n;

Page({
    data: {
        ranking_list: []
    },
    onPullDownRefresh: function(a) {
        n.getRank();
    },
    onLoad: function(a) {
        (n = this).getRank();
    },
    getRank: function() {
        wx.cloud.callFunction({
            name: "getRanking",
            data: {},
            success: function(a) {
                var t = a.result.data, o = 1;
                for (var e in t) t[e].rank = o++;
                n.setData({
                    ranking_list: t
                }), wx.stopPullDownRefresh();
            },
            fail: function(n) {
                console.error("[云函数] [login] 调用失败", n);
            }
        });
    }
});