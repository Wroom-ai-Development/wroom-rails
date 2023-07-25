import { Controller } from "@hotwired/stimulus"
import debounce from 'lodash.debounce'
// Connects to data-controller="document"
export default class extends Controller {
  connect() {
    this.formData = new FormData(this.element)
    // this.form = this.element.closes
    this.url = this.element.action + "/autosave"
    const delay = parseInt(this.element.dataset.autosaveDelay);
    const requestToDelay = () => this.sendRequest(this.url, this.formData)
    this.debouncedRequest = debounce(requestToDelay, delay)
  }

  save() {
    this.formData = new FormData(this.element)
    this.debouncedRequest(this.url, this.formData)
  }

  sendRequest(url, formData) {

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
