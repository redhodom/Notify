import "./Support.css";

const Support = () => {
  return (
    <div className="support-page">

      {/* HEADER */}
      <div className="support-header">
        <h2>Support Center</h2>
      </div>

      {/* HERO SECTION */}
      <div className="support-hero">

        <div className="hero-left">
          <img src="noti2.0.png" className="hero-img" />
          <img src="noti3.png" className="hero-glow" />
        </div>

        <div className="hero-right">
          <h1>
            Welcome to <span>Notify</span>
          </h1>

          <p>
            We build immersive music experiences with clean UI, smooth
            interactions, and futuristic design.
          </p>

          <button className="contact-btn">
           <a
  href="mailto:support@freezee.dev?subject=Support Request&body=Hi Freezee Team,%0D%0A%0D%0AI need help with..."
  className="contact-btn"
>
  Contact Support
</a>
          </button>
        </div>

      </div>

      {/* TEAM SECTION */}
      <div className="team-section">

        <h2>Meet the Team</h2>

        <div className="team-card">

          <img src="noti1.png" />

          <h3>Jeeva Freezee</h3>

          <p className="role">Frontend Developer • UI Designer</p>

          <p className="desc">
            Passionate about building modern web apps with smooth UX,
            creative visuals, and performance-focused design.
          </p>

        </div>

      </div>

      {/* SUPPORT INFO */}
      <div className="support-info">

        <h2>Need Help?</h2>

        <p>Email: support@freezee.dev</p>
        <p>Response Time: Within 24 hours</p>

      </div>

    </div>
  );
};

export default Support;