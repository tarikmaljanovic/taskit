'use client'
import './workspace.scss'
import Navbar from "@/app/components/navbar"
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Snackbar, Alert } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WorkspaceUI(props) {
  const [workspace, updateWorkspace] = useState({})
  const [projects, updateProjects] = useState([])
  const [dialogs, setDialogs] = useState({
    create_project: false,
    workspace_settings: false
  })
  const [snackBars, setSnackbars] = useState({
    noProjectName: false,
    projectCreationSuccess: false
  })
  const project_name = useRef()
  const router = useRouter()
  

  useEffect(() => {
    props.getWorkspace(props.id).then(res => {
      updateWorkspace(res)
    })
  }, [])

  useEffect(() => {
    props.getProjects(props.id).then(res => {
      updateProjects(res)
    })
  }, [])

  return (
    <>
      <Navbar />
      <div className="workspace-container">
        <div className="tool-bar">
          <p className="workspace-name">{workspace.name}</p>
          <SettingsIcon onClick={() => setDialogs({...dialogs, workspace_settings: true})} />
        </div>
        <div className="projects-container">
          {
            projects.map(item => {
              return (
                <div onClick={() => router.push(`/project/${item.id}`)} className='project-card' key={item.id}>
                  <div className='upper'>
                    <p className='project-name'>{item.name}</p>
                  </div>
                  <ul className='task-count'>
                    <li className='unfinished'>{item.project_tasks_count.Unfinished} Unfinished</li>
                    <li className='in-progress'>{item.project_tasks_count.In_Progress} In Progres</li>
                    <li className='finished'>{item.project_tasks_count.Finished} Finished</li>
                  </ul>
                </div>
              )
            })
          }
          <div onClick={() => setDialogs({...dialogs, create_project: true})} className='project-card add-card'>
            <AddIcon />
          </div>
        </div>
      </div>
      <Dialog open={dialogs.create_project} onClose={() => setDialogs({...dialogs, create_project: false})}>
        <DialogTitle className='dialog-title'>
          Create a new Project
        </DialogTitle>
        <DialogContent>
          <TextField
              ref={project_name}
              margin="dense"
              id="project_name"
              label="Project Name"
              type="text"
              fullWidth
              required
              variant="standard"
              error={snackBars.noProjectName}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            if(project_name.current.children[1].children[0].value == '') {
               setSnackbars({...snackBars, noProjectName: true}) 
              } else { 
                props.createProject({name: project_name.current.children[1].children[0].value, workspace_id: props.id})
                props.getProjects(props.id).then(res => {
                  updateProjects(res)
                })
                setDialogs({...dialogs, create_project: false})
                setSnackbars({...snackBars, projectCreationSuccess: true})
          }}} variant='outlined'>Create</Button>
          <Button onClick={() => setDialogs({...dialogs, create_project: false})}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackBars.noProjectName} onClose={() => setSnackbars({...snackBars, noProjectName: false})} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert severity="error" sx={{ width: '100%' }}>
          Please give your Project a name!
        </Alert>
      </Snackbar>
      <Snackbar open={snackBars.projectCreationSuccess} onClose={() => setSnackbars({...snackBars, projectCreationSuccess: false})} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert severity="success" sx={{ width: '100%' }}>
          You have successfully created a new Project!
        </Alert>
      </Snackbar>
      <Dialog open={dialogs.workspace_settings} onClose={() => setDialogs({...dialogs, workspace_settings: false})}>
        <DialogTitle className='dialog-title'>Workspace Settings</DialogTitle>
        <DialogContent>
          <TextField
              margin="dense"
              id="workspace_name"
              label="Workspace Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="admin_email"
              label="Admin Email"
              type="text"
              fullWidth
              variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='error'>Delete Workspace</Button>
          <Button variant='outlined'>Save Changes</Button>
          <Button onClick={() => setDialogs({...dialogs, workspace_settings: false})}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}