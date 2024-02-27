const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addConntact, patchContact } = require('./contact.js')


const program = new Command

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv)
const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const table = await listContacts()
      console.table(table);
      break;

    case "get":
      const oneContact = await getContactById(id)
      console.log(contact);
      break;

    case "add":
      // ... name email phone
      const newContact = addConntact(name, email, phone)
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = removeContact(id)
      console.log(deleteContact);
      break;

    case 'update':
      const updateContact = await patchContact(id, { name, email, phone })
      console.log(updateContact);
      break;
    
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);