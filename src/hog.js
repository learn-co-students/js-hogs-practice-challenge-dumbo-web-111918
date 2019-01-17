const hogs = []

class Hog {
  constructor({id, name, specialty, greased, ratio, medal, image}) {
    this.id = id
    this.name = name
    this.specialty = specialty
    this.greased = greased
    this.ratio = ratio
    this.medal = medal
    this.image = image
    hogs.push(this)
  }

  render() {
    let div = document.getElementById('hog-container ui cards')
    let hog = document.createElement('div')
    div.append(hog)
    hog.setAttribute('id', `hog-${this.id}`)
    hog.dataset.id = this.id
    hog.className = "hog-card"
    hog.innerHTML = `<h3>${this.name}</h3>
    <img src=${this.image}>
    <h4> Specialty: ${this.specialty}</h4>
    <h4> Greased: <input class="grease-check" data-id='${this.id}' type="checkbox" ${this.greased ? "checked": ""}> </h4>
    <h4> Weight by Fridge: ${this.ratio}</h4>
    <h4> Highest Medal Achieved: ${this.medal}</h4>
    <button data-id='${this.id}'' class="delete-btn">Delete ${this.name}</button>
    `
  }

  patchDB(obj) {
    fetch(`http://localhost:3000/hogs/${this.id}`, {
      method: "PATCH",
      body: JSON.stringify(obj),
      headers: {
        'Content-Type' : 'application/json',
      }
    })
  }

  updateDB() {
    fetch('http://localhost:3000/hogs', {
    method:"Post",
    body: JSON.stringify(this),
    headers: {
      'Content-Type' : 'application/json',
       // Accept: "application/json"
     }
   })
   .then(res => res.json())
   .then(e => console.log(e))
  }

  deleteDb() {
    fetch(`http://localhost:3000/hogs/${this.id}`, {
      method: 'delete'
    })
    .then(res => res.json())
    .then(() => {
      hogs.splice(this.id,1)
      let div = document.getElementById('hog-container ui cards')
      let dHog = document.getElementById(`hog-${this.id}`)
      div.removeChild(dHog)
      })
  }

  static renderAll() {
    let div = document.getElementById('hog-container ui cards')
    div.innerHTML = ""
    hogs.forEach(hog => {
      hog.render()
    })
  }

  static findHog(id) {
    return hogs.find(e => Number(e.id) === Number(id))
  }


}
