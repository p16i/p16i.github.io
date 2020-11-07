import React from "react"
import SEO from "../components/seo";
import Layout from "../components/layout";

import { useStaticQuery, graphql } from "gatsby"
import OutLink from "../components/outlink";

import { DESKTOP_MIN_WIDTH, media } from "../shared/style"

const Blog = () => {

  const { allBlogYaml } = useStaticQuery(
    graphql`
      query 
        {
          allBlogYaml(
            sort: { fields: [published_date], order: DESC }
          ) {
            edges {
              node {
                title
                url
                published_date
                thumbnail
              }
            }
          }
        }
    `
  )

  const articles = allBlogYaml.edges.map(n => {
    return {
        ...n.node, 
        year: n.node.published_date.split("/")[0]
    }
  })
  const years = Array.from(new Set(articles.map(a => a.year)))

  return <Layout>
    <SEO title="Blog"/>
    <h1>Blog</h1>
        {
            years.map(y => {
                return <div css={{margin: "40px 0"}}>
                <h2 css={{marginBottom: "10px"}}>{y}</h2>
                <ul css={{margin: "0"}}>{
                    articles.filter(a => a.year === y)
                    .map(a => {
                        return <li css={{
                            listStyle: "none", padding: "0", margin: "0",
                            textAlign: "center",
                            marginBottom: "20px",
                            [media(DESKTOP_MIN_WIDTH)]: {
                              textAlign: "left",
                            }
                          }}>
                            <div css={{
                                margin: "auto",
                                marginBottom: 0,
                                width: "50%",
                                display: "block",
                                [media(DESKTOP_MIN_WIDTH)]: {
                                    float: "left",
                                    maxWidth: "100px",
                                    maxHeight: "none",
                                    display: "inline-block",
                              }
                            }}>
                              <img src={a.thumbnail} style={{width: `100px`}}/>
                            </div>
                            <div css={{
                                float: "left",
                                width: "100%",
                                [media(DESKTOP_MIN_WIDTH)]: {
                                    width: "calc(960px - 100px)"
                                }
                              }}>
                              <b css={{
                                marginBottom: "10px",
                                width: "100%",
                                display: "block",
                                [media(DESKTOP_MIN_WIDTH)]: {
                                  textAlign: "right",
                                }
                              }}>
                                  {a.published_date}
                              </b>
                              <h3 css={{paddingLeft: "20px"}}>
                                <OutLink href={a.url}>{a.title}</OutLink>
                              </h3>
                            </div>
                            <div style={{clear: "both"}}></div>
                        </li>
                    })
                }
                </ul>
                </div>
            })
        }
  </Layout>
}

export default Blog