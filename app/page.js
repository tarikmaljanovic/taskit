'use server'
import Home1 from "./comp"
import { Login, Register } from "./api/routes"

export default async function LoginPage() {

  return (
    <>
      <Home1
        user={await Login()}
        register={Register}
      />
    </>
  )
}
