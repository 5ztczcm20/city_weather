import { useEffect, useState } from "react";
import { Card, Table, Tag, Row, Col, Cascader } from "antd";
import ReactECharts from 'echarts-for-react';
import {getCityWeekWeather} from "../api/weather";
import { CityWeather } from "../types";
import cityDataRaw from "../assets/city.json"; // 假设 city.json 默认导出

const weaIcon: { [key: string]: string } = {
    "晴": "☀️",
    "多云": "⛅",
    "阴": "☁️",
    "雨": "🌧️",
    "雪": "❄️"
};

// city.json 转换为 Cascader 结构
function formatCityData(data: any[]): any[] {
    return data.map(province => ({
        value: province.cityId ,
        label: province.cityName,
        children: province.children
            ? formatCityData(province.children)
            : [],
        cityid: province.cityId // 保留 cityid 字段
    }));
}

const cityOptions = formatCityData(cityDataRaw);

const Home: React.FC = () => {
    const [weather, setWeather] = useState<CityWeather | null>(null);
    const [loading, setLoading] = useState(false);
    const [cityId, setCityId] = useState("310100000000");

    const getWeatherDta = async (id = cityId) => {
        setLoading(true);
        const result: any = await getCityWeekWeather({ adcode: id, unescape: 1 });
        if (result?.data) {
            setWeather(result as CityWeather);
        }
        setLoading(false);
    };

    useEffect(() => {
        getWeatherDta(cityId);
    }, [cityId]);

    // 选择变化
    const onCityChange = (value: any, selectedOptions: any[]) => {
        if(!selectedOptions){
            return
        }
        // 找到最后一级的 cityid 
        const last = selectedOptions[selectedOptions.length - 1];
        console.log(selectedOptions,222222)
        if (last) {
            setCityId(last.value);
        }
    };

    const columns = [
        { title: '日期', dataIndex: 'date', key: 'date' },
        { title: '天气', dataIndex: 'wea', key: 'wea', render: (text: string) => <span>{weaIcon[text] || text} {text}</span> },
        { title: '白天温度', dataIndex: 'tem_day', key: 'tem_day', render: (t: string) => <Tag color="red">{t}°C</Tag> },
        { title: '夜间温度', dataIndex: 'tem_night', key: 'tem_night', render: (t: string) => <Tag color="blue">{t}°C</Tag> },
        { title: '风向', dataIndex: 'win', key: 'win' },
        { title: '风力', dataIndex: 'win_speed', key: 'win_speed' },
    ];

    const option = weather ? {
        tooltip: { trigger: 'axis' },
        legend: { data: ['白天温度', '夜间温度'] },
        xAxis: {
            type: 'category',
            data: (weather.data ?? []).map(d => d.date)
        },
        yAxis: { type: 'value', name: '温度(°C)' },
        series: [
            {
                name: '白天温度',
                type: 'line',
                data: (weather.data ?? []).map(d => Number(d.tem_day)),
                itemStyle: { color: '#faad14' }
            },
            {
                name: '夜间温度',
                type: 'line',
                data: (weather.data ?? []).map(d => Number(d.tem_night)),
                itemStyle: { color: '#1890ff' }
            }
        ]
    } : {};
    console.log('weather', weather);
    return (
        <Card style={{ maxWidth: 900, margin: '32px auto' }}>
            <Row style={{ marginBottom: 16 }}>
                <Col span={24}>
                    <Cascader
                     defaultValue={[31, 310100000000]}
                        options={cityOptions}
                        onChange={onCityChange}
                        placeholder="请选择省市区"
                        changeOnSelect
                        style={{ width: 300 }}
                    />
                </Col>
            </Row>
            {weather ? (
                <>
                    <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                        <Col><h2>{weather.city} 7天天气预报</h2></Col>
                        <Col><span style={{ color: '#888' }}>更新时间：{weather.update_time}</span></Col>
                    </Row>
                    <ReactECharts option={option} style={{ height: 300 }} />
                    <Table
                        style={{ marginTop: 24 }}
                        columns={columns}
                        dataSource={(weather.data ?? []).map((d, i) => ({ ...d, key: i }))}
                        pagination={false}
                        bordered
                        loading={loading}
                    />
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: 40 }}>{loading ? '加载中...' : '暂无数据'}</div>
            )}
        </Card>
    );
}

export default Home;