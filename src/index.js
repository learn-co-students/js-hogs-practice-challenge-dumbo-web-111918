

//** selectors

const hogContainer = document.querySelector("#hog-container")
let checkBox = document.querySelector("#check-box")
const url = `http://localhost:3000/hogs`
const hogForm = document.querySelector("#hog-form")
//console.log(hogForm);
//function calls
// hogRender({
//       "id": 0,
//       "name": "Mudblood",
//       "specialty": "Mediocre magic",
//       "greased": false,
//       "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": 2,
//       "highest medal achieved": "bronze",
//       "image": "./hog-imgs/mudblood.jpg"
//     }
//     )

//**fetches
//
  fetch(url)
  .then(function(response){
   return response.json();
  })
  .then(function(data){
     data.forEach(hogRender);
  });


//** listeners
     hogForm.addEventListener("submit", function(event){
       event.preventDefault();

     	 let formName = event.target.name.value
     	 //console.log(formName)
       let formSpecialty = event.target.specialty.value
     	 let formMedal = event.target.medal.value
       let formWeight = event.target.weight.value
       let formImg = event.target.img.value
       let formGreased = event.target.greased.checked


       let option = {
         name: formName,
         specialty: formSpecialty,
         greased: formGreased,
         ["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]: parseInt(formWeight),
         ["highest medal achieved"]: formMedal,
         image: formImg
       }

       fetch(url, {
         method: "POST",

         headers: {
       	           "Content-Type": "application/json",
       	           "Accept": "application/json"
        },
        body: JSON.stringify(option)

        }) //end of object
        .then(function(response){
  	      return response.json();
        })
        .then(function(data){
          hogRender(data)

      }) //end of fetch

     });//end of listener

    //delete
  hogContainer.addEventListener("click", function(event){
    if (event.target.className ===("pick me to delete")) {

      let selectedHog = {}
      selectedHog.id = parseInt(event.target.id);
      event.target.parentElement.parentNode.remove();
      debugger;

      fetch(`http://localhost:3000/hogs/${selectedHog.id}`,
        {
     	    method: "DELETE"
        })
        .then(function(response){
     	    console.log(response)
        })
        .then(function(data){
           console.log(data);
       });
     }//end of
     else if (event.target.id === "id") {
      let selectedId = parseInt(event.target.dataset.id)

       let opts =
       {
        greased: event.target.checked
       }

       fetch(`http://localhost:3000/hogs/${selectedId}`,
         {
          method: "PATCH",
          headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                   },

           body: JSON.stringify(opts)
          })
          .then(function(response){
            return response.json()
          })
          .then(function(data){
            console.log(data);
          })

     }//end of elseif

  })//end of listener

//**helper functions

  function hogRender(hog){
    let cardDiv = document.createElement("div")
    cardDiv.className = "hog-card"
    //cardDiv.id = `card - ${hog.id}`
    //cardDiv.className = "hog.id"
    let hogDiv = document.createElement("div")

    let nameLi = document.createElement("li")
    nameLi.innerHTML = `Name: ${hog.name}`
    let specialtyLi = document.createElement("li")
    specialtyLi.innerHTML = hog.specialty

    let greasedLi = document.createElement("li")
   //greasedSpan.innerHTML = hog.greased

    let checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.name = "name";
      checkbox.value = "value";
      checkbox.id = "id";
      checkbox.dataset.id = hog.id
      checked(checkbox);

   let label = document.createElement('label')
     label.htmlFor = "id";
     label.appendChild(document.createTextNode('greased'));
//checkbox.checked = !checkbox.checked
     function checked(checkbox){
     if (hog.greased === true){
       checkbox.checked = true;
     }
     else if (hog.greased === false){
       checkbox.checked = false;
     }
  }
  greasedLi.appendChild(label);
  greasedLi.appendChild(checkbox);



    let medalLi = document.createElement("li")
    medalLi.innerHTML = hog["highest medal achieved"]

    let weightLi = document.createElement("li")
    weightLi.innerHTML = hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]

    let image = document.createElement("img")
    image.src = hog.image

    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "DELETE ME";
    deleteButton.className = "pick me to delete"
    deleteButton.id = hog.id

    hogDiv.append(nameLi, specialtyLi, greasedLi, medalLi, weightLi, image, deleteButton)
    cardDiv.append(hogDiv)
    hogContainer.append(cardDiv)
 }
