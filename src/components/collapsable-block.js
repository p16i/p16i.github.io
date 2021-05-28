import React from "react"


const CollapsableBlock = ({title, children, background="#eee"}) => {
    return <div css={{marginBottom: `10px`}}>
        <details>
            <summary>{title}</summary>
            <div css={{background: background}}>
                {children}
            </div>
        </details>
    </div>
}

export default CollapsableBlock