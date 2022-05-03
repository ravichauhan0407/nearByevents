import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const Footer = () => {
  return (
    <div className='footer'>
        <div>
        <div className='ravi'>@ravichauhan0407</div>
        <Row className="justify-content-center" xs="auto">
            <Col><a href="https://www.instagram.com/ravichauhan0407/" target="_blank" rel="noopener"><InstagramIcon/></a></Col>
            <Col><a href="https://www.linkedin.com/in/ravi-chauhan-b6ab3919a/" target="_blank" rel="noopener"><LinkedInIcon/></a></Col>
            <Col><a href="https://github.com/ravichauhan0407" target="_blank" rel="noopener"><GitHubIcon/></a></Col>
        </Row>
        </div>
    </div>
  )
}

export default Footer