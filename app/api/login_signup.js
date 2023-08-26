'use server'
import connection from './db'

const md5 = require('md5');

export async function Signup(register_user) {
  let user_check = (await connection).execute(`SELECT * FROM users WHERE email = '${register_user.email}'`);
  if((await user_check)[0][0] == undefined) {
    (await connection).execute(`
      INSERT INTO users (first_name, last_name, email, pass)
      VALUES ('${register_user.first_name}', '${register_user.last_name}', '${register_user.email}', '${md5(register_user.pass)}')`
    );
    return (await connection).execute(`SELECT * FROM users WHERE email = '${register_user.email}'`)[0][0];
  } else {
    return false;
  }
}

export async function Login(login_user) {
  let user = (await connection).execute(`SELECT * FROM users WHERE email = '${login_user.email}'`);
  if((await user)[0][0] != undefined) {
    if((await user)[0][0].pass == md5(login_user.pass)) {
      return (await user)[0][0];
    } else {
      return false;
    }
  } else {
    return false;
  }
} 



