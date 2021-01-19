import React, { useEffect, useState } from 'react'
import Dashboard from '../../pages/dashboard'
import { get } from '../../axios/request'
import { Switch, Route } from 'react-router-dom'
import ItemList from './ItemList/ItemList'
import Item from './Item/Item'
import ItemAdd from './ItemAdd/ItemAdd'

function Content(props) {
    const [items, setItems] = useState([])
    const [spinnLoading, setSpinnLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchItems()
        console.log('location')
        console.log(props.location)
        get('http://127.0.0.1:5000/categories').then(res => {
            console.log(res.data)
            if (res.status == 200) {
                setCategories(res.data)
            }
        })
    }, [])

    useEffect(() => {
        fetchItems()
    }, [props.location]);

    const fetchItems = () => {
        get('http://127.0.0.1:5000/products').then(res => {
            console.log(res.data)
            if (res.status == 200) {
                setItems(res.data)
                setSpinnLoading(false)
            }
        })
    }

    return (
        <Dashboard >
            <Switch>
                <Route exact path="/dashboard">
                    <ItemList items={items} spinnLoading={spinnLoading} categories={categories} />
                </Route>
                <Route path="/dashboard/add">
                    <ItemAdd categories={categories}/>
                </Route>
                <Route path="/dashboard/:product" component={Item}>
                </Route>
            </Switch>
        </Dashboard>
    )
}

export default Content
