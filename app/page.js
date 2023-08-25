'use server'
import LoginUI from "./landing_page"
import { Login, Register } from "./api/login_signup"

export default async function LoginPage() {

  return (
    <>
      <LoginUI
        login={Login}
        register={Register}
      />
    </>
  )
}
