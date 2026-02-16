import './Header.css';

export default function Header({ totalCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="football-icon">⚽</span>
          <h1>况一把查询工具</h1>
          <span className="cny-badge">马年大吉</span>
        </div>
      </div>
    </header>
  );
}
