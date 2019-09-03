/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import OutLink from "./outlink";
import { Link } from "gatsby"
import SocialIcons from "./social-buttons";

const LinkCss = {
  color: "black"
}

const HeaderLink = ({children, to}) => {
  return <Link css={{color: "black", padding: "0px 5px"}} to={to}>{children}</Link>
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          paddingTop: 0,
        }}
      >
        <div css={{ width: "100%", textAlign: "right", padding: "10px 0 20px 0"}}>
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/projects">Projects</HeaderLink>
          {/* <HeaderLink to="/">Photos</HeaderLink> */}
        </div>
        <main>{children}</main>
        <hr></hr>
        <footer css={{textAlign: "center"}}>
          Pattarawat Chormai
          <SocialIcons/>
          <div css={{color: "gray"}}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <OutLink href="https://www.gatsbyjs.org">Gatsby</OutLink>{` & `}
            <OutLink href="https://reactjs.org">React</OutLink>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
