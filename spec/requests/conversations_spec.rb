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

RSpec.describe '/conversations', type: :request do
  # This should return the minimal set of attributes required to create a valid
  # Conversation. As you add validations to Conversation, be sure to
  # adjust the attributes here as well.
  let!(:user) { create(:user) }
  let(:valid_attributes) do
    {
      user_id: user.id
    }
  end

  let(:invalid_attributes) do
    {
      title: 'Title'
    }
  end

  before do
    sign_in(user)
  end

  describe 'POST /add_user_message' do
    it 'adds user message to conversation' do
      conversation = create(:conversation, user:)
      post add_user_message_conversation_url(conversation), params: { content: 'message content' }
      message = Message.last
      expect(response).to have_http_status(:found)
      expect(message.content).to eq('message content')
      expect(message.role).to eq('user')
    end
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Conversation.create! valid_attributes
      get conversations_url
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      conversation = Conversation.create! valid_attributes
      get conversation_url(conversation)
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get new_conversation_url
      expect(response).to be_successful
    end
  end

  describe 'GET /edit' do
    it 'renders a successful response' do
      conversation = Conversation.create! valid_attributes
      get edit_conversation_url(conversation)
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Conversation' do
        expect do
          post conversations_url, params: { conversation: valid_attributes }
        end.to change(Conversation, :count).by(1)
      end

      it 'redirects to the created conversation' do
        post conversations_url, params: { conversation: valid_attributes }
        expect(response).to redirect_to(conversation_url(Conversation.last))
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Conversation' do
        expect do
          post conversations_url, params: { conversation: invalid_attributes }
        end.to change(Conversation, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post conversations_url, params: { conversation: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        { title: 'New Title' }
      end

      it 'updates the requested conversation' do
        conversation = Conversation.create! valid_attributes
        patch conversation_url(conversation), params: { conversation: new_attributes }
        conversation.reload
        expect(conversation.title).to eq('New Title')
      end

      it 'redirects to the conversation' do
        conversation = Conversation.create! valid_attributes
        patch conversation_url(conversation), params: { conversation: new_attributes }
        conversation.reload
        expect(response).to redirect_to(conversation_url(conversation))
      end
    end

    context 'with invalid parameters' do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        conversation = Conversation.create! valid_attributes
        patch conversation_url(conversation), params: { conversation: { user_id: nil } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested conversation' do
      conversation = Conversation.create! valid_attributes
      expect do
        delete conversation_url(conversation)
      end.to change(Conversation, :count).by(-1)
    end

    it 'redirects to the conversations list' do
      conversation = Conversation.create! valid_attributes
      delete conversation_url(conversation)
      expect(response).to redirect_to(conversations_url)
    end
  end
end
