# frozen_string_literal: true

class WroomController < ApplicationController
  layout 'wroom'

  def app # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    create_welcome_records unless current_user.onboarded?

    @project = if params[:project_id].present?
                 Project.find(params[:project_id])
               elsif current_user.current_project_id.present?
                 Project.find(current_user.current_project_id)
               elsif current_user.projects.any?
                 current_user.projects.first
               end
    if @project
      current_user.update!(current_project_id: @project.id)
    else
      create_no_project_messages
    end
  end

  private

  def create_no_project_messages
    service = OpenaiService.new
    @message = '☚ Have you created any projects yet?'

    @haiku = service.chat_completion([{
                                       role: 'user',
                                       content: 'Write a haiku about starting a new venture.'
                                     }],
                                     'gpt-3.5-turbo', 1000)
  end

  def create_welcome_records
    create_welcome_source
    create_welcome_voices
    current_user.update!(onboarded: true)
  end

  def create_welcome_source # rubocop:disable Metrics/MethodLength
    source = Source.create!(
      user_id: current_user.id,
      name: "'Sympathy' by Emily Brontë",
      fileless: true,
      title: 'Sympathy',
      author: 'by Emily Brontë',
      year_published: '1846',
      text_category: 'poem',
      project: current_user.projects.first
    )
    poem = <<-POEM
      There should be no despair for you
      While nightly stars are burning;
      While evening pours its silent dew,
      And sunshine gilds the morning.
      There should be no despair—though tears
      May flow down like a river:
      Are not the best beloved of years
      Around your heart for ever?

      They weep, you weep, it must be so;
      Winds sigh as you are sighing,
      And winter sheds its grief in snow
      Where Autumn’s leaves are lying:
      Yet, these revive, and from their fate
      Your fate cannot be parted:
      Then, journey on, if not elate,
      Still, NEVER broken-hearted!
    POEM
    source.parse_document_chunks_from_text(poem)
  end

  def create_welcome_voices
    voices = [
      ['Pirate', 'Speak like a pirate'],
      ['Worried mother', 'Speak like a mother who is constantly worried about her child.'],
      ['Hepcat', 'Speak like a hepcat']
    ]
    voices.each do |voice|
      current_user.voices.create(name: voice[0], meta_prompt: voice[1])
    end
  end
end
