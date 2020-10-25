import React, {useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"


const papers = require("../data/publications.json")

papers.reverse()

const Publications = () => {
  
  return <Layout>
    <SEO title="Publications"/>
    <h1>Publications</h1>
      <div>
        {
          papers.map( (p, i) => {
            return <div css={{marginBottom: `20px`}}>
              {/* <div>{papers.length - i}</div> */}
              <div>
                <h4 css={{margin: 0}}>{p.title}</h4>
                <div>{p.authors}</div>
                <div css={{color: `gray`, marginBottom: `5px`}}><b>{p.venue}</b> {p.year}</div>
                <div>
                  {
                    p.urls.map(u => {
                      return <a css={{
                          marginRight: `5px`,
                          textDecoration: `none`,
                          borderRadius: `5px`,
                          padding: `0px 3px`,
                          backgroundColor: `lightgray`,
                          color: `gray`
                        }} href={u.url}>
                        {u.name}
                      </a>
                    })
                  }
                </div>
                {
                  p.note && <div css={{fontSize: `0.8em`}}> 
                    {p.note}
                  </div>
                }
              </div>
            </div>
          })
        }
      </div>
  </Layout>
}

export default Publications
