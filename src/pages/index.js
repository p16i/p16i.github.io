import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import MyImage from "../images/me.jpg"
import SEO from "../components/seo"
import SocialIcons from "../components/social-buttons";
import Project from "../components/project";

const leftColumnCSS = {
  width: "200px"
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div css={{ width: "100%", textAlign: "right", padding: "10px 0 20px 0"}}>Menu 1 / Menu 2</div>
    <div>
      <div css={{float: "left", display: "inline", ...leftColumnCSS}}>
        <img style={{margin: 0}} src={MyImage}/>
        <SocialIcons/>
      </div>
      <div css={{display: "inline", float: "left", width: "calc(960px - 200px)"}}>
        <div css={{ paddingLeft: "20px"}}>
          <h1>Pattarawat Chormai</h1>
          <p>Currently, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere. Enim praesent elementum facilisis leo vel. Turpis tincidunt id aliquet risus feugiat. Amet massa vitae tortor condimentum lacinia quis vel eros.</p>
          <p>Previously, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere. Enim praesent elementum facilisis leo vel. Turpis tincidunt id aliquet risus feugiat. Amet massa vitae tortor condimentum lacinia quis vel eros.</p>
        </div>
      </div>
      <div style={{clear: "both"}}></div>
    </div>
    <div>
      <h2>Selected Projects (more)</h2>
      <div>
        <Project/>
      </div>
    </div>
  </Layout>
)

export default IndexPage
