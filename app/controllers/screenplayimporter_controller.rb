class ScreenplayimporterController < ApplicationController
  def test_form
    render :test_form
  end

  def import_screenplay  

    result = {}

    if params[:screenplay_file].present?
      uploaded_file = params[:screenplay_file]

      if uploaded_file.content_type == "text/plain"
        file_content = uploaded_file.read
        result = ScreenplayimporterService.analyse_screenplay(file_content)
      else
        result = { error: 2, msg: "Invalid file format. Please upload a text file." }
      end
    else
      result = { error: 1, msg: "No file uploaded." }
    end

    render json: result

  end

end


