var t;

getApp();

Page({
    data: {
        questionList: [],
        nowQuestion: {},
        nowQuestionNumber: 0,
        singleChoiceNumber: 0,
        userChose: "",
        loading: !0
    },
    onLoad: function() {
        t = this;
        var e = getApp().globalData.singleChoiceNumber;
        t.start(), t.setData({
            singleChoiceNumber: e
        }), t.getQuestions();
    },
    start: function() {
        getApp().globalData.startTime = new Date(), getApp().globalData.score = 0, getApp().globalData.rightCnt = 0;
    },
    onShow: function() {},
    getQuestions: function() {
        wx.cloud.callFunction({
            name: "getSingleChoiceQuestionsByPart",
            data: {
                random: !0
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
        if (t.data.nowQuestionNumber != t.data.singleChoiceNumber) {
            var e = t.data.questionList[t.data.nowQuestionNumber];
            e.options = [], e.options[0] = {
                name: "A",
                detail: e.A
            }, e.options[1] = {
                name: "B",
                detail: e.B
            }, e.options[2] = {
                name: "C",
                detail: e.C
            }, e.options[3] = {
                name: "D",
                detail: e.D
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
        }), n == o && (getApp().globalData.score += 2, getApp().globalData.rightCnt++, setTimeout(t.showNextQuestion, 300)));
    },
    overSingleChoice: function(t) {
        wx.redirectTo({
            url: "../result/result"
        });
    }
});