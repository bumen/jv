var weixin = {
    appId: "wx01de8177114a48fd",

    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    debug: true,

    /**
     * 登录，获取用户OpenId，如果要登录必须通过这个方法
     */
    login: function () {
        debugger
        var code = getParameter("code");
        if (code) {
            log.info("成功获取用户code：" + code);

            // 执行登录
            log.info("开始登录");
            msgContainer.addMsgListenerOnce("GC_Login", this.loginSuccess, this);
            var login = new LoginMsg("Weixin");
            login.send(code);

        } else {
            // log.error("没有获取到用户Code,登录失败");
            var urlLocation = location.href.split('?')[0];
            var redirect_uri = encodeURIComponent(urlLocation);

            // 登录第一个授权界面URL，参考文档：https://mp.weixin.qq.com/wiki?action=doc&id=mp1421140842&t=0.22406438265659834#1
            // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef1ef87da2e2d3b9&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect

            var url = format("https://open.weixin.qq.com/connect/oauth2/authorize?appid={1}&redirect_uri={2}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect", this.appId, redirect_uri);

            log.info("跳转微信用户授权地址：" + url);
            window.location.href = url;
        }
    },

    // 用户登录成功
    loginSuccess: function (msg, data) {
        debugger

        log.info("登录成功");

        Caches.setSessionId(msg.param);
        setCookie("ip_port", msg.ip_port);

        log.info("跳转业务界面");
        window.location.href = "../qrCode.html";
    },

    /**
     * 微信初始化，每个页面调用此方法
     */
    weixinInit: function () {
        var ticket = Caches.getTicket();

        if (ticket) {
            log.info("微信Ticket已经找到");
            // 微信初始化
            this.weixinConfigInit(ticket);
        } else {
            log.info("微信Ticket不存在或者已经过期，从服务器获取");
            msgContainer.addMsgListenerOnce("GC_GetWeixinTicket", this.getWeixinTicket, this);

            var msg = new Msg("CG_GetWeixinTicket");
            msg.send();
        }
    },

    // 初始化结束后才能进行业务
    weixinInitFinish: function () {
        log.info("微信JS-SDK初始化成功！");
        debugger

        //自定义发送给朋友
        wx.onMenuShareAppMessage({
            title: '测试发送给朋友',
            desc: '这有一场嗨嗨的比赛',
            link: 'http://zhonghe.itimi.cn/enrolPlay.html',
            imgUrl: 'http://lyzh.itimi.cn/images/erweima.png',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                alert('用户点击发送给朋友');
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

    getWeixinTicket: function (msg, data) {
        if (msg.responseCode == 1) {
            var ticket = msg.ticket;
            var expire = msg.expires;

            Caches.setTicket(ticket, expire);

            // 微信初始化
            this.weixinInit(ticket);
        } else {
            log.error("微信Ticket获取失败！");
        }
    },

    _createNonceStr: function () {
        return Math.random().toString(36).substr(2, 15);
    },

    _createTimestamp: function () {
        return parseInt(new Date().getTime() / 1000) + '';
    },

    _raw: function (args) {
        var keys = Object.keys(args);
        keys = keys.sort()
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key];
        });

        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    },

    _sign: function (jsapi_ticket, url) {
        var nonceStr = this._createNonceStr();
        var timestamp = this._createTimestamp();

        var ret = {
            jsapi_ticket: jsapi_ticket,
            nonceStr: nonceStr,
            timestamp: timestamp,
            url: url
        };
        var signature = sha1(this._raw(ret));

        var config = {
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug: this.debug,

            // 必填，公众号的唯一标识
            appId: this.appId,

            // 必填，生成签名的时间戳
            timestamp: timestamp,

            // 必填，生成签名的随机串
            nonceStr: nonceStr,

            // 必填，签名，见附录1
            signature: signature,

            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            jsApiList: ['getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'checkJsApi', 'getNetworkType', 'scanQRCode']
        };

        return config;
    },

    // 微信JS-SDK初始化，必须先初始化，初始化成功后才可在客户端调用JS-SDK
    weixinConfigInit: function (ticket) {
        var self = this;
        // wx初始化成功回调
        wx.ready(function () {
            self.weixinInitFinish();
        });
        
        console.log(ticket);

        // 微信初始化失败回调
        wx.error(function (res) {
            log.error("微信JS-SDK初始化失败了！" + res);
        });

        // 微信初始化
        var url = location.href.split('?')[0];

        var data = this._sign(ticket, url);

        wx.config(data);
    },
};