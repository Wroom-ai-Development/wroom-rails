import { Controller } from "@hotwired/stimulus"


const draggable_folders_id = 'folder-row-NUMBER'
const draggable_documents_id = 'document-row-NUMBER'


let resource_id;
let resource_type;
let dragged_item;
let drop_target;

export default class extends Controller {
  connect() {
  }
  drag_start(event) {
    resource_id = event.target.dataset.resourceId; 
    resource_type = event.target.dataset.draggableType;
    event.dataTransfer.effectAllowed = 'move';
    console.log('drag start');
    console.log(resource_id);
    console.log(resource_type);
  }
  drop(event) {
    event.preventDefault();
    console.log('drop');
    let parent_id = 'draggables';
    console.log('resource id');
    console.log(resource_id);
    console.log(event.target);
    console.log(parent_id);
    drop_target = this.findDropTarget(event.target, parent_id);
    dragged_item = document.querySelector(`[data-resource-id="${resource_id}"]`);
    console.log('drop target')
    console.log(drop_target);
    console.log(dragged_item);

    if (dragged_item == null || drop_target == null) {
      return;
    }
    console.log(drop_target.id)
    if (drop_target.id.includes("folder-row")) {
      console.log('folder drop');
      console.log(drop_target);
      console.log(dragged_item);
      
    }
  }
  drag_end(event) {
    event.preventDefault();
    console.log('drag end');
    if (drop_target == null || dragged_item == null) {
      return;
    }
    // if (drop_target == dragged_item) {
    //   return;
    // }
    if (drop_target.id.includes("folder-row")) {
      console.log('folder drop');
      console.log('drop_target');
      console.log(drop_target);
      console.log('dragged_item');
      console.log(dragged_item);
      let data = JSON.stringify({
        resource_id: resource_id,
        drop_target_id: drop_target.dataset.resourceId,
      });
      let url = dragged_item.dataset.url;
      console.log(url);
      fetch(url, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content,
        },
        body: data
        }
      )
    }
    // event.dataTransfer.clearData();
  }
  drag_over(event) {
    console.log('drag over');
    event.preventDefault();
    return true;
  }

  drag_enter(event) {
    console.log('drag enter');
    event.preventDefault();
  }

  findDropTarget(target, parent_id) {
    // console.log('find drop target');
    if (target === null) {
      console.log('target is null');
      return null;
    }
    if (target.id === parent_id) {
      console.log('target is parent');
      return null;
    }
    if (target.classList.contains("draggable")) {
      console.log('target is draggable');
      return target;
    }
    return this.findDropTarget(target.parentNode, parent_id);
  }
}
