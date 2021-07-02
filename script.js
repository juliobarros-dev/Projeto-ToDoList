const list = document.querySelector('#lista-tarefas');

/* Function Title creates <h1> Title based on the string
used as parameter */
function title(string) {
  document.querySelector('h1').innerHTML = string;
}
title('Minha Lista de Tarefas');

/* Function instructionText creates <p> text based on the string
used as parameter */
function instructionText(string) {
  document.getElementById('funcionamento').innerHTML = string;
}
instructionText('Clique duas vezes em um item para marcá-lo como completo');

/* Function newTasks creates a <li> with the content from input box. If
input.value = '' it alerts the user to fill the input and stops the function. */

/* Function chanceColor changes <li> backgroundColor highlighting the clicked line */
function changeColor(event) {
  const selected = document.querySelector('.selected');

  if (selected === null) {
    event.target.classList.add('selected');
  } if (selected !== null) {
    selected.classList.remove('selected');
    event.target.classList.add('selected');
  }
}

/* Function completeTask makes a line-through the tasks text assigning it as complete */
function completeTask(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function addTask() {
  const input = document.querySelector('#texto-tarefa');

  if (input.value === '') {
    alert('Preencha qual atividade deseja adicionar.');
  } else {
    const listItem = document.createElement('li');
    listItem.innerHTML = input.value;
    listItem.className = 'list-Item';
    listItem.addEventListener('dblclick', completeTask);
    listItem.addEventListener('click', changeColor);
    list.appendChild(listItem);
    input.value = '';
  }
}

function newTasks() {
  const button = document.querySelector('#criar-tarefa');
  const txtField = document.querySelector('#texto-tarefa');

  button.addEventListener('click', addTask);
  txtField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      button.click();
    }
  });
}
newTasks();

/* function newTasks() {
  const button = document.querySelector('#criar-tarefa');
  const input = document.querySelector('#texto-tarefa');

  button.addEventListener('click', () => {
    if (input.value === '') {
      alert('Preencha qual atividade deseja adicionar.');
    } else {
      const listItem = document.createElement('li');
      listItem.innerHTML = input.value;
      listItem.className = 'list-Item';
      listItem.addEventListener('dblclick', completeTask);
      listItem.addEventListener('click', changeColor);
      list.appendChild(listItem);
      input.value = '';
    }
  });
}
newTasks(); */

/* Function clearList deletes all <ol> child nodes cleaning the task list */
function clearList() {
  const buttonClear = document.querySelector('#apaga-tudo');
  const itemList = document.getElementsByTagName('li');

  buttonClear.addEventListener('click', () => {
    if (itemList.length > 0) {
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
    } else {
      alert('A lista está vazia!');
    }
  });
}
clearList();

/* Function clearCompleted deles all <li> item marked as completed through the class 'completed */
function clearCompleted() {
  const completed = document.getElementsByClassName('completed');
  const buttonClearCompleted = document.querySelector('#remover-finalizados');

  buttonClearCompleted.addEventListener('click', () => {
    while (completed.length > 0) {
      completed[0].parentNode.removeChild(completed[0]);
    }
  });
}
clearCompleted();

/* Function saveTask saves the innerHTML from <ol> on localStorage */
function saveTask() {
  const buttonSaveTask = document.querySelector('#salvar-tarefas');

  buttonSaveTask.addEventListener('click', () => {
    localStorage.setItem('task', list.innerHTML);
    alert('Tarefas salvas');
  });
}
saveTask();

/* Function recoverTask recovers the <ol> information saved on localStorage */
function recoverTask() {
  const listItem = localStorage.getItem('task');

  if (localStorage.length > 0) {
    list.innerHTML = listItem;
    const listagem = document.querySelectorAll('li');

    for (let index = 0; index < listagem.length; index += 1) {
      listagem[index].addEventListener('dblclick', completeTask);
      listagem[index].addEventListener('click', changeColor);
    }
  }
}
recoverTask();

// Function moveUP moves up the <li> position based on the class selected
function moveUp() {
  const moveUpButton = document.querySelector('#mover-cima');

  moveUpButton.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (selected === null) {
      return;
    }
    const prevSibling = selected.previousElementSibling;

    if (prevSibling === null) {
      alert('Voce chegou ao topo da lista');
    }
    if (prevSibling) {
      selected.parentNode.insertBefore(selected, prevSibling);
    }
  });
}
moveUp();

// Function moveUP moves down the <li> position based on the class selected
function moveDown() {
  const moveDownButton = document.querySelector('#mover-baixo');

  moveDownButton.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (selected === null) {
      return;
    }
    const nexSibling = selected.nextElementSibling;

    if (nexSibling === null) {
      alert('Voce chegou ao fim da lista');
    }
    if (nexSibling !== null) {
      selected.parentNode.insertBefore(nexSibling, selected);
    }
  });
}
moveDown();

function clearSelected() {
  const clearSelectedButton = document.querySelector('#remover-selecionado');

  clearSelectedButton.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    selected.parentNode.removeChild(selected);
  });
}
clearSelected();

function clearStorage() {
  const clearStorageButton = document.querySelector('#apaga-storage');

  clearStorageButton.addEventListener('click', () => {
    localStorage.clear();
  });
}
clearStorage();
