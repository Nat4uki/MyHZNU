var a, o = getApp();

Page({
    data: {
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        isDoneCount: 2
    },
    start: function() {
        wx.navigateTo({
            url: "../singleChoiceExplain/singleChoiceExplain"
        });
    },
    onLoad: function() {
        a = this, wx.cloud.callFunction({
            name: "login",
            data: {},
            success: function(t) {
                o.globalData.openid = t.result.openid, wx.cloud.database().collection("users").where({
                    _openid: o.globalData.openid
                }).get({
                    success: function(t) {
                        t.data.length ? (o.globalData.realName = t.data[0].realName, o.globalData.className = t.data[0].className, 
                        o.globalData.studentId = t.data[0].studentId, o.globalData.totalScore = t.data[0].score ? t.data[0].score : 0, 
                        o.globalData.isDoneCount = t.data[0].isDoneCount ? t.data[0].isDoneCount : 0, o.globalData.highestScore = t.data[0].score ? t.data[0].score : 0, 
                        a.setData({
                            isDoneCount: o.globalData.isDoneCount
                        }), o.globalData.useTime = 0) : wx.redirectTo({
                            url: "../register/register"
                        });
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            },
            fail: function(a) {
                console.error("[云函数] [login] 调用失败", a);
            }
        });
    },
    onShow: function() {
        a.setData({
            isDoneCount: o.globalData.isDoneCount
        });
    }
});