# frozen_string_literal: true

require 'rails_helper'

RSpec.describe WroomProjectsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/wroom_projects').to route_to('wroom_projects#index')
    end

    it 'routes to #new' do
      expect(get: '/wroom_projects/new').to route_to('wroom_projects#new')
    end

    it 'routes to #show' do
      expect(get: '/wroom_projects/1').to route_to('wroom_projects#show', id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/wroom_projects/1/edit').to route_to('wroom_projects#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/wroom_projects').to route_to('wroom_projects#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/wroom_projects/1').to route_to('wroom_projects#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/wroom_projects/1').to route_to('wroom_projects#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/wroom_projects/1').to route_to('wroom_projects#destroy', id: '1')
    end
  end
end
