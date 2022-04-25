// global vars
const list = document.querySelector('#lista-tarefas');
const selected = document.querySelector('.selected-item');

// functions
function addListItem() {
  const texto = document.querySelector('#texto-tarefa').value;
  document.querySelector('#texto-tarefa').value = '';

  const item = document.createElement('li');
  item.className = 'item';
  item.textContent = texto;

  texto.textContent = '';
  list.appendChild(item);
} // COMPLETO!

function itemSelected(event) {
  const item = event.target;
  if (item !== list) {
    for (let i = 0; i < list.childElementCount; i += 1) {
      list.children[i].classList.remove('selected-item');
    }
    item.className += ' selected-item';
  }
} // COMPLETO!

function completedItem(event) {
  const item = event.target;
  if (item !== list) {
    item.classList.toggle('completed');
  }
} // COMPLETO!

function cleaningList() {
  list.textContent = '';
} // COMPLETO!

function clearCheckedItems() {
  const concluidos = document.querySelectorAll('.concluido');
  for (let i = 0; i < concluidos.length; i += 1) {
    concluidos[i].remove();
  }
} // COMPLETO!

function saveList() {
  localStorage.setItem('texto', JSON.stringify([]));
  localStorage.setItem('classes', JSON.stringify([]));
  const texto = JSON.parse(localStorage.getItem('texto'));
  const classes = JSON.parse(localStorage.getItem('classes'));
  for (let i = 0; i < list.childElementCount; i += 1) {
    texto.push(list.children[i].textContent);
    classes.push(list.children[i].className);
  }
  localStorage.setItem('texto', JSON.stringify(texto));
  localStorage.setItem('classes', JSON.stringify(classes));
} // COMPLETO!

function sobe() {
  if (selected !== null && selected !== list.firstChild) {
    const anterior = selected.previousElementSibling;

    const aClass = anterior.className;
    const aContent = anterior.textContent;
    const sClass = selected.className;
    const sContent = selected.textContent;

    selected.className = aClass;
    selected.textContent = aContent;

    anterior.className = sClass;
    anterior.textContent = sContent;
  }
} // COMPLETO!

function desce() {
  if (selected !== null && selected !== list.lastChild) {
    const proximo = selected.nextElementSibling;

    const pClass = proximo.className;
    const pContent = proximo.textContent;
    const sClass = selected.className;
    const sContent = selected.textContent;

    selected.className = pClass;
    selected.textContent = pContent;

    proximo.className = sClass;
    proximo.textContent = sContent;
  }
} // COMPLETO!

function selectedRemove() {
  const pai = selected.parentNode;
  for (let i = 0; i < pai.childElementCount; i += 1) {
    if (pai.children[i] === selected) {
      pai.removeChild(pai.children[i]);
    }
  }
}

function getLocalStorage() {
  if (localStorage.getItem('texto') === null) {
    localStorage.setItem('texto', JSON.stringify([]));
    localStorage.setItem('classes', JSON.stringify([]));
  }
  const texto = JSON.parse(localStorage.getItem('texto'));
  const classes = JSON.parse(localStorage.getItem('classes'));

  for (let i = 0; i < texto.length; i += 1) {
    const item = document.createElement('li');
    item.classList = classes[i];
    item.textContent = texto[i];
    list.appendChild(item);
  }
} // COMPLETO!

// add event listeners

getLocalStorage();

document.querySelector('#criar-tarefa').addEventListener('click', addListItem);

list.addEventListener('click', itemSelected);

list.addEventListener('dblclick', completedItem);

document.querySelector('#apaga-tudo').addEventListener('click', cleaningList);

document.querySelector('#remover-finalizados').addEventListener('click', clearCheckedItems);

document.querySelector('#salvar-tarefas').addEventListener('click', saveList);

document.querySelector('#mover-cima').addEventListener('click', sobe);

document.querySelector('#mover-baixo').addEventListener('click', desce);

document.querySelector('#remover-selecionado').addEventListener('click', selectedRemove);
