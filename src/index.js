const url = "http://localhost:3000/hogs"
fetch(url)
.then(res => res.json())
.then(data => data.forEach(hog => addHog(hog)))

let form = document.getElementById("hog-form")
let c = document.getElementById("hog-container")

delegate(c)

function delegate(node) {
  node.addEventListener("click", e => {
    if (e.target.classList.contains("btn")) {
      del(node, e.target.dataset.id)
    } else if (e.target.classList.contains("check")) {
      toggleCheck(e.target.dataset.id, e.target.checked)
    }
  })
}

function toggleCheck(id, value) {
  let hog = {
    greased: value,
  }

  fetch(`${url}/${id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hog)
  })
}

function del(node, id) {
  fetch(`${url}/${id}`, { method: "DELETE" })
  .then(res => res.json())
  .then(hog => remove(id))
}

function remove(id) {
  let d = document.querySelector(`[data-id='${id}']`)
  d.innerHTML = ""
}

function addHog(hog) {
  let h = new Hog(hog)
  h.render()
}



form.addEventListener("submit", e => {
  e.preventDefault()
  let hog = {
    name: e.target.name.value,
    specialty: e.target.specialty.value,
    medal: e.target.medal.value,
    ratio: e.target.ratio.value,
    greased: e.target.greased.checked,
    image: e.target.img.value
  }

  fetch(url,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hog)
  })
  .then(res => res.json())
  .then(hog => addHog(hog))
})