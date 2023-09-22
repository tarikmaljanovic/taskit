'use client'
import './workspace.scss'
import Navbar from "@/app/components/navbar"
import SettingsIcon from '@mui/icons-material/Settings'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function WorkspaceUI(props) {
  return (
    <>
      <Navbar />
      <div className="workspace-container">
        <div className="tool-bar">
          <p className="workspace-name">Name Here</p>
          <SettingsIcon />
        </div>
        <div className="projects-container">
          <div className='project-card'>
            <div className='upper'>
              <p className='project-name'>Project Name</p>
              <MoreVertIcon/>
            </div>
            <ul className='task-count'>
              <li className='unfinished'>0 Unfinished</li>
              <li className='in-progress'>0 In Progres</li>
              <li className='finished'>0 Finished</li>
            </ul>
          </div>
          <div className='project-card'>
            <div className='upper'>
              <p className='project-name'>Project Name</p>
              <MoreVertIcon/>
            </div>
            <ul className='task-count'>
              <li className='unfinished'>0 Unfinished</li>
              <li className='in-progress'>0 In Progres</li>
              <li className='finished'>0 Finished</li>
            </ul>
          </div>
          <div className='project-card'>
            <div className='upper'>
              <p className='project-name'>Project Name</p>
              <MoreVertIcon/>
            </div>
            <ul className='task-count'>
              <li className='unfinished'>0 Unfinished</li>
              <li className='in-progress'>0 In Progres</li>
              <li className='finished'>0 Finished</li>
            </ul>
          </div>
          <div className='project-card'>
            <div className='upper'>
              <p className='project-name'>Project Name</p>
              <MoreVertIcon/>
            </div>
            <ul className='task-count'>
              <li className='unfinished'>0 Unfinished</li>
              <li className='in-progress'>0 In Progres</li>
              <li className='finished'>0 Finished</li>
            </ul>
          </div>
          <div className='project-card'>
            <div className='upper'>
              <p className='project-name'>Project Name</p>
              <MoreVertIcon/>
            </div>
            <ul className='task-count'>
              <li className='unfinished'>0 Unfinished</li>
              <li className='in-progress'>0 In Progres</li>
              <li className='finished'>0 Finished</li>
            </ul>
          </div>
          <div className='project-card'>
            <div className='upper'>
              <p className='project-name'>Project Name</p>
              <MoreVertIcon/>
            </div>
            <ul className='task-count'>
              <li className='unfinished'>0 Unfinished</li>
              <li className='in-progress'>0 In Progres</li>
              <li className='finished'>0 Finished</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}