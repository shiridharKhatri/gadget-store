import "../styles/Loader.css"

const Loader = ({ size = "medium", color = "primary", text, fullPage = false, className = "", height }) => {
  return (
    <div
      className={`loader-container ${fullPage ? "full-page" : ""} ${className}`}
      style={{
        height: height,
      }}
    >
      <div className={`spinner ${size} ${color}`} aria-label="Loading">
        <div className="spinner-inner"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  )
}

export default Loader

