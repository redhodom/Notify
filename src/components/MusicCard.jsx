import { useNavigate } from "react-router-dom";

const MusicCard = ({ song, onPlay, onAdd, currentSong, isPlaying }) => {

  const navigate = useNavigate();

  const handlePlay = (e) => {
    e.stopPropagation(); // prevent navigation
    onPlay(song);
  };

  const handleNavigate = () => {
    navigate("/player", { state: song });
  };

  const isCurrent = currentSong?.audio === song.audio;

  return (
    <div className="music-card">

      {/* 🔥 IMAGE CLICK = NAVIGATE */}
      <img 
        src={song.image} 
        alt={song.title} 
        className="cover"
        onClick={handleNavigate}
      />

      <div className="info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>

      {/* 🔥 CONTROLS */}
      <div className="controls">

        <button onClick={handlePlay}>
  {isCurrent && isPlaying ? "⏸" : "▶"}
</button>

        <button
  onClick={(e) => {
    e.stopPropagation();
    onAdd(song);
  }}
>
  ＋
</button>

        <button onClick={(e) => e.stopPropagation()}>
          ☰
        </button>

      </div>
    </div>
  );
};

export default MusicCard;