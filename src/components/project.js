import React from "react"
import { DESKTOP_MIN_WIDTH, media } from "../shared/style"

import BulletIcon from "../components/bulletIcon"

const Project = ({details}) => {
    const urls = details.urls

    urls.sort( (a, b) => a.name.localeCompare(b.name))

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
                    width: "100%",
                    [media(DESKTOP_MIN_WIDTH)]: {
                        maxWidth: "200px",
                        maxHeight: "none",
                    }
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
            <div css={{marginTop: "10px"}}>
                {
                    urls.map(a => {
                        return <span>
                            <BulletIcon key={a.name} name={a.name} url={a.url}/>
                        </span>
                    })
                }
            </div>
        </div>
        </div>
        <div style={{clear: "both"}}></div>
    </div>
}

export default Project