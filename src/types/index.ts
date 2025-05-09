/**
 * 获取城市天气请求参数
 */
export interface getWeatherParam {
    // appid: string; //用户appid
    // appsecret: string;//用户appsecret
    adcode?: string;//国家统计局城市ID
    cityid?: string;//城市ID	请参考 城市ID列表如果您想查询多个城市(最多30个),请用英文逗号隔开
    city?: string; //城市名称
    ip?: string;  //P地址	查询IP所在城市天气
    callback?: string; //jsonp参数	如: jQuery.Callbacks
    vue?: string; //跨域参数	如果您使用的是react、vue、angular请填写值: 1
    unescape?: number; //如果您希望json不被unicode, 直接输出中文, 请传此参数: 1
}

/**
 * 城市天气返回值
 */
export interface CityWeatherDay {
    date: string;
    wea: string;
    wea_img: string;
    tem_day: string;
    tem_night: string;
    win: string;
    win_speed: string;
}

export interface CityWeather {
    cityid: string;
    city: string;
    update_time: string;
    data: CityWeatherDay[];
}