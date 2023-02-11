import React,{useState,useEffect} from 'react'
import { Col, Button, Row, Container, Card, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import {useHistory } from 'react-router-dom'
import {login} from '../redux/actions/Auth'
const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')    
    const {isLoggedIn} = useSelector(state => state.auth)
    const {message} = useSelector(state => state.msg)
    const navigate = useHistory()
    useEffect(()=>{
        if(isLoggedIn){
            console.log('isLoggedIn'+isLoggedIn)
            //navigate.push('/admin/dashboard')
        }
        
    },[isLoggedIn])
    
    const dispatch = useDispatch()    
    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password))        
    }
    return(
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>                        
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">React Node Electron CURD APPLICATION</h2>
                                    <div className="border border-3 border-primary mb-1"></div>          
                                    <p className="mb-1">Please enter your login and password!</p>                                                         
                                    <div className="mb-3">                                        
                                        <Form onSubmit={formSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">                                            
                                                <Form.Label className="text-center">Username</Form.Label>
                                                <Form.Control type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)} />
                                            </Form.Group>                                            
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                                                <p className="small">
                                                    <a className="text-primary" href="#!">Forgot password?</a>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">Login</Button>
                                            </div>
                                            {
                                                message
                                            }
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>                    
                </Row>
            </Container>
        </div>
    )
}

export default Login