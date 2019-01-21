document.addEventListener('DOMContentLoaded', init)

function init(){
  getAllHogs().then(iterateHogs)
  const hogForm = document.querySelector("#hog-form")
  hogForm.addEventListener("submit", newHogHandler)
}

function iterateHogs(hogsArray){
  hogsArray.forEach(hog => makeHogCard(hog))
}

function makeHogCard(hog){
  const hogDiv = document.querySelector("#hog-container")
  let checked = hog.greased == true ? 'checked' : ''

  hogDiv.innerHTML += `<div data-id=${hog.id} class= "hog-card">
  <h4>${hog.name}</h4>
  <p>Specialty: ${hog.specialty}<br> Highest Medal: ${hog.medal}<br> Weight: ${hog.weight}<br>
  Greased: <input data-id="${hog.id}" class="toggle" type="checkbox" name="greased" value="greased" ${checked}></p><br>
  <img src=${hog.image}></img><br><br>
  <button class="delete-btn" data-id={$hog.id}>Delete Hog ❌</button>
   </div>`

   hogDiv.addEventListener("click", removeHogfromDom)
   hogDiv.addEventListener( 'change', toggleGreased)
}

function newHogHandler(event){
  event.preventDefault();
  let hogName = event.target.name.value;
  let hogSpec = event.target.specialty.value;
  let hogMedal = event.target.medal.value;
  let hogWeight = event.target.weight.value;
  let hogImg = event.target.img.value;
  let hogGreased = event.target.greased.checked;
  let newHogObj = {"name": hogName, "specialty": hogSpec, "greased": hogGreased, "weight": hogWeight, "medal": hogMedal,"image": hogImg}
  postNewHog(newHogObj).then(makeHogCard)
}

function removeHogfromDom(event){
  if (event.target.classList.contains("delete-btn")){
  let deletedCard = event.target.parentNode
  let deleteID = deletedCard.dataset.id
  deletedCard.remove()
  deleteHogs(deleteID)
    }
}

function toggleGreased(event){
  let hogID = event.target.dataset.id;
  let isGreased = event.target.checked;
  patchGreasedHog(hogID, isGreased)
}


/// fetch hogs

const hogsURL = 'http://localhost:3000/hogs'

function getAllHogs(){
  return fetch(hogsURL)
    .then(response => response.json())
}

function postNewHog(newHogObj){
  const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newHogObj)
    }
    return fetch(hogsURL, options)
    .then(response => response.json())
}

function deleteHogs(deleteID){
  const options = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    }
  }
  return fetch(hogsURL + `/${deleteID}`, options)
    .then(response => response.json())
}

function patchGreasedHog(hogID, isGreased){
  const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({greased: isGreased})
    }
    return fetch(hogsURL + `/${hogID}`, options)
    .then(response => response.json())
}
