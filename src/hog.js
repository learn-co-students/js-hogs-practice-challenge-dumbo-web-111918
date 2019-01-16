let hogs = []
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
    let c = document.getElementById("hog-container")
    let hog = document.createElement("div")
    hog.dataset.id = this.id
    hog.className = "centered"
    hog.innerHTML = `<h3>${this.name}</h3>
    <div class="row">
      <img src="${this.image}" width="300px"/>
      <div class="centered">
        <h4>Specialty: <span>${this.specialty}</span></h4>
        <h4>Greased: <input class="check" data-id=${this.id} type="checkbox" ${this.greased && "checked"} /></h4>
        <h4>Weight Ratio to Refrigerator: <span>${this.ratio}</span></h4>
        <h4>Highest Medal Obtained: <span>${this.medal}</span></h4>
        <button class="btn" data-id=${this.id} >Delete</button>
      </div>
    </div>`
    c.append(hog)
  }
}