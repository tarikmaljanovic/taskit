'use server'
import WorkspaceUI from "./workspace"

export default async function Workspace({ params }) {
  return(
    <>
      <WorkspaceUI
        id={params.id}
      />
    </>
  )
}