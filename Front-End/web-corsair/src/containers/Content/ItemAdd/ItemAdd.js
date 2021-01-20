import React, { useState } from 'react'
import Header from '../Header/Header'
import { Button, Input, InputNumber, Select } from 'antd';
import style from './ItemAdd.module.scss'
import { useHistory } from 'react-router-dom';
import { post } from '../../../axios/request';

const { Option } = Select;


function ItemAdd(props) {

    const [loading, setLoading] = useState(false)

    const [cat, setCat] = useState('1')
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [price, setPrice] = useState('100')

    const history = useHistory();

    const handleCategory = (value) => {
        console.log(`selected ${value}`);

        setCat(value)
    }
    const handlePrice = (value) => {
        console.log(`selected ${value}`);

        setPrice(value)
    }
    const handleName = (e) => {
        console.log(`selected ${e.target.value}`);

        setName(e.target.value)
    }
    const handleLink = (e) => {
        console.log(`selected ${e.target.value}`);

        setLink(e.target.value)
    }

    const addProduct = () => {
        setLoading(true)
        if (cat != '' && name != '' && link != '' && price != '') {

            const body = {
                name: name,
                link: link,
                category: cat,
                expected_price: price
            };

            console.log(body)
            post(`http://127.0.0.1:5000/products`, body).then(res => {
                console.log(res)
                setLoading(false)
                alert(`Success! Product added, current price: ${res.current_price}`)
            }).catch(e => {
                alert(`Something went wrong!`)
                setLoading(false)
            })
        }
        else {
            alert('Enter all data!')
            setLoading(false)
        }
    }

    return (
        <>
            <Header>
                <h1 style={{ fontWeight: 200, margin: 0 }}>ADD PRODUCT</h1>
            </Header>
            <div className={style.Inputs}>
                <h1> Fill data </h1>
                <Input placeholder={'Name of the product'} onChange={handleName} />
                <br/>
                <Input placeholder={'Link (from ceneo)'} onChange={handleLink} />
                <br/>

                <p>Expected price, you will get notified by email <br></br> if price drops below this.</p>
                <InputNumber
                    defaultValue={100}
                    formatter={value => `${value}zł`}
                    parser={value => value.replace('zł', '')}
                    onChange={handlePrice}
                />
                <br/>

                <div>
                    <p>Category</p>

                    <Select defaultValue="Inne" style={{ width: 120 }} onChange={handleCategory}>
                        {props.categories.map(cat => {
                            return <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                        })}
                    </Select>
                </div>
                <div className={style.Buttons}>
                    <Button type="primary" danger size='large' onClick={() => { history.push('/dashboard') }}>Cancel</Button>
                    <Button type="primary" size='large' onClick={addProduct} loading={loading}>Add product</Button>
                </div>
            </div>
        </>
    )
}

export default ItemAdd
