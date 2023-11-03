import { getAllContacts, getContactById, addContact, removeContact } from './contacts.js';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


const argv = yargs(hideBin(process.argv)).argv;

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await getAllContacts();
          return console.log(allContacts);

    case 'get':
      const oneContact = await getContactById(id);
            return console.log(oneContact);

    case 'add':
      const newContact = await addContact({name, email, phone});
            return console.log(newContact);
      
    case 'remove':
       const deleteContact = await removeContact(id);
            return console.log(deleteContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);