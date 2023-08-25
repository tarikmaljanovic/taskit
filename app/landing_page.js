'use client'
import './landing_page.scss'
import { TextField, FormControl, InputLabel, Input, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import Image from 'next/image'
import Logo from './public/Logo.png'

export default function LoginUI(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <div className='container'>
        <Image src={Logo.src} width={200} height={100}></Image>
        <div className='inner'>
          <FormControl className='input' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <Input
              id="outlined-adornment-email"
              type={'text'}
              label="Email"
            />
          </FormControl>
          <FormControl className='input' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <Input
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className='buttons'>
            
          </div>
        </div>
      </div>
    </>
  )
}