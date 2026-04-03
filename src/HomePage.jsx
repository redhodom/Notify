import React, { useState } from 'react';
import { useRef, useEffect } from "react";
import MusicCard from './components/MusicCard';
import songs from "./data/songs";
import artists from "./data/Artist";
import notify from "/notilogo.png";
import './App.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [showPlaylist, setShowPlaylist] = useState(false);

const [playlists, setPlaylists] = useState([]);
const [newPlaylistName, setNewPlaylistName] = useState("");
const [activePlaylist, setActivePlaylist] = useState(null);

useEffect(() => {
 if (!audioRef.current || !currentSong || !currentSong.audio) return;

  audioRef.current.pause(); // 🔥 stop previous

  audioRef.current.src = currentSong.audio;

  if (isPlaying) {
    audioRef.current.play().catch(() => {});
  }
}, [currentSong, isPlaying]);

  return (
    <>
    <header className="header">

      {/* LEFT */}
      <div className="left">
        <div className="logo">
          <img src={notify} alt="logo" />
        </div>
      </div>

      {/* CENTER */}
      <div className="center">
        <div className="search">
          <input type="text" placeholder="Search what you want..." />
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">

        <nav className={`menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/auth" onClick={() => setMenuOpen(false)}>Sign-up</Link>
          <Link to="/auth" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/Support" onClick={() => setMenuOpen(false)}>Support</Link>
          <Link to="#" onClick={() => setShowPlaylist(true)}>Playlist</Link>
        </nav>

         <button 
          className="nav-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

    </header>

    {showPlaylist && (
  <div className="playlist-panel">

    <div className="playlist-header">
      <h3>Your Playlists</h3>
      <button onClick={() => setShowPlaylist(false)}>✖</button>
    </div>

    {/* CREATE */}
    <div className="playlist-create">
      <input
        type="text"
        placeholder="New playlist..."
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
      />
      <button
        onClick={() => {
          if (!newPlaylistName) return;

          setPlaylists([
            ...playlists,
            { name: newPlaylistName, songs: [] }
          ]);

          setNewPlaylistName("");
        }}
      >
        Create
      </button>
    </div>

    {/* LIST */}
    <div className="playlist-list">
      {playlists.map((pl, index) => (
        <div
          key={index}
          className={`playlist-item ${activePlaylist === index ? "active" : ""}`}
          onClick={() => setActivePlaylist(index)}
        >
          <span>{pl.name}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setPlaylists(playlists.filter((_, i) => i !== index));
            }}
          >
            🗑
          </button>
        </div>
      ))}
    </div>

    {/* SONGS INSIDE PLAYLIST */}
    {activePlaylist !== null && (
      <div className="playlist-songs">
        <h4>{playlists[activePlaylist].name}</h4>

        {playlists[activePlaylist].songs.map((song, i) => (
          <div key={i}>{song.title}</div>
        ))}
      </div>
    )}

  </div>
)}

{/* Main content area */}

    <main className="layout">

  {/* LEFT SIDEBAR */}
  <aside className="sidebar">

  <div className="artist-container">
    <h2>Top Artist</h2>

    <div className="artist-list">
      {artists.map((artist, index) => (
        <a 
          key={index} 
          href={artist.link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div className="artist-item">
            <img src={artist.image} alt={artist.name} />
            <span>{artist.name}</span>
          </div>
        </a>
      ))}
    </div>
  </div>

 <div className={`player ${currentSong ? "active" : ""}`}>

  {currentSong ? (
    <>
      <img src={currentSong?.image} alt={currentSong.title} className="player-img" />
      <h4>{currentSong.title}</h4>
      <p>{currentSong.artist}</p>
    </>
  ) : (
    <p>No song playing</p>
  )}

</div>

</aside>

  {/* MAIN CONTENT */}
<section className="music-grid">
  {songs.map((song, index) => (
  <MusicCard 
  key={index} 
  song={song} 
  currentSong={currentSong}
  isPlaying={isPlaying}
  onPlay={(song) => {
    if (currentSong?.audio === song.audio) {
      setIsPlaying(prev => !prev);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  }}
  onAdd={(song) => {
   if (activePlaylist === null) {
  alert("Select a playlist first");
  return;
}
    const updated = [...playlists];
    updated[activePlaylist].songs.push(song);

    setPlaylists(updated);
  }}
/>
  ))}
</section>

</main>

<footer className="footer">

  <div className="footer-text">
    <p>
      Sign up to get unlimited songs and podcasts with occasional ads.
      <span> No credit card needed.</span>
    </p>
  </div>

  <div className="footer-action">
    <button className="signup-btn">Sign Up Free</button>
  </div>

</footer>
<audio ref={audioRef}></audio>
</>
  );
};

export default HomePage;