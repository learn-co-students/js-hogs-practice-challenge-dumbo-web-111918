const url = 'http://localhost:3000/hogs'

document.addEventListener("DOMContentLoaded", () => {
  const hogForm = document.getElementById('hog-form')
  const hogContainer = document.getElementById('hog-container ui cards')

  hogForm.addEventListener('submit', addHog)
  hogContainer.addEventListener('click', delegateButtons)


  getFromDB()

})

function delegateButtons(e) {
  if (e.target.className == "delete-btn") {
    let id = e.target.dataset.id
    let hog = Hog.findHog(id)
    hog.deleteDb()
  } else if (e.target.className =="grease-check") {
    let id = e.target.dataset.id
    let hog = Hog.findHog(id)
    hog.patchDB({greased: !hog.greased})
    e.target.checked = !hog.greased
  }
}


function addHog(e) {
  e.preventDefault()
  let data = {
    name: e.target.name.value,
    specialty: e.target.specialty.value,
    medal: e.target.medal.value,
    ratio: e.target.weight.value,
    image: e.target.img.value,
    greased: e.target.greased.checked
  }
  let hog = new Hog(data)
  hog.updateDB()
  Hog.renderAll()
}


function getFromDB() {
  fetch(url)
  .then(res => res.json())
  .then(pigs => {
    pigs.forEach( hogData => {
      let piggy = new Hog(hogData)
      piggy.render()
    })
  })
  .catch(error => console.log(error))
}
