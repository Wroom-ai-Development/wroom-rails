import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="document"
export default class extends Controller {
  connect() {
    console.log("yay")
  }
}
