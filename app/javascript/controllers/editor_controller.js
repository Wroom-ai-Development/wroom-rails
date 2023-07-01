import { Controller } from "@hotwired/stimulus";
import EditorJS from "@editorjs/editorjs";

// Connects to data-controller="editor"
export default class extends Controller {
  connect() {
    console.log("yay");
    const targets = ['article_content'];

    this.contentEditor = new EditorJS({})
  }
}
