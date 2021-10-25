const form = document.querySelector('form')
const todoList = document.querySelector('#todo-list')

let listTodos = [
	{title: "add a todo", description: `add some things you need to do` },
	{title: "remove a todo", description: `remove some things you do` },
	{title: "have fun", description: `be happy` },
]

let listProgress = []

let listCompleted = []


const listMaker = (list , place) => {
	place.innerHTML = ``;
	list.map(todo => {
		place.innerHTML += `
			<div class="bg-white m-2 mb-4 shadow-lg mission-box">
				<div class="d-flex justify-content-between align-items-center py-2">
					<span class="mx-3">${todo.title}</span>
					<span class="fs-4 mx-3"><i class="bi bi-trash"></i></span>
				</div>
				<div class="text-mission text-muted p-3 pt-0">
					${todo.description}
				</div>
			</div>
		`
	})
}


listMaker(listTodos,todoList)

form.addEventListener('submit', e => {
	e.preventDefault()
	const title = form.title.value.trim()
	const description = form.subtitle.value

	const obg = {title,description}

	listTodos.push(obg)

	listMaker(listTodos,todoList)

	form.reset()
})