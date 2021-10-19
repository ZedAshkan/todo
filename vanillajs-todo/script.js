const addTodo = document.querySelector('#addTodo');
const list = document.querySelector('ol');
const error = document.querySelector('#error');
const title = document.querySelector('#title')

addTodo.addEventListener('submit', e => {

	e.preventDefault();

	const titleV = document.querySelector('#title').value.trim();
	const descriptionV = document.querySelector('#description').value.trim();

	makeTodo(titleV, descriptionV)
})

title.addEventListener('keyup', e => {
	let titleVL = document.querySelector('#title').value.trim()
	if (titleVL.length != 0) {
		title.classList.remove('border-danger')
		title.classList.add('border-success')
	}
})

const makeTodo = (titleV, descriptionV) => {

	const todo = `
    <li class="list-group-item d-flex justify-content-between align-items-start bg-list-item mb-1">
        <div class="ms-2 me-auto">
            <div class="fw-bold">${titleV}</div>
            ${descriptionV}
        </div>
        <i class="bi bi-trash-fill align-self-center trash"></i>
    </li>
    `;

	if (titleV == '') {
		title.classList.add('border-danger')
		title.classList.remove('border-success')
	} else {
		title.classList.remove('border-danger')
		title.classList.add('border-success')
		list.innerHTML += todo;
		addTodo.reset()
	}
}

list.addEventListener('click', e => {
	if (e.target.classList.contains('trash'))
		e.target.parentElement.remove()
})
