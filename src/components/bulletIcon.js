import React from "react"
import OutLink from "./outlink";

const BulletIcon = ({name, url}) => {
    return <span css={{marginRight: `10px`}}>
        <OutLink href={url}>
            <span style={{
                borderRadius: `5px`,
                backgroundColor: `lightgray`,
                padding: `0px 5px`,
                textDecoration: `none`,
                color: `#888`
            }}>
                {name}
            </span>
        </OutLink>
    </span>
}

export default BulletIcon
