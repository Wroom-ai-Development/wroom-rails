import { Controller } from "@hotwired/stimulus"
import debounce from 'lodash.debounce'
// Connects to data-controller="project"
export default class extends Controller {
  connect() {
    console.log("yay");
    console.log(this.element)
    this.formData = new FormData(this.element)
    console.log(this.formData)
    // this.form = this.element.closes
    this.url = this.element.action + "/autosave"
    console.log(this.url)
    const delay = parseInt(this.element.dataset.autosaveDelay);
    const requestToDelay = () => this.sendRequest(this.url, this.formData)
    this.debouncedRequest = debounce(requestToDelay, delay)
  }

  save() {
    this.formData = new FormData(this.element)
    this.debouncedRequest(this.url, this.formData)
  }

  sendRequest(url, formData) {
    console.log("sending request to" + this.url)

    fetch(url, {
      method: 'post',
      body: formData,
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content
      },
      credentials: 'same-origin'
    })
  }
}
