var t;

getApp();

Page({
    data: {
        questionList: [],
        nowQuestion: {},
        nowQuestionNumber: 0,
        trueOrFalseNumber: 0,
        userChose: "",
        loading: !0
    },
    onLoad: function(e) {
        t = this;
        var o = getApp().globalData.trueOrFalseNumber;
        t.setData({
            trueOrFalseNumber: o
        }), t.start(), t.getQuestions();
    },
    start: function() {
        getApp().globalData.startTime = new Date(), getApp().globalData.score = 0, getApp().globalData.rightCnt = 0;
    },
    getQuestions: function() {
        wx.cloud.callFunction({
            name: "getQuestions",
            data: {
                num: t.data.trueOrFalseNumber,
                singleChoice: 2
            },
            success: function(e) {
                var o = e.result;
                t.setData({
                    questionList: o,
                    loading: !1
                }), t.showNextQuestion();
            },
            fail: function(t) {
                console.error("[云函数] [getQuestions] 调用失败", t);
            }
        });
    },
    showNextQuestion: function() {
        if (t.data.nowQuestionNumber != t.data.trueOrFalseNumber) {
            var e = t.data.questionList[t.data.nowQuestionNumber];
            e.options = [], e.options[0] = {
                name: "T",
                detail: "正确"
            }, e.options[1] = {
                name: "F",
                detail: "错误"
            }, t.setData({
                userChose: null,
                nowQuestion: e,
                nowQuestionNumber: t.data.nowQuestionNumber + 1
            });
        } else t.overSingleChoice();
    },
    chose: function(e) {
        var o = t.data.nowQuestion.answer, n = e.currentTarget.dataset.option;
        t.data.userChose || (t.setData({
            userChose: n
        }), n == o && (getApp().globalData.score++, getApp().globalData.rightCnt++, setTimeout(t.showNextQuestion, 300)));
    },
    overSingleChoice: function(t) {
        wx.redirectTo({
            url: "../multiChoiceExplain/multiChoiceExplain"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});