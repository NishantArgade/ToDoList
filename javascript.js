console.log('quick note maker app ');

// Show notes which we storaged in local storage.
showNotes();

// Add note
document.querySelector('.addNoteBtn').addEventListener('click', () => {

	let titleText = document.querySelector('.noteTitle');
	let texts = localStorage.getItem(titleText.value);
	let addText = document.querySelector('.noteContent');
	let noteObj;
	if (texts == null)
		noteObj = [];
	else {
		noteObj = JSON.parse(texts);
	}
	noteObj.push(addText.value);
	localStorage.setItem(titleText.value, JSON.stringify(noteObj));

	titleText.value = "";
	addText.value = "";
	showNotes();
});

// Show notes
function showNotes() {


		let html = '';
		let len = localStorage.length;

		for (let i = 0; i < len; i++) {

			let text = localStorage.getItem(localStorage.key(i));
			let noteObj;
			if (text == null)
				noteObj = [];
			else
				noteObj = JSON.parse(text);

			noteObj.forEach(function (ele, ind) {
				html += `<div class="card m-1 scard " >
					<div class="card-body show-cards  " id= "card-${i}-${ind}">
					<h5 >Note Title :</h5>
					<p style="font-size:1.7rem">${localStorage.key(i)}</p>
						<h5 >Note content :</h5>
					  <div class="form-group">
						<p style="font-size:1.2rem">${ele}</p>
					  </div>
				  <div class="d-flex justify-content-left " >
					  <a href="#" id=${i} onclick="deleteNote(this.id,${ind})" class="btn btn-primary deleteBtn">Delete</a>
					  <button  onclick="markNotImpNote(${i},${ind})" class="notImpBtn">NOT IMP</button>
					  <button  onclick="markImpNote(${i},${ind})" class="impBtn">IMP</button>
				   </div>
				   </div>
			   </div>`;
			});
		}

	let showContainer = document.querySelector('.displayNotes');
	if (html.length != 0)
		showContainer.innerHTML = html;
	else
		showContainer.innerHTML = `<p class="text-left" >There is nothing Notes. Add Note using above make note section.</p>`;
}

// Delete note
function deleteNote(ki, ind) {

	let txt = localStorage.getItem(localStorage.key(ki));
	if (txt == null)
		noteObj = [];
	else
		noteObj = JSON.parse(txt);

	noteObj.splice(ind, 1);
	localStorage.setItem(localStorage.key(ki), JSON.stringify(noteObj));
	showNotes();
}

// Search note
let search = document.getElementById('searchText');
search.addEventListener('input', () => {

	let inputTxt = search.value.toLowerCase();
	let cards = document.getElementsByClassName('scard');

	Array.from(cards).forEach(function (ele) {
		let titleTxt = ele.getElementsByTagName('p')[0].innerText;
		let paraTxt = ele.getElementsByTagName('p')[1].innerText;

		if (titleTxt.toLowerCase().includes(inputTxt) || paraTxt.toLowerCase().includes(inputTxt))
			ele.style.display = "block";
		else
			ele.style.display = "none";
	});
});

// Mark IMP Note
function markImpNote(ki, vi) {
	let idd = `card-${ki}-${vi}`;
	let impNote = document.getElementById(idd);

	//apply css  into imp note 
	impNote.setAttribute('style', 'background-color: red;');
	impNote.getElementsByTagName('h5')[0].style.color = "black";
	impNote.getElementsByTagName('h5')[1].style.color = "black";
	impNote.getElementsByTagName('p')[0].style.color = "white";
	impNote.getElementsByTagName('p')[1].style.color = "white";
	
}
function markNotImpNote(ki, vi) {
	let idd = `card-${ki}-${vi}`;
	let impNote = document.getElementById(idd);
	
	//apply css  into Notimp note 
	impNote.style.backgroundColor = "rgba(127, 255, 255, 0.39)";
	impNote.getElementsByTagName('h5')[0].style.color = "orange";
	impNote.getElementsByTagName('h5')[1].style.color = "orange";
	impNote.getElementsByTagName('p')[0].style.color = "black";
	impNote.getElementsByTagName('p')[1].style.color = "black";
}
