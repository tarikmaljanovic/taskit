'use server'
import WorkspacesUI from "./workspaces"
import { GetWorkspaces, CreateWorkspace } from "../api/workspaces"

export default async function WorkspacesPage() {
  return (
    <>
      <WorkspacesUI
        getWorkspaces={GetWorkspaces}
        createWorkspace={CreateWorkspace}
      />
    </>
  )
}