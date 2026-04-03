import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import artists from "./data/Artist";
import styles from "./AudioPort.module.css";
import songs from "./data/songs";

const AudioPort = () => {
  const location = useLocation();

  const [currentSong, setCurrentSong] = useState(
    location.state || null
  );

  const audioRef = useRef(null);

  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState(null);
  const [queue, setQueue] = useState([]);

  // 🎧 HANDLE PLAY / PAUSE + SOURCE CHANGE
  useEffect(() => {
    if (!audioRef.current || !currentSong?.audio) return;

    const audio = audioRef.current;

    audio.pause();
    audio.src = currentSong.audio;

    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentSong, isPlaying]);

  // ⏱️ TRACK TIME + DURATION
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  // ⏱️ FORMAT TIME (MM:SS)
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
  <h2>Audio Player</h2>

  <div className={styles.headerControls}>
    <span
  className={activeTab === "queue" ? styles.active : ""}
  onClick={() => setActiveTab("queue")}
>
  Queue
</span>
<span
  className={activeTab === "library" ? styles.active : ""}
  onClick={() => setActiveTab("library")}
>
  Library
</span>

<span
  className={activeTab === "profile" ? styles.active : ""}
  onClick={() => setActiveTab("profile")}
>
  Profile
</span>
  </div>
</div>

      <div className={styles.container}>
        {/* SIDEBAR */}
 
    <div className={styles.sidebar}>

  {/* 🎧 CURRENT SONG */}
  <div className={styles.currentBox}>
    {currentSong ? (
      <>
        <img src={currentSong.image} alt="cover" />
        <h4>{currentSong.title}</h4>
        <p>{currentSong.artist}</p>
      </>
    ) : (
      <p>No song playing</p>
    )}
  </div>

  {/* 🎵 SONG LIST (WHEN ARTIST SELECTED) */}
  {selectedArtist && (
    <div className={styles.songList}>
      <h4>{selectedArtist} Songs</h4>

      {songs
        .filter(song => song.artist === selectedArtist)
        .map((song, index) => (
          <div
            key={index}
            className={styles.songItem}
            onClick={() => {
              setCurrentSong(song);
              setIsPlaying(true);
              setQueue(prev =>
  prev.some(s => s.audio === song.audio)
    ? prev
    : [...prev, song]
);
            }}
          >
            <img src={song.image} alt={song.title} />
            <div>
              <p>{song.title}</p>
              <span>{song.artist}</span>
            </div>
          </div>
        ))}
    </div>
  )}

  {/* 🎤 ARTIST LIST */}
  <h3>Top Artist</h3>

  <div className={styles.artistList}>
    {artists.map((artist, index) => (
      <div
        key={index}
        className={`${styles.artistItem} ${
          selectedArtist === artist.name ? styles.active : ""
        }`}
        onClick={() =>
          setSelectedArtist(prev =>
            prev === artist.name ? null : artist.name
          )
        }
      >
        <img src={artist.image} alt={artist.name} />
        <span>{artist.name}</span>
      </div>
    ))}
  </div>

  {/* 🎛️ PANEL SECTION (QUEUE / LIBRARY / PROFILE) */}
  {activeTab && (
    <div className={styles.panel}>

      {/* TITLE */}
      <h4 style={{ marginBottom: "10px" }}>
        {activeTab === "queue" && "Queue"}
        {activeTab === "library" && "Library"}
        {activeTab === "profile" && "Profile"}
      </h4>

      {/* QUEUE */}
      {activeTab === "queue" && (
        queue.length === 0 ? (
          <p>No songs in queue</p>
        ) : (
          queue.map((song, i) => (
            <div key={i} className={styles.panelItem}>
              <img src={song.image} />
              <span>{song.title}</span>
            </div>
          ))
        )
      )}

      {/* LIBRARY */}
      {activeTab === "library" && (
        songs.map((song, i) => (
          <div
            key={i}
            className={styles.panelItem}
            onClick={() => {
              setCurrentSong(song);
              setIsPlaying(true);
            }}
          >
            <img src={song.image} />
            <span>{song.title}</span>
          </div>
        ))
      )}

      {/* PROFILE */}
      {activeTab === "profile" && (
        <div className={styles.profileBox}>
          <img src="noti1.png" />
          <h4>Jeeva Freezee</h4>
          <p>Frontend Dev • UI Designer</p>
        </div>
      )}

    </div>
  )}

</div>
        {/* PLAYER */}
        <div className={styles.playerArea}>
          {currentSong ? (
            <>
              <audio ref={audioRef} />

              {/* BACKGROUND */}
              <div
                className={styles.bg}
                style={{
                  backgroundImage: `url(${currentSong.image})`,
                }}
              />

              {/* CARD */}
              <div className={styles.card}>
                <img
                  src={currentSong.image}
                  className={styles.cover}
                  alt="cover"
                />

                <h2>{currentSong.title}</h2>
                <p>{currentSong.artist}</p>

                {/* CONTROLS */}
                <div className={styles.playerControls}>
                  <button
                    onClick={() => {
                      audioRef.current.currentTime = 0;
                    }}
                  >
                    ⏮
                  </button>

                  <button
                    className={styles.play}
                    onClick={() => setIsPlaying((prev) => !prev)}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>

                  <button>⏭</button>
                </div>

                {/* PROGRESS BAR */}
                <div className={styles.progressWrapper}>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={progress}
                    onChange={(e) => {
                      const value = e.target.value;
                      audioRef.current.currentTime = value;
                      setProgress(value);
                    }}
                  />

                  <div className={styles.time}>
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* VOLUME */}
                <div className={styles.volume}>
                  🔊
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    defaultValue="1"
                    onChange={(e) => {
                      audioRef.current.volume = e.target.value;
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className={styles.empty}>Select a song</p>
          )}
        </div>
      </div>
<div className={styles.footer}>
  <span className={styles.footerText}>
    Unlimited music. No ads.
  </span>

  <button className={styles.footerBtn}>
    Upgrade
  </button>
</div>
    </div>
  );
};

export default AudioPort;