const connectToDb = async () => {
  const USER_ROLE_UPDATED = "USER_ROLE_UPDATED" // const to avoid magic strings

  try {
    const database = await connectToDatabase()
    const user = await getUser(database, "email@email.com")
    await getUserSettings(database, user.id)
    await setRole(database, user.id, "ADMIN")
    await notifyUser(user.id, USER_ROLE_UPDATED)
    await notifyAdmins(USER_ROLE_UPDATED)
  } catch (err) {
    console.error(err) // Ideally notify user of error in some manner
  }
}
