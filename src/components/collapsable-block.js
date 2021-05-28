import React, {useState, useEffect} from "react"


const CollapsableBlock = ({title, children, background="#eee"}) => {
    return <details>
        <summary>{title}</summary>
        <div css={{background: background}}>
            {children}
        </div>
    </details>
}

export default CollapsableBlock