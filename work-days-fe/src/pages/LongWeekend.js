import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useEffect } from 'react';

/** TO DOS HERE
 *  fare intersezione tra le chiamate longWeekend e nationalHolidays
 *  in questo modo posso inserire nella tabella anche il nome della
 *  festività
 *  oss: posso filtrare eguagliando startDate o endDate
 */

const LongWeekend = (props) => {
    const { baseURL, 
            giorni
    } = props

    const [year, setYear] = useState(new Date().getFullYear())
    const [res, setRes] = useState('')
    const [startDate, setStartDate] = useState(new Date())

    function longWeekend() {
        const tmp = startDate.getFullYear()
        console.log(tmp);
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
        const dataInizio = new Date(startDate)
        const dataFine = new Date(endDate)
        const giornoFerie = needBridgeDay ? needBridgeDay === true ? 'Sì' : 'No' : 'No'
        return {
            inizio: `${startDate} - ${giorni.find(el => dataInizio.getDay() === el.value).name}`,
            fine: `${endDate} - ${giorni.find(el => dataFine.getDay() === el.value).name}`,
            // giornoFerie: JSON.stringify(needBridgeDay)
            giornoFerie
        }
    }) : ''

    useEffect(() => {
        console.log(startDate);
        setYear(startDate.getFullYear())
    }, [startDate])

    useEffect(() => {
        longWeekend()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Card border='primary'>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col sm={2}>
                                <Button variant="primary" onClick={longWeekend}>Weekend lunghi (Italy only)</Button>
                            </Col>
                            <Col sm={5}>                            
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showYearPicker
                                    dateFormat='yyyy'
                                    style={{ width: '40px' }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
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