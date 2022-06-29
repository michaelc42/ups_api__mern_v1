// const login = async (email, password) => {
//   const api_url = 'http://localhost:3001/api/v1/auth/login'
//   // const loginData = {
//   //   name: "test",
//   //   email: "mike1@yahoo.com",
//   //   password: "123456"
//   // }

  
//   let data
//   const loginData = {
//     email: email,
//     password: password
//   }
//   try {
//     const request = await fetch(api_url, {
//       method: 'POST', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(loginData),
//     })
//     const json = await request.json()
//     return await json
//   } catch (error) {
//     return error
//   }
// }

// export default login