import React from 'react'
// Bootstrap
import { Card } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className='footer'>
        <Card style={{ textAlign: "center" }}>
            <Card.Footer className="text-muted" >
                Powered by <a href='https://francesco-cavallo.github.io/mio-sito-web/' rel="noopener noreferrer" target='_blank'
                    class="link-dark link-offset-1 link-opacity-50-hover link-underline-opacity-50-hover">
                    Francesco Cavallo
                </a> (and some <a href='https://react.dev' rel="noopener noreferrer"
                    class="link-dark link-offset-1 link-opacity-50-hover link-underline-opacity-50-hover"
                    target='_blank'> React</a>)
            </Card.Footer>
        </Card>
        </footer>
    )
}

export default Footer