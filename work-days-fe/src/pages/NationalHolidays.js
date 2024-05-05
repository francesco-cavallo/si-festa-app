import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const NationalHolidays = (props) => {
    const { baseURL } = props
    const currentYear = new Date().getFullYear()
    const [year, setYear] = useState(currentYear)
    const [res, setRes] = useState('')
    console.log('year', year);
    const handleChange = e => {
        const target = e.target
        setYear(target.value)
    }
    function publicHolidays() {
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
        return {
            giorno: date,
            nome: localName
        }
    }) : ''
    console.log(data)
    return (
        <>
            <Card border='primary'>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col sm>
                                <Button variant="primary" onClick={publicHolidays}>Feste nazionali (2024 - Italy only)</Button>
                                <table>
                                    <input type={'text'} name={"anno"} value={year} maxLength={4} onChange={handleChange} />
                                </table>
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