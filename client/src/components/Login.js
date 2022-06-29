import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import { Button, Row, Col } from 'react-bootstrap'

//const LOGIN_URL = window.location.origin + '/api/v1/auth/login';



const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [validated, setValidated] = useState(false)

  useEffect(() => {
      emailRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget

    try {
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"email":email, "password":pwd}),
        })
        const jsonData = await response.json()
        const accessToken = jsonData?.token
        const roles = jsonData?.roles
        const username = jsonData?.user
        const name = jsonData?.name
        const address = jsonData?.address
        const city = jsonData?.city
        const country = jsonData?.country
        const state = jsonData?.state 
        const zipCode = jsonData?.zipCode
        const phone = jsonData?.phone
        setAuth({
          email, username, pwd, roles,
          accessToken, name, address, city,
          country, state, zipCode, phone
        });
        setEmail('');
        setPwd('');
        // navigate(from, { replace: true });
        navigate('/home')
      }
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
  }
  return (
  <>
    <div className="">
      <h2>Please Login</h2>

      <Form noValidate validated={validated} className="" onSubmit={handleSubmit}>
        <div className='d-inline-flex'>
          <Form.Group className="me-4" controlId="validationCustom01">
            <Form.Label className="text-start m-0">Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="name@example.com"
              className=""
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">Please enter email</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="me-4" controlId="validationCustom02">
            <Form.Label className="text-start m-0">Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e)=>setPwd(e.target.value)}   
            />
          </Form.Group>
        </div>
        <div className="d-flex align-items-center">
          <Button className="mt-2 me-5" type="submit">Submit</Button>
          <h5 className='m-0 ms-5 text-danger' desc="Error Message" ref={errRef}>{errMsg && `Error: ${errMsg}` }</h5>
        </div>
      </Form>
    </div>

    </>
  )
}

export default Login