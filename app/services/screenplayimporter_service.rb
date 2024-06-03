
class ScreenplayimporterService

    def self.analyse_screenplay(content)
        _ConversationService = ConversationmockService.new

        _ConversationService.upload_text_file(content)

        ai_response = _ConversationService.chat_message("list characters, props, locations, scenes, camera shots, storylines, themes and genres in a pipe separate text") 

        result = { error: 0, content_size: content.length } 
        character_prompt = ""

        #main elements
        lines = ai_response.split("\n").map(&:strip)
        lines.each do |line|
            row = line.split("|").map(&:strip).reject(&:empty?)

            unless row[0].nil?
                case row[0].downcase
                when  "characters"
                    character_prompt = row.drop(1).join(" | ")
                when  "props"
                    result[:props] = row.drop(1)   
                when  "locations"
                    result[:locations] = row.drop(1)   
                when  "scenes"
                    result[:scenes] = row.drop(1)    
                when  "camera shots"
                    result[:camera_shots] = row.drop(1)   
                when  "storylines"
                    result[:storylines] = row.drop(1)   
                when  "themes"
                    result[:themes] = row.drop(1)    
                when  "genres"
                    result[:genres] = row.drop(1)                                                                                                  
                end
            end
        end

        ai_response_characters = _ConversationService.chat_message("describe the characters: #{character_prompt}, in a pipe separate text")

        #characters
        characters = []
        lines = ai_response_characters.split("\n").map(&:strip)
        lines.each do |line|
            row = line.split("|").map(&:strip).reject(&:empty?)

            unless row[0].nil? || row[1].nil?
                characters << {name: row[0], description: row[1]}
            end
        end    

        result[:characters] = characters

        return result
    end

end