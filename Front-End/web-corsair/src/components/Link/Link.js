import React from 'react'
import { Button } from 'antd';

function Link(props) {
    return (
        <Button type={props.type} size={props.size} onClick>
            { props.children }
        </Button>
    )
}

export default Link
