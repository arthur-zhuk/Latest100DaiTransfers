// connectToDatabase()
// .then((database)  => {
//     return getUser(database, 'email@email.com')
//     .then(user => {
//         return getUserSettings(database, user.id)
//         .then(settings => {
//             return setRole(database, user.id, "ADMIN")
//             .then(success => {
//                 return notifyUser(user.id, "USER_ROLE_UPDATED")
//                 .then(success => {
//                     return notifyAdmins("USER_ROLE_UPDATED")
//                 })
//             })
//         })
//     })
// })

const connectToDb = async () => {
  const database = await connectToDatabase()
  const user = await getUser(database, "email@email.com")
  await getUserSettings(database, user.id)
  await setRole(database, user.id, "ADMIN")
  await notifyUser(user.id, "USER_ROLE_UPDATED")
  await notifyAdmins("USER_ROLE_UPDATED")
}
