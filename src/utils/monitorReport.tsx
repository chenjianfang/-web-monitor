import {loadInterceptor, paramStr} from "./index";

import { QmsReportInterface, SetMonitorOptionInterface } from '../../types';

let businessType = 'company'; // 业务类型
let hostName = 'localhost:8080'; // 上报接口host

// 设置自定义配置
export const customOption = {
    open: -1, // -1 未初始化；0 关；1 开
    bt: businessType,
    data: {}
};

// 上报
export const monitorReport = function (data: QmsReportInterface) {
    if (customOption.open === 1) {
        let send: HTMLImageElement|null = new Image();
        send.onload = send.onerror = () => {
            send = null;
        };
        send.src = `${window.location.protocol}//${hostName}/monitor/collect.do?${paramStr(data)}`;
    }
};

// 上报数据缓存
export const cacheReport = {
    cache: [],
    set(data: QmsReportInterface) {
        this.cache.push(data);
    },
    report() {
        this.cache.forEach((data: QmsReportInterface) => {
            monitorReport(data);
        });
    }
};

/**
 * 设置自定义上报数据，open：是否打开上报；bt：上报平台；其他参数：上报在data中
 * @param option
 */
export function setMonitorOption(option: SetMonitorOptionInterface) {
    if (option) {
        const { open = true, bt = businessType, ...args } = option;
        customOption.open = open ? 1 : 0;
        customOption.bt = bt;
        customOption.data = {
            ...customOption.data,
            ...args
        };
        cacheReport.report();
    }
}

// 主动打开上报
loadInterceptor(() => {
    if (customOption.open === -1) {
        customOption.open = 1;
        cacheReport.report();
    }
});

