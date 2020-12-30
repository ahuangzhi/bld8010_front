export function date_format(time, fmt) {
    fmt = fmt ? fmt : "YYYY-mm-dd HH:MM:SS";
    let date = time? new Date(parseInt(time)) : new Date() ;
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt
}

export function ati_deal (data) {
    let ati = data.additionalInfo;
    if (!ati) {
        data.additionalInfo = {'description': null}
    }else if (!ati.description){
        data.additionalInfo['description'] = null
    }
    return data;
}

export function block_dp(num) {
    return (num / Math.pow(10, 18)).toFixed(10) + "DP"
}