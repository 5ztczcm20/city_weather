import {get} from "../index";
import {getWeatherParam} from "../../types";
import {appConfid} from "../config/index"
/**
 * 获取城市七天内的天气情况
 * @param params
 */
export const getCityWeekWeather =(params:getWeatherParam)=> get("/free/week",{...params,...appConfid})