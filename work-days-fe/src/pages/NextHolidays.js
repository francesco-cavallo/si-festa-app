import { useEffect, useState } from "react";
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import moment from 'moment'
import 'moment/locale/it'

const NextHolidays = (props) => {
    const {
        giorni,
        baseURL
    } = props
    const [res, setRes] = useState('')
    function nextHolidays() {
        fetch(`${baseURL}/nextPublicHolidays`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: 'it'
        })
            .then(data => data.json())
            .then(json => {
                setRes(json.slice(0, 5))
            })
    }
    // GetData
    useEffect(()=>{
        nextHolidays()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const data = res && res.length ? res.map(elem => {
        moment.locale('it')
        elem.dataF = moment(elem.date).format('L')
        elem.giorno = giorni.find(el => new Date(elem.date).getDay() === el.value).name
        return elem
    }) : ''
    console.log('data', data);
    return(
        <>
            <Container fluid>
                {/* Title */}
                <Row>   
                    <Col>
                        <h3>{"Prossime feste restituisce l'elenco delle prossime cinque festività italiane, a partire dal giorno corrente"}</h3>
                    </Col>
                </Row>
                {/* Blank space */}
                <Row>
                    <Col><p></p></Col>
                </Row>
                {/* Button to call API - I don't need a button */}
                {/* <Col lg={3} md={4} sm={12} xs={12}>
                    <Button variant="primary" onClick={nextHolidays}>Prossime feste (Italy only)</Button>
                </Col> */}
                {/* Blank space */}
                <Row>
                    <Col><p></p></Col>
                </Row>
                {/* Table */}
                <Row>
                    <Col>
                        <Table responsive>
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
                                        <td key={'inizio'}>{festa.dataF + ' - ' + festa.giorno}</td>
                                        <td key={'fine'}>{festa.localName}</td>
                                    </tr>
                                })
                                : undefined}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NextHolidays 