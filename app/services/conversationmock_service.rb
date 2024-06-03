# This class will be removed

class ConversationmockService
  
  def upload_text_file(content)
	 return 
  end

  def chat_message(prompt)
    puts prompt
    if prompt.start_with?("list characters")
      return @@ai_sample_response_groundhog
    elsif prompt.start_with?("describe the characters")
      return @@ai_sample_response_groundhog_characters
    end
  end

  @@ai_sample_response_whiplash = %q{
    Category | Details
    Characters | Andrew Neiman | Fletcher | Nicole | Jim | Moviegoer | Partygoers | Young Man | Second Young Man
    Props | Drum set | Drumsticks | Coat | Backpack with patches | Concessions (popcorn, Raisinets, sodas) | Movie tickets | Pills in a Ziplock bag
    Locations | Nassau Band Rehearsal Studio (Gehring Hall) | Shaffer Conservatory of Music | New York Street (near Shaffer Conservatory) | Movie Theater (Lobby and Theater) | Dormitory (Hallway and Room)
    Scenes | 1. Nassau Band Rehearsal Studio, Gehring Hall - Night (Andrew practicing drums, Fletcher enters, interaction) | 2. New York Street, Shaffer Conservatory - Night (Andrew exits the conservatory and walks through the city) | 3. Movie Theater Lobby - Night (Andrew buys concessions from Nicole) | 4. Movie Theater - Moments Later (Andrew joins his dad, they talk before the movie starts) | 5. Dormitory Hallway - Hours Later (Andrew walks through a noisy hallway, witnesses a drug deal, goes to his room)
    Camera Shots | Close-up (of Andrew drumming) | Wide shot (of the band room) | Medium shot (of Fletcher and Andrew) | Tracking shot (following Andrew on the street) | Two-shot (Andrew and Nicole at the concessions counter) | Over-the-shoulder shot (Andrew looking at Nicole) | Close-up (of Andrew and his dad exchanging items) | Medium shot (of Andrew and his dad talking) | Wide shot (of the dormitory hallway) | Close-up (of the drug deal transaction)
    Storylines | A young drummer, Andrew Neiman, strives to achieve greatness at a prestigious music conservatory under the tutelage of an intense and abusive instructor, Fletcher. | Andrew balances his rigorous practice schedule with personal relationships, including a budding romance with Nicole and interactions with his supportive yet concerned father, Jim. | The intense mentorship and psychological manipulation by Fletcher push Andrew to his physical and emotional limits, leading to a dramatic climax.
    Themes | The pursuit of perfection | The cost of ambition | The student-mentor relationship | Psychological manipulation and abuse | Sacrifice and obsession | The nature of greatness and success
    Genres | Drama | Music | Psychological Thriller     
} 

@@ai_sample_response_groundhog = %q{
    Characters | Phil Connors | Gil Hawley | Rita Hanson | Hibernating Groundhogs
    Props | Blank green wall | Monitor | National weather map | Team pictures of the Steelers | Framed memorial portrait of Roberto Clemente | Local Emmy award statue | Erasable weather map | Pile of coats | Stolen airline blanket | Weather stats chart | Phil's Phorecast caricature
    Locations | Forest clearing | TV Studio | Western Pennsylvania | Pittsburgh | Phil Connors' Office | Channel 9 Action News office suite | WPGH Pittsburgh studio | Action News set
    Scenes | Phil gesticulating at the green wall in the TV studio | Streaking across winter landscape | Zooming into Pittsburgh building | Phil's cluttered office | Hawley waking Phil | Hawley and Phil arguing about the groundhog story | Phil preparing weather stats in the studio | Hawley assigning Rita to the groundhog story | Phil and Rita discussing the assignment
    Camera Shots | Hibernating groundhogs close-up | Forest clearing wide shot | TV Studio interior | Aerial shot of winter landscape | Pittsburgh skyline zoom-in | Close-up of Phil's cluttered office | Office suite tracking shot | Studio interior wide shot | Close-up of Phil's Phorecast chart | Medium shot of Phil and Rita interaction
    Storylines | Phil Connors is a weatherman reluctantly assigned to cover the Groundhog Day story | Phil's dissatisfaction with his repetitive assignments | Phil's interaction with his colleagues, highlighting his cynicism and reluctance | Introduction of Rita Hanson as Phil's new colleague on the groundhog story assignment
    Themes | Repetition and monotony | Reluctance and obligation | Cynicism vs. enthusiasm | Professional duty vs. personal desire
    Genres | Comedy | Fantasy | Romance        
}

@@ai_sample_response_groundhog_characters = %q{
    Phil Connors | A mid-thirties, smart, rugged-looking weatherman who is perhaps a little too full of himself but has a lot of personality. He is reluctant to cover the Groundhog Day event again and displays a mix of humor and cynicism​​.
    Gil Hawley | Executive Producer of the Action News. He is authoritative and persistent, pushing Phil to cover the Groundhog Day event despite Phil's reluctance. He has a practical approach to news coverage and a no-nonsense attitude​​.
    Rita Hanson | A very attractive segment producer in her late twenties, relatively new to the station but very competent, personable, humorous, self-assured, and very pretty. She finds Phil appealing in an odd way despite knowing his less-than-stellar reputation​      
}    

@@ai_sample_response_interstellar = %q{
    Characters | ANSEN | ASSISTANT | NSA AGENT | GOVERNMENT MEN (NSA, DIA) 
    Props  | Neutron star | Black hole | SUV | Coffee cup | Printouts | Monitors | Phone | Projector |
    Locations | Space | High desert east of the Cascades | Warehouse control room | LIGO offices, Caltech, Pasadena | LIGO director's office, Caltech | Main conference room, LIGO, Caltech 
    Scenes | Space, showing a neutron star and a black hole | The wave traveling to Earth, a warehouse, and a vacuum chamber | The SUV arriving at the LIGO facility | Control room at LIGO | LIGO offices with researchers and Ansen | 
    Camera Shots | Wide shots of space and celestial events | Tracking shots following the wave | Close-ups of monitors and printouts | Wide shot of the LIGO office frenzy | Close-up of the assistant on the phone | 
    Storylines | The collision of a neutron star with a black hole | Detection of gravitational waves at LIGO | Government's involvement and reaction to the discovery | 
    Themes | The vastness and power of the universe | Human curiosity and scientific discovery | The intersection of science and government | The potential for extraterrestrial contact | 
    Genres | Science fiction | Drama | Thriller |       
}

end
