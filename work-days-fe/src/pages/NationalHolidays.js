import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const NationalHolidays = (props) => {
    const { baseURL,
            giorni
     } = props
    const currentYear = new Date().getFullYear()
    const [year, setYear] = useState(currentYear)
    const [res, setRes] = useState('')
    const [startDate, setStartDate] = useState(new Date())

    function publicHolidays() {
        const tmp = startDate.getFullYear()
        console.log(tmp);
        fetch(`${baseURL}/publicHolidays`, {
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
        const { date, localName } = elem
        const data = new Date(date)
        return {
            giorno: `${date} - ${giorni.find(el => data.getDay() === el.value).name}`,
            nome: localName
        }
    }) : ''
    console.log(data)
    useEffect(() => {
        console.log(startDate);
        setYear(startDate.getFullYear())
    }, [startDate])

    useEffect(() => {
        publicHolidays()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Card border='primary'>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col sm={2}>
                                <Button variant="primary" onClick={publicHolidays}>Feste nazionali (Italy only)</Button>
                            </Col>
                            <Col sm={5}>
                            <Container fluid>
                                <Row>
                                    <Col sm={3}>
                                        {"Seleziona l'anno: "}
                                    </Col>
                                    <Col sm={1}>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showYearPicker
                                            dateFormat='yyyy'
                                            style={{ width: '40px' }}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm>
                                <Table>
                                    <thead>
                                        <tr>
                                            {/* GIORNO | NOME */}
                                            <th key={'giorno'}>GIORNO</th>
                                            <th key={'nome'}>NOME</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.length ?
                                        data.map(festa => {
                                            return <tr>
                                                <td key={'giorno'}>{festa.giorno}</td>
                                                <td key={'nome'}>{festa.nome}</td>
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

export default NationalHolidays