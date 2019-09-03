import React from "react"

import Layout from "../components/layout"
import MyImage from "../images/me.jpg"
import SEO from "../components/seo"
import SocialIcons from "../components/social-buttons";
import Project from "../components/project";

import { DESKTOP_MIN_WIDTH, media } from "../shared/style"
import { useStaticQuery, graphql } from "gatsby"

const leftColumnCSS = {
  width: "200px"
}

const IndexPage = () => {
  const { allProjectsYaml } = useStaticQuery(
    graphql`
      query 
        {
          allProjectsYaml {
            edges {
              node {
                title
                date
                tags
                image
                code_url
                url
                desc
              }
            }
          }
        }
    `
  )

  const projects = allProjectsYaml.edges
  .filter(x => {
    return x.node.tags.find(t => t === "selected") === "selected"
  })
  .slice(0, 4)

  return <Layout>
    <SEO title="Home" />
    <div>
      <div css={{
          width: "100%",
          textAlign: "center",
          [media(DESKTOP_MIN_WIDTH)]: {
            float: "left", display: "inline", ...leftColumnCSS
          }
        }}>
          <div css={{
            margin: "auto",
            width: "150px",
            [media(DESKTOP_MIN_WIDTH)]: {
              ...leftColumnCSS
            }
          }}>
            <img style={{margin: 0}} src={MyImage}/>
            <SocialIcons/>
          </div>
      </div>
      <div css={{
          width: "100%",
          [media(DESKTOP_MIN_WIDTH)]: {
            width: "calc(960px - 200px)",
            display: "inline",
            float: "left",
          }
      }}>
        <div css={{ 
            [media(DESKTOP_MIN_WIDTH)]: {
              paddingLeft: "20px"
            }
          }}>
          <h1>Pattarawat Chormai</h1>
          <p>Currently, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere. Enim praesent elementum facilisis leo vel. Turpis tincidunt id aliquet risus feugiat. Amet massa vitae tortor condimentum lacinia quis vel eros.</p>
          <p>Previously, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere. Enim praesent elementum facilisis leo vel. Turpis tincidunt id aliquet risus feugiat. Amet massa vitae tortor condimentum lacinia quis vel eros.</p>
        </div>
      </div>
      <div style={{clear: "both"}}></div>
    </div>
    <div>
      <h2>Selected Projects</h2>
      <div>
        {
          projects.map(p => <Project key={p.node.title} details={p.node}/>)
        }
      </div>
    </div>
  </Layout>
}

export default IndexPage
