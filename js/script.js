
// Global variables

const galeryUrl = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];
const name = document.getElementById('name');
// const modalProfiles = [];

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
    // modalProfiles.push(Promise.all(profiles));
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

        
      // Added eventListener for the modal window
        cardDiv.addEventListener('click',function (e) {
            if (cardDiv.name === e.target.name) {
              generateModalHTML(person);
            }
        });   
    });
};


// Function to generate the modal window

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
    </div>
  </div>`;

// Add the prev nad next buttons
  createModalButtons(modalContainer);
// Added eventListener to close the modal window
  const modalCloseBtn = document.getElementById('modal-close-btn');
  modalCloseBtn.addEventListener('click', () => {
    body.removeChild(modalContainer);
  });
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

// Function to create the modal prev/next buttons

function createModalButtons (parent) {
  const modalBtnConainer = document.createElement('div');
  modalBtnConainer.classList = 'modal-btn-container';
  parent.appendChild(modalBtnConainer);
  modalBtnConainer.innerHTML = `
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
  `;
}

/************
 * Events
************/

// Show the profiles when the page loads

window.onload = () => {
    getRandomPeople(galeryUrl)
        .then(generateHTML);  
};
