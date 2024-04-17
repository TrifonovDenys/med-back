const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, '..', 'db', 'contacts.json')

const listContacts = async () => {
  const res = JSON.parse(await fs.readFile(contactsPath))
  return res
}


const getContactById = async (id) => {
  const list = await listContacts()
  const contact = list.find((obj) => obj.id === id)
  return contact ? contact : null
}

const removeContact = async (id) => {
  const list = await listContacts()
  const index = list.findIndex(obj => obj.id === id)
  if (index === -1) {
    return null
  }
  const newList = list.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
  return newList[0]
}


const addConntact = async (data) => {
  const list = await listContacts()
  const contact = { id: uuidv4(), ...data }
  list.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
  return contact
}


const patchContact = async (id, data) => {
  const list = await listContacts()
  const index = list.findIndex(obj => id === obj.id)
  list[index] = { id, ...data }
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
  return list[index]
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addConntact,
  patchContact
}