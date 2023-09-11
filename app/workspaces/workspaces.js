'use client'
import './workspaces.scss';
import Navbar from '../components/navbar';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Snackbar, Alert } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ClickAwayListener } from '@mui/base';
import { useEffect, useRef, useState } from 'react';

export default function WorkspacesUI(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [workspaces, updateWorkspaces] = useState([])
  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState('')
  const [alert, setAlert] = useState(false)
  const [joinDialog, setJoinDialog] = useState(false)
  const [dropdown, setDropdown] = useState(0)
  const nameField = useRef()
  const limitField = useRef()
  const idk = useRef()

  const new_workspace = {
    name: '',
    member_limit: 0,
    admin_email: user.email,
    color: ''
  }

  useEffect(() => {
    props.getWorkspaces(user.id).then(res => {
      updateWorkspaces(res)
    })
  }, [])

  return (
    <>
      <Navbar />
      <div className='title-bar'>
        <p className='title'>Workspaces</p>
        <div className='buttons'>
          <Button className='button' variant="contained" onClick={() => setOpen(true)}>Create Workspace</Button>
          <Button className='button' variant="contained" onClick={() => setJoinDialog(true)}>Join Workspace</Button>
        </div>
      </div>
      <div className='workspace-list'>
        {
          workspaces.map(item => {
            return (
              <div onClick={() => console.log('hello')} className={`workspace is-${item.color}`} key={item.id}>
                <p className='name'>{item.name}</p>
                <p className='member-limit'><span className='tag'>Member Limit: </span>{item.member_limit}</p>
                  <MoreVertIcon onClick={(event) => {setDropdown(item.id); event.stopPropagation()}} />
                    {
                      dropdown == item.id ? (
                        <ClickAwayListener onClickAway={() => setDropdown(0)}>
                          <div className='dropdown'>
                            <p>Leave Workspace</p>
                            {
                              item.admin_email == user.email ? (
                                <p className='delete'>Delete Workspace</p>
                              ) : null
                            }
                          </div>
                        </ClickAwayListener>
                      ) : null
                    }
              </div>
            )
          })
        }
      </div>
      <Dialog className='create-workspace' open={open} onClose={() => setOpen(false)}>
        <DialogTitle className='dialog-title'>New Workspace</DialogTitle>
        <DialogContent className='create-dialog'>
          <DialogContentText>
            Create your brand new Workspace...
          </DialogContentText>
          <TextField
            ref={nameField}
            autoFocus
            margin="dense"
            id="name"
            label="Workspace Name"
            type="text"
            fullWidth
            required
            variant="standard"
          />
          <TextField
            ref={limitField}
            margin="dense"
            id="limit"
            label="Member Limit"
            type="number"
            inputProps={{min: 1, max: 100}}
            fullWidth
            required
            variant="standard"
          />
          <div className='color-picker'>
            <div onClick={() => {setSelect('violet')} } className={`color-option ${select != 'violet' ? 'not-selected' : ''}`}>
            </div>
            <div onClick={() => {setSelect('blue')} } className={`color-option ${select != 'blue' ? 'not-selected' : ''}`}>
            </div>
            <div onClick={() => {setSelect('red')} } className={`color-option ${select != 'red' ? 'not-selected' : ''}`}>
            </div>
            <div onClick={() => {setSelect('green')} } className={`color-option ${select != 'green' ? 'not-selected' : ''}`}>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}}>Cancel</Button>
          <Button onClick={() => {
            new_workspace.name = nameField.current.children[1].children[0].value
            new_workspace.member_limit = limitField.current.children[1].children[0].value
            new_workspace.color = select
            props.createWorkspace(new_workspace, user.id)
            props.getWorkspaces(user.id).then(res => {
              updateWorkspaces(res)
            })
            setOpen(false)
            setAlert(true)
            }}>Create Workspace
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog className='join-workspace' open={joinDialog} onClose={() => setJoinDialog(false)}>
        <DialogTitle className='dialog-title'>Join Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Join a workspace by entering its ID number...
          </DialogContentText>
          <TextField
            margin="dense"
            id="id"
            label="Workspace ID"
            type="number"
            inputProps={{min: 1}}
            fullWidth
            required
            variant="standard"
          />
          <DialogActions>
            <Button>Join Workspace</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar open={alert} onClose={() => setAlert(false)} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert severity="success" sx={{ width: '100%' }}>
          You have successfully created a Workspace!
        </Alert>
      </Snackbar>

    </>
  )
}