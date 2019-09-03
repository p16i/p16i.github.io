import React from "react"
import SEO from "../components/seo";
import Layout from "../components/layout";


const Header = ({children}) => {
    return <h3 css={{marginBottom: "20px"}}>
        {children}
    </h3>
}

const About = () => {
  return <Layout>
    <SEO title="About"/>
    <h1>About me</h1>
    Under constructure,

    <p>profile Overview</p>

    <Header>Education</Header>
    <Header>Skills</Header>

    <Header>Other interests</Header>

    <p>
    <b>Football</b> is my favourite sport. I've been playing since a young age.
    Although I came to Europe for my study, I still play football there. These are clubs
    that I've played with:
    <ul>
        <li>
            Pusphaira, 2015
            Eindhoven, the Netherlands
        </li>
        <li>
            SG .. , 2015
            Berlin, Germany
        </li>
        <li>
            SC Bosna Berlin, Keisliga C 2018/19
            Berlin, Germany
        </li>

    </ul>
    </p>
    <p>
        I also enjoy <b>Photography</b>, mostly taking b/w photos. Theses are some of my photos.
        More can been seen on my Instragram: @heytitle.
    </p>
  </Layout>
}

export default About