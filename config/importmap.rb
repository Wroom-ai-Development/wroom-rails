# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
# pin 'trix'
# pin '@rails/actiontext', to: 'actiontext.js'
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin '@editorjs/editorjs', to: 'https://ga.jspm.io/npm:@editorjs/editorjs@2.27.2/dist/editorjs.mjs'
pin '@editorjs/delimiter', to: 'https://ga.jspm.io/npm:@editorjs/delimiter@1.3.0/dist/bundle.js'
pin '@editorjs/inline-code', to: 'https://ga.jspm.io/npm:@editorjs/inline-code@1.4.0/dist/bundle.js'
pin '@editorjs/link', to: 'https://ga.jspm.io/npm:@editorjs/link@2.5.0/dist/bundle.js'
pin '@editorjs/marker', to: 'https://ga.jspm.io/npm:@editorjs/marker@1.3.0/dist/bundle.js'
pin '@editorjs/nested-list', to: 'https://ga.jspm.io/npm:@editorjs/nested-list@1.3.0/dist/nested-list.js'
pin '@editorjs/quote', to: 'https://ga.jspm.io/npm:@editorjs/quote@2.5.0/dist/bundle.js'
pin '@editorjs/simple-image', to: 'https://ga.jspm.io/npm:@editorjs/simple-image@1.5.1/dist/bundle.js'
pin '@editorjs/table', to: 'https://ga.jspm.io/npm:@editorjs/table@2.2.2/dist/table.js'
pin '@editorjs/text-variant-tune', to: 'https://ga.jspm.io/npm:@editorjs/text-variant-tune@1.0.1/dist/text-variant-tune.js'
pin '@editorjs/underline', to: 'https://ga.jspm.io/npm:@editorjs/underline@1.1.0/dist/bundle.js'
pin 'editorjs-header-with-alignment', to: 'https://ga.jspm.io/npm:editorjs-header-with-alignment@1.0.1/dist/bundle.js'
pin 'editorjs-paragraph-with-alignment', to: 'https://ga.jspm.io/npm:editorjs-paragraph-with-alignment@3.0.0/dist/bundle.js'
