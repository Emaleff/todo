// Форма
// Список задач
const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function (arrOfTasks) {
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    // Elemnts UI
    const listContainer = document.querySelector(
        '.tasks-list-section .list-group',
    );
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
    const selectCompleted = form.elements['completed'];

    // Events
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeletehandler);

    const completedBtn = document.getElementById('completedBtn');
    const allTasksBtn = document.getElementById('allTasksBtn');
    // console.log(completedBtn);
    // console.log(allTasksBtn);
    completedBtn.addEventListener('click', completedClick)
    allTasksBtn.addEventListener('click', allTasksBtnClick)

    function allTasksBtnClick() {
        const allTasksClick = document.querySelectorAll('.d-none');
        for (let i = 0; i < allTasksClick.length; i++) {
            allTasksClick[i].classList.remove('d-none');
            allTasksClick[i].classList.add('d-flex');
        }
    }

    function completedClick() {
        const completedTasks = document.querySelectorAll('.btn-success');
        console.log(completedTasks);
        completedTasks.forEach(function (item) {
            const temp = item.parentNode;
            temp.style.display = "none!impotent";
            temp.style = "display:none!impotent";

            // item.parentNode.parentNode.removeChild(item.parentNode);
        });
        for (let i = 0; i < completedTasks.length; i++) {
            completedTasks[i].parentNode.classList.remove('d-flex');
            completedTasks[i].parentNode.classList.add('d-none');

        }

        // const tempCompletedTasks = function ({target}){
        //     if (target.classList.contains('btn-warning')){
        //         console.log("выполненая задача");
        //     }
        // }
    }

    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error('Передайте список задач!');
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        });
        listContainer.appendChild(fragment);
    }

    function listItemTemplate({_id, title, body, completed} = {}) {
        const li = document.createElement('li');
        li.classList.add(
            'list-group-item',
            'd-flex',
            'align-items-center',
            'flex-wrap',
            'mt-2',
        );
        li.setAttribute('data-task-id', _id);

        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete task';
        deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add('mt-2', 'w-100');

        const completedBtn = document.createElement('button');
        if (completed === true) {
            completedBtn.textContent = 'задача выполнена';
            completedBtn.classList.add('btn-success');
        } else {
            completedBtn.textContent = 'задача еще не выполнена';
            completedBtn.classList.add('btn-warning');
        }
        completedBtn.classList.add('btn', 'completedBtn', 'd-block', 'ml-auto');

        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(completedBtn);
        li.appendChild(article);

        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;
        const completedValue = selectCompleted.value === "true" ? true : false;

        if (!titleValue || !bodyValue) {
            alert('Пожалуйста введите title и body');
            return;
        }

        const task = createNewTask(titleValue, bodyValue, completedValue);
        const listItem = listItemTemplate(task);
        listContainer.insertAdjacentElement('afterbegin', listItem);
        form.reset();
    }

    function createNewTask(title, body, completed) {
        const newTask = {
            title,
            body,
            completed,
            _id: `task-${Math.random()}`,
        };

        objOfTasks[newTask._id] = newTask;

        const noTasks = document.querySelectorAll(`[data-task-id = 'noTasks']`);
        if (noTasks.length > 0) {
            noTasks[0].remove();
        }
        return {...newTask};
    }

    function deleteTask(id) {
        const {title} = objOfTasks[id];
        const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
        if (!isConfirm) return isConfirm;
        delete objOfTasks[id];
        return isConfirm;
    }

    function deleteTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove();
        if (!Object.keys(objOfTasks).length) {
            const newFragment = document.createDocumentFragment();
            const li = document.createElement('li');
            li.classList.add(
                'list-group-item',
                // 'd-flex',
                // 'align-items-center',
                // 'flex-wrap',
                'mt-2',
                'fs-1',
                'fw-bold',
            );
            li.setAttribute('data-task-id', 'noTasks');
            li.textContent = 'Список задач пуст';
            newFragment.appendChild(li)
            listContainer.appendChild(newFragment);
        }
    }

    function onDeletehandler({target}) {
        if (target.classList.contains('delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromHtml(confirmed, parent);
        }
    }

})(tasks);
