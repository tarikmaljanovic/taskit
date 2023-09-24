'use server'

import connection from "./db"

export async function GetWorkspace(workspace_id) {
  const entry = (await connection).execute(`SELECT * FROM workspaces WHERE id = ${workspace_id}`)
  return (await entry)[0][0]
}

export async function GetProjects(workspace_id) {
  const entry = (await connection).execute(`SELECT * FROM project WHERE workspace_id = ${workspace_id}`)
  const projects = []

  for(let project of (await entry)[0]) {
      const project_tasks_count = {
        Unfinished: 0,
        In_Progress: 0,
        Finished: 0
      }
      const tasks = (await connection).execute(`SELECT * FROM tasks WHERE project_id = ${project.id}`)
      
      for(let task of (await tasks)[0]) {
        if(task.status == 'Unfinished') {
          project_tasks_count.Unfinished += 1
        } else if (task.status == 'In Progress') {
          project_tasks_count.In_Progress += 1
        } else if (task.status == 'Finished') {
          project_tasks_count.Finished += 1
        }
      }
      
      project.project_tasks_count = project_tasks_count
      projects.push(project)
      
  }
  return projects
}

export async function CreateProject(project) {
  return (await connection).execute(`INSERT INTO project (name, workspace_id) VALUES ('${project.name}', ${project.workspace_id})`)
}

export async function UpdateWorkspace(workspace) {

}