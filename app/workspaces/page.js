'use server'
import WorkspacesUI from "./workspaces"
import { GetWorkspaces, CreateWorkspace, DeleteWorkspace, LeaveWorkspace, JoinWorkspace } from "../api/workspaces"

export default async function WorkspacesPage() {
  return (
    <>
      <WorkspacesUI
        getWorkspaces={GetWorkspaces}
        createWorkspace={CreateWorkspace}
        deleteWorkspace={DeleteWorkspace}
        leaveWorkspace={LeaveWorkspace}
        joinWorkspace={JoinWorkspace}
      />
    </>
  )
}