import React from "react"
import SEO from "../components/seo";
import Layout from "../components/layout";

import IconBosna from "../images/icons/sc-bosna-berlin.png"
import IconRotation from "../images/icons/sg-rotation-prenzlauer-berg.png"
import IconPusphaira from "../images/icons/pusphaira.png"
import OutLink from "../components/outlink";

const Header = ({children}) => {
    return <h3 css={{marginBottom: "20px"}}>
        {children}
    </h3>
}

const TeamIcon = ({icon}) => {
    return <img css={{width: "50px", verticalAlign: "middle", marginBottom: "0px", paddingRight: "5px"}} src={icon}/>
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
    <ul css={{listStyle: "none"}}>
        <li>
            <TeamIcon icon={IconBosna}/><OutLink href="http://www.fussball.de/verein/sc-bosna-berlin-berlin/-/id/01OE5U5FUG000000VV0AG80NVUVDNPJM">SC Bosna Berlin</OutLink>, Germany: Berlin's Keisliga C 2018/19
        </li>
        <li>
            <TeamIcon icon={IconRotation}/><OutLink href="">SG Rotitaion Prenzlauer</OutLink>, Berlin Germany: Freizeitliga 2017/2018
        </li>
        <li>
            <TeamIcon icon={IconPusphaira}/><OutLink href="">Pusphaira 6</OutLink>, Eindhoven, the Netherlands: Sunday Leaguage 2015/2016
        </li>
    </ul>
    </p>
    <p>
        I also enjoy <b>Photography</b>, mostly taking b/w photos. Theses are some of my photos.
        More can been seen on my Instragram: <OutLink href="https://www.instagram.com/heytitle/">@heytitle</OutLink>.
    </p>
  </Layout>
}

export default About