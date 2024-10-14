import React, { useState, useEffect, useRef } from 'react';
import './Izindatshana.css';

const Izindatshana = () => {
  const [story, setStory] = useState(''); // Full story text
  const [audioPreview, setAudioPreview] = useState(''); // URL for preview audio
  const [audioFull, setAudioFull] = useState(''); // URL for full audio
  const [paid, setPaid] = useState(false); // To check if the full version is unlocked
  const [loading, setLoading] = useState(false); // Loading state for fetching story
  const [error, setError] = useState(''); // Error handling
  const [previewShown, setPreviewShown] = useState(false); // Preview shown flag
  const [displayedText, setDisplayedText] = useState(''); // Text progressively revealed
  const [isPlaying, setIsPlaying] = useState(false); // Audio play state
  const audioPlayer = useRef(null); // Reference to audio player
  const speechRef = useRef(null); // Reference to SpeechSynthesis API

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    setLoading(true);
    try {
      const storyText = `
Isisho Sezinkanyezi
Ekhaya elincane elisemaphandleni aphakeme, lapho izintaba ezinkulu zikhukhuleka khona, kwakukhona ibali elidumile ngendawo ethokomele, eyayiwumgibeli wehlathi elithokozisayo elingaphezulu kwezintaba. Lezi zindawo zazihlala zikhanya ngombala owakhayo, zinezakhiwo eziluhlaza ezithokozisayo.

Abahlali bendawo babekhuluma ngalezi zinkanyezi ezithokozisayo ezazivela emithini. Izihlahla zazikhuluma ngama-secrets, zisho imiyalezo emikhulu nezifundo ezikhanyayo. Kwakukhona izihlahla ezincane eziphakamisayo izinyawo zazo, ezazingenamikhawulo, futhi zibhalela ezinkanyezi, futhi zazizolile, zikhalela ezindabeni zomhlaba.

Kwakukhona intombazane encane, uThandi, owayethanda kakhulu leli hlathi. Ngenkathi abanye bebazama ukuhamba kude, uThandi wayekwazi ukuhamba ngezinyawo ezithokozisayo, azibophezele kulolu hlobo lwenkanyezi. Wayelalela izimfihlo ezazizwakala phakathi kwezihlahla, futhi wayekwazi ukuhlangana nezilwane ezazihamba zodwa.

Ngelinye ilanga, ngesikhathi elingaka phakathi kwezihlahla, uThandi wahlangana nephupho. Ukhanya komoya kwazisa ukuba izinto ezinhle zikhona, bese ezifihla kuzo. Ihlathi laqala ukuchichima ngezakhiwo ezithokozisayo. Lokhu kwaba isikhathi sokuhlola, lapho uThandi ehamba phakathi kwezihlahla, edinga izimfihlo ezikhanyayo.

Wathola izinyoni ezibhalayo izinkanyezi, izinyoka ezizolile, nezingwenya ezithokozisayo. Wazazi izimfihlo eziningi, ezazigcwele uthando nolwazi. UThandi wanethemba lokuthi uzothola izimfihlo ezihamba phambili, ezizomkhumbuza ukuthi uhamba ngendlela efanele.

Ngemuva kokuba edlule esikhathini esithokozisayo, uThandi wabona izinto eziyingozi zenzeka. Kwakukhona umoya omubi ophuma kwi-intaba, ubhalela ubunzima obubambene. UThandi wanquma ukuba enze izinqumo, ukuze avikele leli hlathi. Wafuna abantu bendawo ukuba bazi, abahlali abahlala emaphandleni. Umoya ophakeme waba namandla, uThandi wayazi ukuthi abahlali kumele balwe nezinsizi.

Wachaza izimfihlo ezinkulu kuzo zonke izihlahla, izinyoni zaziphoqelekile ukuba zikhulume ngempela. Lokhu kwaqhakambisa umoya wesithunzi phakathi kwabantu, futhi wathola ukuthokozisa. UThandi wayeqonda kahle ukuthi lezi zinto zaziyimfihlo, futhi kwaziswe abantu bonke, kanti umhlaba uzojabulisa.

Ekugcineni, abahlali baqonda ukuthi izimfihlo ezingcwele ezitholakala emhlathini zidinga ukufundwa. UThandi wanqoba umoya, futhi umhlaba wabe usukhanya ngempela. Umuntu ngamunye wathola ukuthi lezi zinkanyezi zazingamathafa, izimfihlo zifihlwa phakathi kwethafa. Lezi zinto zaziphila, zaze zaba yinto yokuthi kufanele zishiywe, zikhumbuze ukuthokozisa nomoya omusha.

UThandi waphenduka ethekwini, edlula kwezintaba, eqonda ukuthi ibali lakhe selithathe umqondo omuhle, kanti zonke izimfihlo eziyimfihlo ziwubuchopho bemvelo. Ngalesi sikhathi, abahlali baye baqonda ukuthi izinkanyezi zifuna ukuhamba ngokubona, futhi ubuhle buzoqhubeka buhlala phakade phakathi kwezihlahla ezithokozisayo...`; // Example truncated
      setStory(storyText);

      // Set sample audio URLs for testing
      setAudioPreview('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
      setAudioFull('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
    } catch (err) {
      setError('Error loading the story. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const showPreview = () => {
    setPreviewShown(true);
    setTimeout(() => {
      setPaid(true); // Unlock the full story after 5 seconds
      setDisplayedText(''); // Reset displayed text when full story is unlocked
    }, 5000);
  };

  const handleAudioProgress = () => {
    if (audioPlayer.current) {
      const currentTime = audioPlayer.current.currentTime;
      const totalDuration = audioPlayer.current.duration;
      if (isPlaying && totalDuration > 0) {
        const percentage = currentTime / totalDuration;
        const charsToDisplay = Math.floor(percentage * story.length);
        setDisplayedText(story.substring(0, charsToDisplay));
      }
    }
  };

  const startReading = () => {
    if (speechRef.current) {
      // Cancel any ongoing speech before starting a new one
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(story);
    utterance.lang = 'zu-ZA'; // Set the language to Zulu
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="izindatshana-main text-center">
      <h1 className="display-4 text-warning">Izindaba Ezimfishane</h1>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="story-content border border-warning rounded p-4 shadow-lg">
          <div className="story-display">
            <p className="story-display-text">{displayedText}</p>
          </div>
          <audio
            src={paid ? audioFull : audioPreview}
            controls
            ref={audioPlayer}
            onPlay={() => {
              setIsPlaying(true);
              handleAudioProgress(); // Start tracking audio progress
            }}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleAudioProgress} // Continuously update displayed text
          />
          {!paid && !previewShown && (
            <button onClick={showPreview} className="btn btn-info">
              Preview Story for 5 Seconds
            </button>
          )}
          {paid && (
            <p className="full-story-message text-success mt-3">Enjoy the full story!</p>
          )}
         <div className="button-container">
             <button className="btn-info" onClick={startReading}>Read Story Aloud</button>
             <button className="btn-info" onClick={stopReading}>Stop Reading</button>
           </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default Izindatshana;
