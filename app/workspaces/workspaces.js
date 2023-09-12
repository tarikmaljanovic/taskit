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
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [dropdown, setDropdown] = useState(0)
  const [currentWorkspace, setCurrentWorkspace] = useState(0)
  const [leaveDialog, setLeaveDialog] = useState(false)
  const [joinAlert, setJoinAlert] = useState(false)
  const [failedJoinAlert, setFailedJoinAlert] = useState(false)
  const nameField = useRef()
  const limitField = useRef()
  const idField = useRef()

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
              <div className={`workspace is-${item.color}`} key={item.id}>
                <p className='name'>{item.name}</p>
                <p className='member-limit'><span className='tag'>Member Limit: </span>{item.member_limit}</p>
                  <MoreVertIcon onClick={(event) => {setDropdown(item.id); event.stopPropagation()}} />
                    {
                      dropdown == item.id ? (
                        <ClickAwayListener onClickAway={() => setDropdown(0)}>
                          <div className='dropdown'>
                            <p onClick={(event) => {
                              setCurrentWorkspace(item.id)
                              setLeaveDialog(true)
                              event.stopPropagation()
                            }}>Leave Workspace</p>
                            {
                              item.admin_email == user.email ? (
                                <p className='delete' onClick={(event) => {
                                  setDeleteDialog(true)
                                   setCurrentWorkspace(item.id)
                                    event.stopPropagation()
                                  }}>Delete Workspace</p>
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
            ref={idField}
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
            <Button onClick={() => props.joinWorkspace(user.id, idField.current.children[1].children[0].value).then(res => {
              if(res != false) {
                props.getWorkspaces(user.id).then(res => {
                  updateWorkspaces(res)
                })
                setJoinAlert(true)
              } else {
                setFailedJoinAlert(true)
              }
            })}>Join Workspace</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog className='delete-workspace' open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle className='dialog-title'>Delete Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you shure you want to delete this workspace?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => {
              props.deleteWorkspace(currentWorkspace)
              props.getWorkspaces(user.id).then(res => {
                updateWorkspaces(res)
              })
              setDeleteDialog(false)
              setCurrentWorkspace(0)
            }} variant='outlined' color='error'>Delete</Button>
            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog className='leave-workspace' open={leaveDialog} onClose={() => setLeaveDialog(false)}>
        <DialogTitle className='dialog-title'>Leave Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to leave this Workspace? Your admin privilages remain if you rejoin.
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => {
              props.leaveWorkspace(user.id, currentWorkspace)
              props.getWorkspaces(user.id).then(res => {
                updateWorkspaces(res)
              })
              setLeaveDialog(false)
              setCurrentWorkspace(0)
            }} variant='outlined' color='error'>Leave</Button>
            <Button onClick={() => setLeaveDialog(false)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar open={alert} onClose={() => setAlert(false)} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert severity="success" sx={{ width: '100%' }}>
          You have successfully created a Workspace!
        </Alert>
      </Snackbar>
      <Snackbar open={joinAlert} onClose={() => setJoinAlert(false)} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert severity="success" sx={{ width: '100%' }}>
          You have successfully join a Workspace!
        </Alert>
      </Snackbar>
      <Snackbar open={failedJoinAlert} onClose={() => setFailedJoinAlert(false)} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert severity="error" sx={{ width: '100%' }}>
          Failed to join the Workspace!
        </Alert>
      </Snackbar>

    </>
  )
}