import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.scss';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
//import { Form, FormControl } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

export default function CreateLogin(props) {
  const [userName, setUserName] = useState('');
  const [passWord, setPassword] = useState('');
  const [confirmMsg, setConfirmMsg] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const registration = {
    username: userName,
    password: passWord
  };

  async function addNewUser() {
    const response = await axios.post(`/api/register`, registration);
    return response;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setConfirmMsg('');
    if (userName !== '' && passWord !== '') {
      addNewUser().then((response) => {
        setUserName(response.data);
        setConfirmed(true);
        setConfirmMsg('Welcome!  Please log in.');
      });
    } else {
      setConfirmMsg('Oops - please enter a username and password to register!');
    }
  }

  useEffect(() => {
    if (confirmed) {
      setConfirmMsg(`Welcome, ${userName}!  You may now log in.`);
    }
  }, [confirmed, userName]);

  return (
    <div
      className='container_createlogin'
      style={{
        backgroundColor: props.theme === 'light' ? 'white' : '#02024b',
        color: props.theme === 'dark' ? 'white' : '#02024b'
      }}
    >
      <Link
        to='/'
        className={
          props.theme === 'light'
            ? 'nav_link--createlogin'
            : 'nav_link--createlogin--dark'
        }
      >
        {' '}
        ← Back
      </Link>

      <Form
        className='createlogin_form'
        onSubmit={(event) => handleSubmit(event)}
      >
        <Form.Group
          className='createlogin_username'
          controlId='formBasicUsername'
        >
          <Form.Label>
            Login Username (this will also be your screenname)
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='login username'
            onChange={(event) => setUserName(event.target.value)}
            value={userName}
            style={{
              backgroundColor: props.theme === 'light' ? 'white' : '#02024b',
              color: props.theme === 'dark' ? 'white' : '#02024b'
            }}
          />
        </Form.Group>

        <Form.Group
          className='createlogin_password'
          controlId='formBasicPassword'
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='password'
            onChange={(event) => setPassword(event.target.value)}
            value={passWord}
            style={{
              backgroundColor: props.theme === 'light' ? 'white' : '#02024b',
              color: props.theme === 'dark' ? 'white' : '#02024b'
            }}
          />
        </Form.Group>
        <Button
          className='createlogin_button'
          type='submit'
          variant={props.theme === 'light' ? 'secondary' : 'light'}
        >
          Register
        </Button>
      </Form>

      {confirmed ? confirmMsg : ''}
    </div>
  );
}
