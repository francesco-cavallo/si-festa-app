import React from 'react'
// Bootstrap
import { Card } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
        <Card>
            <Card.Footer>
                Powered by <a href='https://francesco-cavallo.github.io/mio-sito-web/' rel="noopener noreferrer" target='_blank'
                    className="link-dark link-offset-1 link-opacity-50-hover link-underline-opacity-50-hover">
                    Francesco Cavallo
                </a> (and some <a href='https://react.dev' rel="noopener noreferrer"
                    className="link-dark link-offset-1 link-opacity-50-hover link-underline-opacity-50-hover"
                    target='_blank'> React</a>)
            </Card.Footer>
        </Card>
        </footer>
    )
}

export default Footer