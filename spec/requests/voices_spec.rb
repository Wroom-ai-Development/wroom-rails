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

RSpec.describe '/voices', type: :request do
  # This should return the minimal set of attributes required to create a valid
  # Voice. As you add validations to Voice, be sure to
  # adjust the attributes here as well.
  let(:voice_user) { create(:user) }
  let(:valid_attributes) do
    {
      name: 'asdasd',
      user_id: voice_user.id
    }
  end

  let(:invalid_attributes) do
    {
      name: '',
      user_id: nil
    }
  end

  before do
    sign_in(voice_user)
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Voice.create! valid_attributes
      get voices_url
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get new_voice_url
      expect(response).to be_successful
    end
  end

  describe 'GET /edit' do
    it 'renders a successful response' do
      voice = Voice.create! valid_attributes
      get edit_voice_url(voice)
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Voice' do
        expect do
          post voices_url, params: { voice: valid_attributes }
        end.to change(Voice, :count).by(1)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Voice' do
        expect do
          post voices_url, params: { voice: invalid_attributes }
        end.to change(Voice, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post voices_url, params: { voice: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        {
          name: 'another valid name'
        }
      end

      it 'updates the requested voice' do
        voice = Voice.create! valid_attributes
        patch voice_url(voice), params: { voice: new_attributes }
        voice.reload
        expect(voice.name).to eq(new_attributes[:name])
      end
    end

    context 'with invalid parameters' do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        voice = Voice.create! valid_attributes
        patch voice_url(voice), params: { voice: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

end
