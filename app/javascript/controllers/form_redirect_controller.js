import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form-redirect"
export default class extends Controller {
  next(event) {
    if (event.detail.success) {
      const fetchResponse = event.detail.fetchResponse

      history.pushState(
        { turbo_frame_history: true },
        "",
        fetchResponse.response.url
      )

      Turbo.visit(fetchResponse.response.url)
    }
  }
}
