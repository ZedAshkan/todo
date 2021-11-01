const form = document.querySelector('form')
const todoList = document.querySelector('#todo-list')
const progressList = document.querySelector('#progress')
const completedList = document.querySelector('#completed')
const toastLive = document.querySelector('#toast')

const timeNow = new Date().toLocaleString();
const dateTimeNow = new Date(timeNow)
const listTime = dateTimeNow.getTime() + 300000

const deadLineSec = dateTimeNow.getTime() - listTime

let h = Math.floor(sec / 3600000)
let m = Math.floor(sec % 3600000 / 60000)

const fiveMinAfterNow = new Date(listTime).toLocaleString()
console.log(timeNow)
console.log(dateTimeNow)

let listTodos = [
	{ id: 1, title: "add a todo", description: `add some things you need to do`, time: fiveMinAfterNow },
	{ id: 2, title: "remove a todo", description: `remove some things you do`, time: fiveMinAfterNow },
	{ id: 3, title: "have fun", description: `be happy`, time: fiveMinAfterNow },
]
console
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
			trashIcon = `<img class="trash" src="./assets/img/x.svg" alt="remove" data-id="${todo.id}">`
		}
		if (place == completedList) {
			rightArrowIcon = ``
			leftArrowIcon = ``
			trashIcon = `<img class="trash" src="./assets/img/x.svg" alt="remove" data-id="${todo.id}">`
		}

		place.innerHTML += `
		<div class="bg-white m-2 mb-4 shadow-lg mission-box todo-card">
							<div class="d-flex justify-content-between align-items-center py-2 title-box">
								<div class="d-flex flex-column mx-3">
									<span class="">${todo.title}</span>
									<span class="fw-lighter priority">priority</span>
								</div>
								<span class="mx-3">
									${trashIcon}
								</span>
							</div>
							<div class="text-mission text-muted p-3">
								${todo.description}
							</div>
							<div class="d-flex fs-3 justify-content-between align-items-center">
								<span class="ms-3">
									${leftArrowIcon}
								</span>
								<div class="d-flex flex-column time py-2">
									<div>
										<span>Due Date : </span><span class="text-muted">${todo.time}</span>
									</div>
									<div>
										<span>deadline : </span><span class="text-muted">5 Hours</span>
									</div>
								</div>
								<span class="me-3">
									${rightArrowIcon}
								</span>
							</div>
						</div>
		`
	})

}

const objMaker = (list, title, description) => {
	const id = Math.floor(Math.random() * 100000)
	const obj = { id, title, description }
	list.push(obj)
}

// const 

listMaker(listTodos, todoList)
listMaker(listProgress, progressList)
listMaker(listCompleted, completedList)

form.addEventListener('submit', e => {
	e.preventDefault()
	const title = form.title.value.trim()
	const description = form.subtitle.value
	const time = form.time.value
	const priority = form.priority.value

	form.title.classList.add('border-white')
	form.time.classList.add('border-white')

	if (title.length == 0 && time.length == 0) {
		form.title.classList.remove('border-white')
		form.time.classList.remove('border-white')
		form.title.classList.add('border-danger')
		form.time.classList.add('border-danger')
	} else if (title.length == 0) {
		form.title.classList.remove('border-white')
		form.title.classList.add('border-danger')
	} else if (time.length == 0) {
		form.time.classList.remove('border-white')
		form.time.classList.add('border-danger')
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
		localStorage.setItem('todos', JSON.stringify(listTodos))
		listMaker(listTodos, todoList)
	}

	if (e.target.classList.contains('next')) {

		if (listProgress.length == 1) {
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

			localStorage.setItem('todos', JSON.stringify(listTodos))
			localStorage.setItem('progress', JSON.stringify(listProgress))
			listMaker(listTodos, todoList)
			listMaker(listProgress, progressList)
		}
	}
})

progressList.addEventListener('click', e => {
	if (e.target.classList.contains('prev')) {

		listTodos.unshift(listProgress[0])
		listProgress.pop()

		localStorage.setItem('progress', JSON.stringify(listProgress))
		localStorage.setItem('todos', JSON.stringify(listTodos))

		listMaker(listTodos, todoList)
		listMaker(listProgress, progressList)
	}
	if (e.target.classList.contains('next')) {
		listCompleted.unshift(listProgress[0])
		listProgress.pop()

		localStorage.setItem('progress', JSON.stringify(listProgress))
		localStorage.setItem('completed', JSON.stringify(listCompleted))

		listMaker(listProgress, progressList)
		listMaker(listCompleted, completedList)
	}

})
