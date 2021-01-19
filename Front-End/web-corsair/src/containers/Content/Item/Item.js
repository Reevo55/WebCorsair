import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { get } from '../../../axios/request'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ResponsiveLine } from '@nivo/line'

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

function Item(props) {
    const [item, setItem] = useState('')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState('')

    useEffect(() => {
        get(`http://127.0.0.1:5000/product/prices/${props.match.params.product}`).then(res => {
            if (res.status == 200) {
                setItem(res.data[0])
                setLoading(false)
                console.log(item)
            }
        })
    }, [])

    const itemToData = (item) => {
        const data = {
            "id": item.name,
            "color": 'red',
            "data": [
                item.prices.map( price => {
                    return {
                        'x': price.price,
                        'y': price.created_at 
                    }
                })
            ]
        }

        console.log(data)

        setData(data)
    }

    return (
        <>
            {loading ? <Spin indicator={antIcon}/>:
            <>
            <Header>
                <h1 style={{fontWeight: 200, margin: 0}}>{item.name}</h1>
            </Header>
            
            <div>
                {MyResponsiveLine(data)}
            </div>

            </>
            }
        </>
    )
}

const MyResponsiveLine = ({ data }) => (
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
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
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
