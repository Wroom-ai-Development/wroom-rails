# frozen_string_literal: true

require 'rails_helper'

RSpec.describe VoicesController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/voices').to route_to('voices#index')
    end

    it 'routes to #new' do
      expect(get: '/voices/new').to route_to('voices#new')
    end

    it 'routes to #edit' do
      expect(get: '/voices/1/edit').to route_to('voices#edit', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/voices').to route_to('voices#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/voices/1').to route_to('voices#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/voices/1').to route_to('voices#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/voices/1').to route_to('voices#destroy', id: '1')
    end
  end
end
