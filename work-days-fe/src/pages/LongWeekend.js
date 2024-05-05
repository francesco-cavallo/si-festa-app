import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

/** TO DOS HERE
 *  fare intersezione tra le chiamate longWeekend e nationalHolidays
 *  in questo modo posso inserire nella tabella anche il nome della
 *  festività
 *  oss: posso filtrare eguagliando startDate o endDate
 */

const LongWeekend = (props) => {
    const { baseURL } = props
    const currentYear = new Date().getFullYear()
    const [year, setYear] = useState(currentYear)
    const [res, setRes] = useState('')
    const handleChange = e => {
        const target = e.target
        setYear(target.value)
    }
    function longWeekend() {
        fetch(`${baseURL}/longWeekend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year })
        })
            .then(data => data.json())
            .then(json => {
                setRes(json)
            })
    }
    const data = res && res.length ? res.map(elem => {
        const { startDate, endDate, needBridgeDay } = elem
        return {
            inizio: startDate,
            fine: endDate,
            giornoFerie: JSON.stringify(needBridgeDay)
        }
    }) : ''
    return (
        <>
            <Card border='primary'>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col sm>
                                <Button variant="primary" onClick={longWeekend}>Weekend lunghi (Italy only)</Button>
                                <table>
                                    <input type={'text'} name={"anno"} value={year} maxLength={4} onChange={handleChange} />
                                    {/* <button onClick={availableCountries}>availableCountries (first only)</button> */}
                                </table>
                                <Table>
                                    <thead>
                                        <tr>
                                            {/* GIORNO | NOME */}
                                            <th key={'inizio'}>INIZIO</th>
                                            <th key={'fine'}>FINE</th>
                                            <th key={'giornoFerie'}>GIORNO DI FERIE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.length ?
                                        data.map(festa => {
                                            return <tr>
                                                <td key={'inizio'}>{festa.inizio}</td>
                                                <td key={'fine'}>{festa.fine}</td>
                                                <td key={'giornoFerie'}>{festa.giornoFerie}</td>
                                            </tr>
                                        })
                                        : undefined}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </>
    )
}

export default LongWeekend