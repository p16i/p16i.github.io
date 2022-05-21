import React from "react"


const CollapsableBlock = ({ title, children, background = "#eee", opened = false }) => {
    return <div css={{ marginBottom: `10px` }}>
        <details open={opened}>
            <summary css={{ cursor: `pointer` }}>⯈ {title}</summary>
            <div css={{ background: background }}>
                {children}
            </div>
        </details>
    </div>
}

export default CollapsableBlock