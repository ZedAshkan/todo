const form = document.querySelector('form')
const todoList = document.querySelector('#todo-list')
const progressList = document.querySelector('#progress')
const completedList = document.querySelector('#completed')
const toastLive = document.querySelector('#toast')

let listTodos = [
	{ id: 1, title: "add a todo", description: `add some things you need to do` },
	{ id: 2, title: "remove a todo", description: `remove some things you do` },
	{ id: 3, title: "have fun", description: `be happy` },
]
let listProgress = []
let listCompleted = []

if (localStorage.getItem('todos')) {
	listTodos = JSON.parse(localStorage.getItem('todos'))
}
if (localStorage.getItem('progress')) {
	listProgress = JSON.parse(localStorage.getItem('progress'))
	console.log('progress')
}
if (localStorage.getItem('completed')) {
	listCompleted = JSON.parse(localStorage.getItem('completed'))
}

const listMaker = (list, place) => {
	place.innerHTML = ``;
	list.map(todo => {
		let leftArrowIcon = `<i class="bi bi-arrow-bar-left prev" data-id="${todo.id}"></i>`
		let rightArrowIcon = `<i class="bi bi-arrow-bar-right next" data-id="${todo.id}"></i>`
		let trashIcon = ``
		if (place == todoList) {
			leftArrowIcon = ``
			trashIcon = `<i class="bi bi-trash trash" data-id="${todo.id}"></i>`
		}
		if (place == completedList) {
			rightArrowIcon = ``
			leftArrowIcon = ``
		}

		place.innerHTML += `
			<div class="bg-white m-2 mb-4 shadow-lg mission-box">
				<div class="d-flex justify-content-between align-items-center py-2">
					<span class="mx-3">${todo.title}</span>
					<span class="fs-4 mx-3">
						${trashIcon}
					</span>
				</div>
				<div class="text-mission text-muted p-3 pt-0">
								${todo.description}
				</div>
				<div class="d-flex fs-3 justify-content-around">
					<span>
						${leftArrowIcon}
					</span>
					<span>
						${rightArrowIcon}
					</span>
							</div>
			</div>
		`
	})

}

const objMaker = (list, title, description) => {
	const indexLast = list.length - 1;
	let id
	if (list.length == 0) {
		id = 1
	} else {
		id = list[indexLast].id + 1;
	}

	const obj = { id, title, description }

	list.push(obj)
}

listMaker(listTodos, todoList)
listMaker(listProgress, progressList)
listMaker(listCompleted, completedList)

form.addEventListener('submit', e => {
	e.preventDefault()
	const title = form.title.value.trim()
	const description = form.subtitle.value
	if (title.length == 0) {
		form.title.classList.add('border-danger')
	} else {
		form.title.classList.add('border-white')
		objMaker(listTodos, title, description)

		listMaker(listTodos, todoList)

		form.reset()
		localStorage.setItem('todos', JSON.stringify(listTodos))
	}
})

todoList.addEventListener('click', e => {

	if (e.target.classList.contains('trash')) {

		listTodos = listTodos.filter(todo => {
			return todo.id != e.target.getAttribute('data-id')
		})
	}

	if (e.target.classList.contains('next')) {

		if(listProgress.length == 1){
			let toast = new bootstrap.Toast(toastLive)

			toast.show()
		}
		
		if (listProgress.length == 0) {
			listProgress = listTodos.filter(todo => {
				return todo.id == e.target.getAttribute('data-id')
			})

			listTodos = listTodos.filter(todo => {
				return todo.id != e.target.getAttribute('data-id')
			})
		} 
		
	}

	localStorage.setItem('todos', JSON.stringify(listTodos))
	localStorage.setItem('progress', JSON.stringify(listProgress))
	localStorage.setItem('completed', JSON.stringify(listCompleted))
	listMaker(listTodos, todoList)
	listMaker(listProgress, progressList)
})

progressList.addEventListener('click', e => {
	if (e.target.classList.contains('prev')) {

		listTodos.unshift(listProgress[0])
		listProgress.pop()
	}
	if (e.target.classList.contains('next')) {
		listCompleted.unshift(listProgress[0])
		listProgress.pop()
	}

	localStorage.setItem('todos', JSON.stringify(listTodos))
	localStorage.setItem('progress', JSON.stringify(listProgress))
	localStorage.setItem('completed', JSON.stringify(listCompleted))
	listMaker(listTodos, todoList)
	listMaker(listProgress, progressList)
	listMaker(listCompleted, completedList)
})
