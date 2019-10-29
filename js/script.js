/******************************************
Treehouse Techdegree:
FSJS project 5 - Public API Request
******************************************/


// Global variables

const galeryUrl = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];
const name = document.getElementById('name');
// empty array to store the data from each random person
const modalProfiles = [];

// Function to parse the url

async function getJSON (url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

// Function to extract the random people

async function getRandomPeople (url) {
    const randomPeopleJSON = await getJSON(url);
    const profiles = randomPeopleJSON.results.map( async (person) => {
        const randomName = person.name;
        const randomEmail = person.email;
        const randomCity = person.location.city;
        const randomState = person.location.state;
        const randomStreet = person.location.street;
        const randomPostCode = person.location.postcode;
        const randomImg = person.picture.large;
        const randomCell = person.cell;
        const randomDate = person.dob.date; 
        
        return {...randomName,
                   randomEmail,
                   randomCity,
                   randomImg,
                   randomCell,
                   randomDate,
                   randomState,
                   randomPostCode,
                   randomStreet };
    });
    
    return Promise.all(profiles);
};


// Function to generate the main page HTML

function generateHTML (data) {
    data.map( (person) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        gallery.appendChild(cardDiv);
        cardDiv.innerHTML = `

        <div class="card-img-container">
           <img class="card-img" src='${person.randomImg}' alt="profile picture">
        </div>
           <div class="card-info-container">
           <h3 id="name" class="card-name cap">${person.first} ${person.last}</h3>
           <p class="card-text">${person.randomEmail}</p>
           <p class="card-text cap">${person.randomCity}, ${person.randomState}</p>
        </div> `;

      // pushing profiles into array
        modalProfiles.push(person)

      // Added eventListener for the modal window
        cardDiv.addEventListener('click',function (e) {
            if (cardDiv.name === e.target.name) {
              generateModalHTML(person);
            }
        });   
    });
};


// Function to generate the modal window and adding functionality to the prev/next buttons

function generateModalHTML (data) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  body.appendChild(modalContainer);
  modalContainer.innerHTML = `

  <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${data.randomImg}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${data.first} ${data.last}</h3>
        <p class="modal-text">${data.randomEmail}</p>
        <p class="modal-text cap">${data.randomCity}</p>
        <hr>
        <p class="modal-text">${data.randomCell}</p>
        <p class="modal-text">${data.randomStreet.name}  ${data.randomStreet.number}, ${data.randomState}, ${data.randomPostCode}</p>
        <p class="modal-text">Birthday:${getDate(data.randomDate)}</p>

        <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
  </div>`;

// Added eventListener to close the modal window
  const modalCloseBtn = document.getElementById('modal-close-btn');
  modalCloseBtn.addEventListener('click', () => {
    removeChildElement(body,modalContainer);
  });

  // Added eventListeners for prev/next buttons
  // prev button
  const prev = document.querySelector('#modal-prev');
  prev.addEventListener('click', () => {
    var person = modalProfiles.indexOf(data)

    if (person === 0) {
      removeChildElement(body,modalContainer);
      generateModalHTML(modalProfiles[person]);
    } else {
      removeChildElement(body,modalContainer);
      generateModalHTML(modalProfiles[person - 1]);
    }
  })

  // next button
  const next = document.querySelector('#modal-next');
  next.addEventListener('click', () => {
    var person = modalProfiles.indexOf(data)

    if (person === 11) {
      removeChildElement(body,modalContainer);
      generateModalHTML(modalProfiles[person]);
    } else {
      removeChildElement(body,modalContainer);
      generateModalHTML(modalProfiles[person + 1]);
    }
  })
};



/*******************
 * Helper Functions
*******************/

// Function to get the profile date

function getDate (date) {
  var date = new Date(date);
  var day = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
  var year = date.getFullYear().toString().substr(2,2);
  var dateString = day  + "/" + month + "/" + year;
  return dateString;
};

// Function for adding the search field

function serchField () {
  const searchContainer = document.querySelector('.search-container');
  const form = document.createElement('form');
  form.setAttribute('action', '#');
  form.setAttribute('method', 'get');
  searchContainer.appendChild(form);
  searchContainer.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  `;

  const searchBtn = document.querySelector('#search-submit');
  searchBtn.addEventListener('click', searchUser);

  const serachInputField = document.querySelector('#search-input');
  serachInputField.addEventListener('keyup', searchUser);
}

// Function to check for search input

function searchUser(){
  const searchInput = document.querySelector('#search-input').value;
  const allUsers = document.querySelectorAll('.card h3');
  const userContainer = document.querySelectorAll('.card');

  for( let i = 0; i < allUsers.length; i++){
      if(allUsers[i].textContent.toLowerCase().includes(searchInput.toLowerCase())){
        userContainer[i].style.display = 'flex';
      }
      else if (searchInput !== ''){
        userContainer[i].style.display = 'none';
      }
  }
} 

// Function to remove child-element

function removeChildElement (parent,child) {
  parent.removeChild(child);
}

// Show the profiles when the page loads

window.onload = () => {
    getRandomPeople(galeryUrl)
        .then(generateHTML);  
};
  
// Adds the search input field
serchField ()