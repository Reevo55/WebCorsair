import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { get, getWithBody, post, deleteAx } from '../../../axios/request'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ResponsiveLine } from '@nivo/line'
import style from './Item.module.scss'
import { Input, Select, RangePicker, DatePicker, Button, Radio } from 'antd';
import { SettingOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const { Option } = Select;


const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

function Item(props) {
    const [item, setItem] = useState('')
    const [loading, setLoading] = useState(true)
    const [foreCastLoading, setForeCastLoading] = useState(false)
    const [forecastData, setForecastData] = useState('')

    const history = useHistory()

    useEffect(() => {
        get(`http://127.0.0.1:5000/product/prices/${props.match.params.product}`).then(res => {
            if (res.status == 200) {
                console.log('data')
                console.log(res.data[0])
                setItem(res.data[0])
                setLoading(false)
            }
        })
    }, [])

    const itemToData = (item) => {
        const data = [{
            "id": item.name,
            "color": "hsl(101, 70%, 50%)",
            "data":
                item.prices.map((price, index) => {
                    return {
                        'y': price.price,
                        'x': index
                    }
                })
        }]

        return data
    }


    const downloadForecast = () => {
        setForeCastLoading(true)

        get(`http://127.0.0.1:5000/forecast/${item.id}`).then(res => {
            if (res.status == 200) {
                console.log(res.data)
                setForeCastLoading(false)
                setForecastData(res.data)
            }
        }).catch(e => {
            setForeCastLoading(false)
        })
    }

    const forecast = () => {
        if (forecastData != '') {
            return <p>Price in 7 days from now: <span style={{ fontWeight: 500, fontSize: 32 }}>{forecastData.data}</span> zł. Remember this is just a forecast. Decide on your own what to do next.</p>
        }
        else {
            return <p>Forecast result</p>
        }
    }

    const deleteItem = () => {
        deleteAx(`http://127.0.0.1:5000/products/${item.id}`, {}, {
            auth: {
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            }
        }).then(res => {
            console.log(res)
            alert("Item deleted!")
            history.push('/dashboard')
        })

    }

    return (
        <>
            {loading ? <Spin indicator={antIcon} /> :
                <>
                    <Header>
                        <h1 style={{ fontWeight: 200, margin: 0 }}>{item.name}</h1>
                        <div style={{ position: 'absolute', right: 5, top: '15%', cursor: 'pointer' }} onClick={deleteItem}><DeleteOutlined /></div>
                    </Header>

                    <div className={style.TopRow}>
                        <div className={style.Right}>
                            <h2 className={style.Price}>Current price: <br /> <span className={style.Value}>{item.prices[item.prices.length - 1].price} zł</span></h2>
                        </div>
                        <div className={style.Chart}>
                            {MyResponsiveLine(itemToData(item))}
                        </div>
                    </div>

                    <div className={style.BottomRow}>
                        <div className={style.LeftContainer}>
                            <div className={style.Link}>
                                <Input addonBefore="https://" defaultValue={item.link} readOnly/>
                                <p>Please, it has to be link to ceneo product!</p>
                            </div>

                            <div className={style.Date}>
                                <Input value={item.prices[0].created_at} readOnly/>
                                <p>First price fetch date</p>
                            </div>
                        </div>
                        <div className={style.RightContainer}>
                            <p>Click to download forecast of price!</p>
                            <Button type="primary" icon={<DownloadOutlined />} size='large' onClick={downloadForecast}> Forecast </Button>
                            {
                                foreCastLoading && <Spin indicator={antIcon} />
                            }
                            {!foreCastLoading && forecast()}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

const MyResponsiveLine = (data) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'days from the start of observation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Price [zł]',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default Item
