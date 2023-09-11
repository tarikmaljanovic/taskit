'use client'
import './navbar.scss';
import Image from 'next/image';
import Logo from '../public/Logo.png';
import Logo2 from '../public/Logo2.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { ClickAwayListener } from '@mui/base';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Navbar(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [dropdown, setDropdown] = useState(false)
  const router = useRouter()
  

  return (
    <>
      <div className='container'>
        <Image className='desktop-logo' src={Logo.src} width={180} height={40} alt='Taskit Logo'></Image>
          <Image className='mobile-logo' src={Logo2.src} width={40} height={80} alt='Taskit Logo'></Image>
          <ClickAwayListener onClickAway={() => setDropdown(false)}>
            <div className='user-section'>
              <p onClick={() => setDropdown(!dropdown)} className='user-name'>{user.first_name} {user.last_name}</p>
              <AccountCircleIcon onClick={() => setDropdown(!dropdown)} className='user-icon'/>
              <MenuIcon className='hamburger-menu'/>
              {dropdown ? (<div className={`dropdown ${dropdown ? '' : 'hidden'}`}>
                <p onClick={() => {
                  router.push('/profile')
                }} className='dropdown-item'>My Profile</p>
                <p onClick={() => {
                  router.push('/')
                  localStorage.removeItem('user')
                }} className='dropdown-item'>Log out</p>
              </div>) : null}
            </div>
          </ClickAwayListener>
      </div>
    </>
  )
}