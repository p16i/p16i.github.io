import React from "react"
import OutLink from "./outlink";

const BulletIcon = ({name, url}) => {
    return <span css={{padding: "5px 5px"}}>
        {`[ `}<OutLink href={url}>{name}</OutLink>{` ]`}
    </span>
}

const Project = ({details}) => {
    return <div css={{margin: "10px 0px", paddingBottom: "10px"}}>
        <div css={{float: "left"}}>
        <img src={details.image} css={{marginBottom: 0, width: "200px"}}/>
        </div>
        <div>
        <div css={{float: "left", paddingLeft: "20px", width: "calc(960px - 200px)"}}>
            <h3 css={{marginBottom: "10px"}}>{details.title}</h3>
            <span>
                A pilot project that aims to collect what being discussed in each parliament meeting. Having this kind of data will allow us to build various tools and applications that individuals can easily engage or interact. Hence, they would be well informed about the country's situtaion and potentially make a better decision in next elections.

            </span>
            {/* <p>
            </p> */}
            <div css={{marginTop: "10px"}}>
                <BulletIcon name="Code" url={details.code_url}/>
                <BulletIcon name="Link" url={details.url}/>
            </div>
        </div>
        </div>
        <div style={{clear: "both"}}></div>
    </div>
}

export default Project