# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DocumentsController, type: :routing do
  describe 'routing' do

    it 'routes to #new' do
      expect(get: '/documents/new').to route_to('documents#new')
    end

    it 'routes to #edit' do
      expect(get: '/documents/1/edit').to route_to('documents#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/documents').to route_to('documents#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/documents/1').to route_to('documents#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/documents/1').to route_to('documents#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/documents/1').to route_to('documents#destroy', id: '1')
    end
  end
end
