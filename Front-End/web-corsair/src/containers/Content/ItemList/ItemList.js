import React, { useState } from 'react'
import Header from '../Header/Header.js'
import style from './ItemList.module.scss'
import ListItem from './ListItem/ListItem.js'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;


function ItemList(props) {
    const history = useHistory()

    const itemsHandler = () => {
        return props.items.map(item => {
            if(item != undefined) {
                return <ListItem key={item.id} id={item.id} title={item.name} category={props.categories.find(cat => cat.id == item.category_id)} 
                        expected_price={item.expected_price} link={item.link}/>
            } else return null;
        })
    }

    return (
        <div>
            <Header> 
                <h1 style={{fontWeight: 200, margin: 0}}>Produkty</h1> 

                <Button onClick={() => history.push('/dashboard/add')} type="primary" size='large' style={{position: 'absolute', right: '10%', top: '50%'}}>Add product</Button>
            </Header>

            <div className={style.List}>
                {props.spinnLoading && <Spin indicator={antIcon} />}
                {itemsHandler()}
            </div>
        </div>
    )
}

export default ItemList
