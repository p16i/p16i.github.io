import React from "react"
import OutLink from "./outlink";


const capitalize = (word) => {
  return word.charAt(0).toUpperCase()
    + word.slice(1)
}

const BulletIcon = ({name, url}) => {
    return <span css={{marginRight: `10px`}}>
        <OutLink href={url}>
            <span style={{
                borderRadius: `5px`,
                backgroundColor: `lightgray`,
                padding: `0px 5px`,
                textDecoration: `none`,
                color: `#888`,
            }}>
                {capitalize(name)}
            </span>
        </OutLink>
    </span>
}

export default BulletIcon
