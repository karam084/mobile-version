const isEmailValid = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
};

const form = document.querySelector('form');
const nameInput = document.querySelector('input[name="user_name"]');
const emailInput = document.querySelector('input[name="user_email"]');
const messageInput = document.querySelector('textarea[name="user_message"]');

let formValid = false;
let isvalid = false;

const resetData = (element) => {
  element.classList.remove('invalid');
  element.nextElementSibling.classList.add('hidden');
};

const invalidElement = (element) => {
  element.classList.add('invalid');
  element.nextElementSibling.classList.remove('hidden');
};

const validInput = () => {
  if (!isvalid) return;
  if (!formValid) return;
  resetData(nameInput);
  resetData(emailInput);
  resetData(messageInput);

  if (!nameInput.value) {
    formValid = false;
    invalidElement(nameInput);
  }

  if (!isEmailValid(emailInput.value)) {
    formValid = false;
    invalidElement(emailInput);
  }

  if (!messageInput.value) {
    formValid = false;
    invalidElement(messageInput);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  isvalid = true;
  formValid = true;
  validInput();
});

/* Storage local for data */

const formModel = {
  name: 'Karam',
  email: '',
  msg: '',
};
const keymData = localStorage.getItem('formDataInput');
if (keymData) {
  const formDataInput = JSON.parse(keymData);
  nameInput.value = formDataInput.name;
  emailInput.value = formDataInput.email;
  messageInput.value = formDataInput.msg;
} else {
  localStorage.setItem('formDataInput', JSON.stringify(formModel));
}

const dataStorage = (key, value) => {
  const formDataInput = JSON.parse(localStorage.getItem('formDataInput'));
  formDataInput[`${key}`] = value;
  localStorage.setItem('formDataInput', JSON.stringify(formDataInput));
};

form.addEventListener('input', (e) => {
  dataStorage(e.target.id, e.target.value);
  switch (e.target.id) {
    case 'name':
      validInput();
      break;
    case 'email':
      validInput();
      break;
    case 'msg':
      validInput();
      break;
    default:
      validInput();
  }
});
