'use server'

import connection from "./db"

export async function GetWorkspaces(user_id) {
  const workspaces = []
  const workspace_ids = (await connection).execute(`SELECT workspace_id FROM user_workspaces WHERE user_id = ${user_id} `)
  for(let entry of (await workspace_ids)[0]) {
    workspaces.push((await (await connection).execute(`SELECT * FROM workspaces WHERE id = ${entry.workspace_id}`))[0][0])
  }
  return workspaces
}

export async function CreateWorkspace(new_workspace, user_id) {
  const entry = (await connection).execute(`INSERT INTO workspaces (name, member_limit, admin_email, color) VALUES ('${new_workspace.name}', ${new_workspace.member_limit}, '${new_workspace.admin_email}', '${new_workspace.color}')`)
  return (await connection).execute(`INSERT INTO user_workspaces (user_id, workspace_id) VALUES (${user_id}, ${(await entry)[0].insertId})`)
}

export async function DeleteWorkspace() {

}

export async function LeaveWorkspace() {
  
}

export async function JoinWorkspace() {
  
}
