ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :role, :confirmation_token, :confirmed_at, :confirmation_sent_at, :first_name, :last_name, :onboarded, :current_document_id, :tokens_used, :security_updated, :gpt_4_enabled, :current_folder_id, :storage_used, :subscription_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :role, :confirmation_token, :confirmed_at, :confirmation_sent_at, :first_name, :last_name, :onboarded, :current_document_id, :tokens_used, :security_updated, :gpt_4_enabled, :current_folder_id, :storage_used, :subscription_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
