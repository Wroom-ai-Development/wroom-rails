# frozen_string_literal: true

require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe '/folders', type: :request do
  # This should return the minimal set of attributes required to create a valid
  # Folder. As you add validations to Folder, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    skip('Add a hash of attributes valid for your model')
  end

  let(:invalid_attributes) do
    skip('Add a hash of attributes invalid for your model')
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Folder.create! valid_attributes
      get folders_url
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      folder = Folder.create! valid_attributes
      get folder_url(folder)
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get new_folder_url
      expect(response).to have_http_status(:found)
    end
  end

  describe 'GET /edit' do
    it 'renders a successful response' do
      folder = Folder.create! valid_attributes
      get edit_folder_url(folder)
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Folder' do
        expect do
          post folders_url, params: { folder: valid_attributes }
        end.to change(Folder, :count).by(1)
      end

      it 'redirects to the created folder' do
        post folders_url, params: { folder: valid_attributes }
        expect(response).to redirect_to(folder_url(Folder.last))
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Folder' do
        expect do
          post folders_url, params: { folder: invalid_attributes }
        end.to change(Folder, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post folders_url, params: { folder: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested folder' do
        folder = Folder.create! valid_attributes
        patch folder_url(folder), params: { folder: new_attributes }
        folder.reload
        skip('Add assertions for updated state')
      end

      it 'redirects to the folder' do
        folder = Folder.create! valid_attributes
        patch folder_url(folder), params: { folder: new_attributes }
        folder.reload
        expect(response).to redirect_to(folder_url(folder))
      end
    end

    context 'with invalid parameters' do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        folder = Folder.create! valid_attributes
        patch folder_url(folder), params: { folder: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested folder' do
      folder = Folder.create! valid_attributes
      expect do
        delete folder_url(folder)
      end.to change(Folder, :count).by(-1)
    end

    it 'redirects to the folders list' do
      folder = Folder.create! valid_attributes
      delete folder_url(folder)
      expect(response).to redirect_to(folders_url)
    end
  end
end
