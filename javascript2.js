console.log('this is js2 for note taking ');

// initialy show all notes which we stored in local storage.
showNotes();
let addNoteBtn = document.querySelector('.addNoteBtn');

// Add event click on  Add Note button 
addNoteBtn.addEventListener('click', (e) => {

	console.log('submit btn pressed');
	e.preventDefault();

	let noteTitle = document.querySelector('.noteTitle').value;
	let noteContent = document.querySelector('#exampleFormControlTextarea1').value;
	if (noteTitle.length != 0 && noteContent.length != 0) {
		if (localStorage.length == 0) {
			let displayNotes = document.querySelector('.displayNotes');
			displayNotes.innerText = '';
		}
		addNotesHepler(noteTitle, noteContent);
		//------ add note to local storage --------
		localStorage.setItem(noteTitle, noteContent);

		// at the end title and content area fill blank
		document.querySelector('.noteTitle').value = '';
		document.querySelector('#exampleFormControlTextarea1').value = '';
	}
	else {
		alert('please ,First Add both Title and Content before adding');
	}

});

function getEleFromString(str) {
	let wrapper = document.createElement('div');
	wrapper.innerHTML = str;
	return wrapper.firstElementChild;
}

function addNotesHepler(noteTitle, noteContent) {

	let str = `<div class="card scard w-18 ">
	                <div class="card-body bg-dark text-white">

						<h5>NOTE TITLE :</h5>
						<p class="titleContent">${noteTitle}</p>
						<hr>
						<h6>NOTE CONTENT :</h6>
						<p class="noteContent">${noteContent}</p>
						
						<button class="btn btn-primary"  id="deleteBtn">Delete</button>
					</div>
					</div>`;

	// get element from string 
	let noteEle = getEleFromString(str);

	// Deletion of Note
	// add event listener on the button of this current element 
	let btn = noteEle.getElementsByTagName('button')[0];
	btn.addEventListener('click', (e) => {
		// console.log('del button pressed');
		let title = (e.target.parentNode.getElementsByTagName('p')[0].innerText);
		localStorage.removeItem(title);
		e.target.parentNode.parentNode.remove();//remove first parent of this button
		let len = localStorage.length;

		// reload page in no any note.
		if (len == 0)
			document.location.reload();
	});

	let displayNotes = document.querySelector('.displayNotes');
	displayNotes.insertAdjacentElement('afterbegin', noteEle);//append element after of begin div tag.i.e <div>(here) </div>
}

function showNotes() {

	let len = localStorage.length;
	if (len == 0) {
		let displayNotes = document.querySelector('.displayNotes');
		displayNotes.innerText = 'There is no any note. please add note';
	}
	else {
		for (let i = 0; i < len; i++) {
			let key = localStorage.key(i);
			let val = localStorage.getItem(key);
			addNotesHepler(key, val);
		}
	}
}

//*******  event input -it gives input every single press/type */
//*******  event change -it gives input after complete change input text  */
let search = document.getElementById('searchText');
search.addEventListener('input', (e) => {
	let inpKey = e.target.value.toLowerCase();
	let allNotes = document.getElementsByClassName('scard');

	for (let note of allNotes) {
		let p1Text = (note.getElementsByTagName('p')[0].innerText).toLowerCase();
		let p2Text = (note.getElementsByTagName('p')[1].innerText).toLowerCase();

		if (p1Text.includes(inpKey) || p2Text.includes(inpKey))
			note.style.display = '';
		else
			note.style.display = 'none';
	}

});