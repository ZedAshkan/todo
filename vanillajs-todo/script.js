const form = document.querySelector('form')
const todoList = document.querySelector('#todo-list')
const progressList = document.querySelector('#progress')
const completedList = document.querySelector('#completed')
const toastLive = document.querySelector('#toast')

const timeNow = new Date().toLocaleString();
const dateTimeNow = new Date(timeNow)
const listTime = dateTimeNow.getTime() + 300000
const epochNow = dateTimeNow.getTime()

const deadLineSec = listTime - dateTimeNow.getTime()

let h = Math.floor(deadLineSec / 3600000)
let m = Math.floor(deadLineSec % 3600000 / 60000)

if (h <= 9) {
	h = `0${h}`
}

if (m <= 9) {
	m = `0${m}`
}

const deadLine = `${h} : ${m}`

const fiveMinAfterNow = new Date(listTime).toLocaleString()

let listTodos = [
	{ id: 1, title: "add a todo", description: `add some things you need to do`, time: fiveMinAfterNow, epoch: listTime ,priority:'Low'},
	{ id: 2, title: "remove a todo", description: `remove some things you do`, time: fiveMinAfterNow, epoch: listTime ,priority:'Medium'},
	{ id: 3, title: "have fun", description: `be happy`, time: fiveMinAfterNow, epoch: listTime ,priority:'High'},
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
	
	list.sort((a, b)=> {
		return a.epoch - b.epoch;
	});

	list.map(todo => {
		const timeNow = new Date().toLocaleString();
		const dateTimeNow = new Date(timeNow)
		const epochNow = dateTimeNow.getTime()
		let deadLine = todo.epoch - epochNow
		let day = Math.floor(deadLine / 86400000)
		let h = Math.floor(deadLine / 3600000 % 24)
		let m = Math.floor(deadLine % 3600000 / 60000)

		let dayText = day + ` day ,`
		if (day == 0) {
			dayText = ``
		}

		let timePlace = ``
		if (place == todoList || place == progressList) {

			if (m <= 0 && h <= 0 && day <= 0) {
				deadLineText = `<span>deadline : </span><span class="text-muted">Expire</span>`
			} else {

				if (h <= 9) {
					h = `0${h}`
				}

				if (m <= 9) {
					m = `0${m}`
				}
				deadLineText = `<span>deadline : </span><span class="text-muted">${dayText}${h} : ${m}</span>`
			}

			timePlace = `
<div>
	<span>Due Date : </span><span class="text-muted">${todo.time}</span>
</div>
<div>
	${deadLineText}
</div> 
									`

		}
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
		let priorityColor = ``
		if(todo.priority == 'Low'){
			priorityColor = `border-color: #53ab9a;`
		}else if(todo.priority == 'Medium'){
			priorityColor = `border-color: #ff9400;`			
		}else if(todo.priority == 'High'){
			priorityColor = `border-color: #f92901;`
		}
		place.innerHTML += `
		<div class="bg-white m-2 mb-4 shadow-lg mission-box todo-card">
							<div class="d-flex justify-content-between align-items-center py-2 title-box" style="${priorityColor}">
								<div class="d-flex flex-column mx-3">
									<span class="">${todo.title}</span>
									<span class="fw-lighter priority">${todo.priority}</span>
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
									${timePlace}
								</div>
								<span class="me-3">
									${rightArrowIcon}
								</span>
							</div>
						</div>
		`
		
	})

}

const timeMaker = (time) => {
	const localTime = new Date(time).toLocaleString()
	const epochTodo = new Date(localTime).getTime()
	return { localTime, epochTodo }
}

const objMaker = (list, title, description, time,priority) => {
	const id = Math.floor(Math.random() * 100000)
	const obj = { id, title, description, time: timeMaker(time).localTime, epoch: timeMaker(time).epochTodo , priority}
	list.push(obj)
}

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
		objMaker(listTodos, title, description, time ,priority)

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
