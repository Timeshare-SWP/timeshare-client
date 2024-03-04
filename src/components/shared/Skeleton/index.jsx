import React from 'react'
import './style.scss'

const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={`skeleton-loading animate-pulse ${className}`}
            style={{ backgroundColor: "#cccccc", ...props.style }}
        />
    )
}

export default Skeleton