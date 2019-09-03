/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { Location } from '@reach/router'

import { DESKTOP_MIN_WIDTH, media } from "../shared/style"

import "./layout.css"
import OutLink from "./outlink";
import { Link } from "gatsby"
import SocialIcons from "./social-buttons";

const LinkCss = {
  color: "black"
}

const HeaderLink = ({children, to, location}) => {
  return <Link css={{
    color: "black",
    padding: "0px 5px",
    textDecoration: location.pathname === to ? "underlined" : "none"
  }} to={to}>{children}</Link>
}

const Layout = ({ children, props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  console.log(props)

  return (
    <>
      <div
        style={{
          paddingTop: 0,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000
        }}
      >
        <div css={{
          width: "100%", textAlign: "center", padding: "20px 0 20px 0",
          top: "0px", left: "0px",
          margin: `0 auto`,
          maxWidth: 960,
          background: "white",
          [media(DESKTOP_MIN_WIDTH)]: {
            textAlign: "right"
          }
          }}>
          <Location>
            {({ location }) => {
              return <>
                <HeaderLink location={location} to="/">Home</HeaderLink>
                <HeaderLink location={location} to="/projects">Projects</HeaderLink>
                <HeaderLink location={location} to="/blog">Blog</HeaderLink>
                <HeaderLink location={location} to="/about">About</HeaderLink>
              </>
            }}

          </Location>
        </div>
      </div>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          paddingTop: 0,
          position: "relative"
        }}
      >
        <main css={{
          padding: "0px 20px",
          marginTop: "80px",
          [media(DESKTOP_MIN_WIDTH)]: {
            marginTop: "100px",
            padding: "0px"
          }

        }}>{children}</main>
        <footer css={{textAlign: "center", margin: "20px 0", borderTop: "1px dotted black", padding: "20px 0"}}>
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
