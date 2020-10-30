import React from "react"


const OutLink = ({color="black", href, children}) => {
    return <a css={{color: color, textDecoration: `none`}} href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
}

export default OutLink