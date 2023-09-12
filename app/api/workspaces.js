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

export async function DeleteWorkspace(workspace_id) {
  (await connection).execute(`DELETE FROM user_workspaces WHERE workspace_id = ${workspace_id}`)
  return (await connection).execute(`DELETE FROM workspaces WHERE id = ${workspace_id}`)
}

export async function LeaveWorkspace(user_id, workspace_id) {
  return (await connection).execute(`DELETE FROM user_workspaces WHERE user_id = ${user_id} AND workspace_id = ${workspace_id}`)
}

export async function JoinWorkspace(user_id, workspace_id) {
  const entry = (await connection).execute(`SELECT id FROM workspaces WHERE id = ${workspace_id}`)
  const entry2 = (await connection).execute(`SELECT id FROM user_workspaces WHERE user_id = ${user_id} AND workspace_id = ${workspace_id}`)
  if((await entry)[0][0] != undefined && (await entry2)[0][0] == undefined) {
    return (await connection).execute(`INSERT INTO user_workspaces (user_id, workspace_id) VALUES (${user_id}, ${workspace_id})`)
  } else {
    return false
  }
}
