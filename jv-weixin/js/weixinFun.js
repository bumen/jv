function init() {
    global.init();
    weixin.weixinInit();

    // 测试代码
    weixinFun.testWeixinSDK();

    // 测试认证消息
    //index.testAuthorizationTest();
    
}


$(document).ready(function () {
    init();
});

var weixinFun = {

    // ------------以下是测试代码---------------
    testWeixinSDK: function () {
        // 查看接口是否可用
        wx.checkJsApi({
            jsApiList: ['getBrandWCPayRequest','onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                log.info("需要检测的JS接口列表操作成功：" + res.errMsg);
            }

        });

        // 获取用户位置
        /*  wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                  var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                  var speed = res.speed; // 速度，以米/每秒计
                  var accuracy = res.accuracy; // 位置精度

                  log.info("获取用户位置成功：纬度:" + latitude + " 经度:" + longitude + " 速度:" + speed + " 位置精度:" + accuracy);
              }
          });*/

        //自定义发送给朋友
        wx.onMenuShareAppMessage({
            title: '测试发送给朋友',
            desc: '这有一场嗨嗨的比赛',
            link: 'http://zhonghe.itimi.cn/enrolPlay.html',
            imgUrl: 'http://lyzh.itimi.cn/images/erweima.png',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                // alert('用户点击发送给朋友');
            },
            success: function (res) {
                alert('已分享');
            },
            cancel: function (res) {
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });

        // 自定义分享到朋友圈的内容
        wx.onMenuShareTimeline({
            title: '测试发送给朋友圈', // 分享标题

            link: 'http://zhonghe.itimi.cn/enrolPlay.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: 'http://lyzh.itimi.cn/images/erweima.png', // 分享图标

            success: function () {
                // 用户确认分享后执行的回调函数
                log.info("用户确认分享到朋友圈成功！");
            },

            cancel: function () {
                // 用户取消分享后执行的回调函数
                log.info("用户取消分享到朋友圈！");
            }

        });
    },

    startScanQR: function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                var msg = new Msg("CG_BindScreen");
                msg.setParam("seessionId", result);
                msg.send();
            }
        });
    }

    /*    testAuthorizationTest: function () {
            msgContainer.addMsgListenerOnce("GC_AdPlay", this.adPlay, this);

            var msg = new Msg("CG_WatchGame");
            msg.setParam("code", 123);
            msg.send();
        },

        adPlay: function (msg, data) {
            log.info(msg.adType);
        }*/
};

