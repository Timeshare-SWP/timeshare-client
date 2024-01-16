import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Hint = ({ content, children }) => {

    return (
        <OverlayTrigger
            overlay={<Tooltip>{content}</Tooltip>}
        >
            {children}
        </OverlayTrigger>
    )
}

export default Hint