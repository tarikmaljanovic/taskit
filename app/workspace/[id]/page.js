'use server'
import WorkspaceUI from "./workspace"
import { GetWorkspace, GetProjects, CreateProject, UpdateWorkspace } from "@/app/api/workspace"

export default async function Workspace({ params }) {
  return(
    <>
      <WorkspaceUI
        id={params.id}
        getWorkspace={GetWorkspace}
        getProjects={GetProjects}
        createProject={CreateProject}
        updateWorkspace={UpdateWorkspace}
      />
    </>
  )
}