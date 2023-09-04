'use client'
import './landing_page.scss'
import { FormHelperText, FormControl, InputLabel, Input, IconButton, InputAdornment, Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Logo from './public/Logo.png'

export default function LoginUI(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showSignupError, setShowSignupError] = useState(false)
  const loginRef = useRef()
  const signupRef = useRef()
  const router = useRouter()


  return (
    <>
      <div className='container'>
        <Image src={Logo.src} width={200} height={50} alt='Taskit Logo'></Image>
        <div ref={loginRef} className={`inner ${showSignup ? 'is-hidden' : ''}`}>
          <FormControl className='input' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <Input
              error = {showError}
              id="outlined-adornment-email"
              type={'text'}
              label="Email"
            />
          </FormControl>
          <FormControl className='input' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <Input
              error = {showError}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className='buttons'>
            <Button className='primary-button' variant='contained' onClick={() => {
              console.log(loginRef.current.children)
              props.login({
                email: loginRef.current.children[0].children[1].children[0].value,
                pass: loginRef.current.children[1].children[1].children[0].value
              }).then(res => {
                if(res == false) {
                  setShowError(true)
                } else {
                  localStorage.setItem('user', JSON.stringify(res))
                  router.push('/workspaces', {scroll: false})
                }
              })
            }}>Login</Button>
            <Button className='secondary-button' variant='text' onClick={() => {setShowSignup(true); setShowError(false)}}>Signup</Button>
          </div>
          {showError ? <FormHelperText className='error-msg' error children='Incorrect Email or Password'/> : ''}
        </div>
        <div ref={signupRef} className={`inner ${showSignup ? '' : 'is-hidden'}`}>
          <FormControl className='input' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-fname">First Name</InputLabel>
            <Input
              error={showError || showSignupError}
              id="outlined-adornment-fname"
              type={'text'}
              label="First Name"
            />
          </FormControl>
          <FormControl className='input' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-lname">Last Name</InputLabel>
            <Input
              error={showError || showSignupError}
              id="outlined-adornment-lname"
              type={'text'}
              label="Last Name"
            />
          </FormControl>
          <FormControl className='input' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <Input
              error={showError || showSignupError}
              id="outlined-adornment-email"
              type={'text'}
              label="Email"
            />
          </FormControl>
          <FormControl className='input' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <Input
              error={showError || showSignupError}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className='buttons'>
            <Button className='primary-button' variant='contained' onClick={() => {
              const signupForm = {
                first_name: signupRef.current.children[0].children[1].children[0].value,
                last_name: signupRef.current.children[1].children[1].children[0].value,
                email: signupRef.current.children[2].children[1].children[0].value,
                pass: signupRef.current.children[3].children[1].children[0].value
              }
              if(signupForm.first_name && signupForm.last_name && signupForm.email && signupForm.pass) {
                props.signup(signupForm).then(res => {
                  if(res == false) {
                    setShowSignupError(true)
                  } else {
                    localStorage.setItem('user', JSON.stringify(res))
                    router.push('/workspaces', {scroll: false});
                  }
                })
              } else {
                setShowError(true)
              }
            }}>Signup</Button>
            <Button className='secondary-button' variant='text' onClick={() => {setShowSignup(false); setShowError(false)}}>Login</Button>
          </div>
          {showError ? <FormHelperText className='error-msg' error children='Please fill out all the Fields'/> : ''}
          {showSignupError ? <FormHelperText className='error-msg' error children='This Email is already in use'/> : ''}
        </div>
      </div>
    </>
  )
}