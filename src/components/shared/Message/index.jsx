import React from 'react'

const Message = ({ text_color, children, style }) => {
    return (
        <span className={text_color} style={style}>
            {children}
        </span>
    )
}

export default Message