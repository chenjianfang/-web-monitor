## Introduction
珍爱Web前端监控

[更新日志](https://github.com/chenjianfang/-web-monitor/blob/master/CHANGELOG.md)
## Installation
##### 1、Web
```
<script type="text/javascript" src="//i.zhenai.com/common/m/base/js/web-monitor-1.0.3.min.js"></script>
```
##### 2、ESM
```
npm i --save @za/common-web-monitor
```

## Usage
##### 1、Web
###### 1.1  API上报
```
// API上报。正常接口采样上报，一般1/10；异常接口全部上报
window.reportApi(options);
options参数：
    url: string // 接口地址
    type: 1|2|3; // 1: 请求成功；3: 逻辑失败；2：非逻辑失败
    code: number // code码
    msg: string // 错误消息
    delay: number // 接口响应时间
    param: Object // 请求参数

window.reportApiError(err: axios错误对象)，axios可直接调用，否则用下面code和msg对应

type等于2的code和msg对应，
1、axios请求成功，无返回数据
code = -1;
msg = 'data is null';

2、axios请求报错，默认使用报错的状态码和信息
axios的catch error对象 error.response.status && error.message
code = error.response.status;
msg = error.message;

3、axios请求报错，网络异常
axios的catch error对象
code = 601;
msg = error.message || 'Network Error';

4、axios请求报错，超时
axios的catch error对象
code = 602;
msg = error.message || 'timeout';

5、axios未处理消息
code = 603;
msg = error.message;

6、axios 没有错误消息
code = 600;

```
###### 1.2  js错误上报
```
// js错误上报。只能监听到主线程同步错误。vue、react、promise、try catch需要主动上报
window.reportError(options);
options参数：
    msg: string // 错误消息
    file: string // 错误文件
    line: number // 错误行
    column: number // 错误列
    stack?: undefined|string // 错误堆栈
```
###### 1.3  speed测速
```
// speed测速
window.reportSpeed(options);
options参数：
    type?: 1|2 // 1为以前老的测速方案。2为监控集成sdk测速方案
    d1: string // TTFB时间
    d2: string // FCP
    d3: string // LCP
    d4: string // FID
    d5: string // Ready
    d6: string // Load
    detail: string // duration超过500ms文件，字符串数组
```
###### 1.4 页面url异常上报
```
// 页面url异常
window.reportUrlError(options);
options参数：
    code: string // 错误码5xx, 4xx
    source?: string // 源链接，默认document.referrer
```
###### 1.5 白屏上报
```
// 白屏上报。包含.zhenai.com域名资源加载异常和页面load后2秒关键节点没内容。关键节点依次取 #app、#whiteScreen
window.reportWhiteScreen(options);
options参数：
    detail?: string, // 关键节点内容
```
###### 1.6 资源加载失败上报
```
// 资源加载失败上报
window.reportResourceFail(options);
options参数：
    detail: string, // 资源失败的地址
```

###### 1.7 设置监控配置
```
window.setMonitorOption(options);
options参数：
    open?: boolean // 是否监听
    bt?: string // bt
    [propName: string]: any; // 任何data数据
```


##### 2、ESM
```
import {
    reportApi,
    reportError,
    reportSpeed,
    reportUrlError,
    reportWhiteScreen,
} from '@za/common-web-monitor';

reportApi(options);
reportError(options);
reportSpeed(options);
reportUrlError(options);
reportWhiteScreen(options);
参数使用同上
```
