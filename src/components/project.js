import React from "react"
import OutLink from "./outlink";
import { DESKTOP_MIN_WIDTH, media } from "../shared/style"

const BulletIcon = ({name, url}) => {
    return <span css={{padding: "5px 5px"}}>
        {`[ `}<OutLink href={url}>{name}</OutLink>{` ]`}
    </span>
}

const Project = ({details}) => {
    return <div css={{
            margin: "10px 0px 40px 0px",
        }}>
        <div css={{
            margin: "auto",
            width: "100%",
            textAlign: "center",
            [media(DESKTOP_MIN_WIDTH)]: {
                float: "left",
                width: "auto",
            }
        }}>
            <img alt={details.title} src={details.image} 
                css={{
                    margin: "auto",
                    marginBottom: 0,
                    maxWidth: "200px",
            }}/>
        </div>
        <div>
        <div css={{
            width: "100%",
            [media(DESKTOP_MIN_WIDTH)]: {
                float: "left",
                paddingLeft: "20px",
                width: "calc(960px - 200px)"
            }
            }}>
            <h3 css={{
                marginBottom: "10px",
                textAlign: "center",
                [media(DESKTOP_MIN_WIDTH)]: {
                    textAlign: "left"
                }
            }}>{details.title}
              <span css={{
                    fontSize: "16px",
                    lineHeight: "2em",
                    display: "block",
                    [media(DESKTOP_MIN_WIDTH)]: {
                        float: "right",
                    }
                  }}>
                  {details.date}
              </span>
            </h3>
            <span>{details.desc}</span>
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