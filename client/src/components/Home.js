import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

export default function Home(props) {
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [error, setError] = useState('');

  let history = useHistory();

  const loginObj = {
    username: usernameInputValue,
    password: passwordInputValue
  };

  async function login() {
    try {
      var search = await axios.post('api/login', loginObj);
      return search;
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick(event) {
    event.preventDefault();
    if (usernameInputValue !== '' && passwordInputValue !== '') {
      login().then((res) => {
        if (res.data[3]) {
          const userId = res.data[1];
          const username = res.data[2];
          localStorage.setItem(`userId`, `${userId}`);
          localStorage.setItem(`username`, `${username}`);
          history.push('/chat');
        } else {
          setError('sorry, something went wrong!  Please try again.');
        }
      });
    } else {
      setError('User not found...please try again.');
    }
  }

  return (
    <div className='container_home'>
      <div className='container'>
        <h1 className='title'>Let's Chat, Day-2-Nite.</h1>
        <p className='title_login'>Please Login</p>

        <form>
          <div className='container_input'>
            <input
              type='text'
              placeholder='username'
              value={usernameInputValue}
              onChange={(event) => setUsernameInputValue(event.target.value)}
              style={{
                backgroundColor: props.theme === 'light' ? 'white' : '#02024b',
                color: props.theme === 'light' ? '#313131' : 'white'
              }}
            ></input>
            <input
              type='password'
              placeholder='password'
              value={passwordInputValue}
              onChange={(event) => setPasswordInputValue(event.target.value)}
              style={{
                backgroundColor: props.theme === 'light' ? 'white' : '#02024b',
                color: props.theme === 'light' ? '#313131' : 'white'
              }}
            ></input>
          </div>
          <Button
            className='button_home'
            variant='outline-warning'
            onClick={handleClick}
          >
            Log In
          </Button>

          <Button className='button_home' variant='outline-warning'>
            <Link to='/createlogin' className='nav_link'>
              Register
            </Link>
          </Button>
        </form>
      </div>
    </div>
  );
}
