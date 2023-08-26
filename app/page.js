'use server'
import LoginUI from "./landing_page"
import { Login, Signup } from "./api/login_signup"

export default async function LoginPage() {

  return (
    <>
      <LoginUI
        login={Login}
        signup={Signup}
      />
    </>
  )
}
