import './ResultPanel.css';

export default function ResultPanel({ players }) {
  return (
    <section className="result-section">
      <div className="result-header">
        <h2>📋 查询结果</h2>
        <span className="result-count">
          找到 <span>{players.length}</span> 名球员
        </span>
      </div>

      {/* 桌面端表格 */}
      <div className="table-container desktop-table">
        <table>
          <thead>
            <tr>
              <th>球员</th>
              <th>位置</th>
              <th>类型</th>
              <th>背号</th>
              <th>俱乐部</th>
              <th>国籍</th>
              <th>身高</th>
              <th>惯用脚</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.球员}</td>
                <td>{player.位置}</td>
                <td>{player.类型}</td>
                <td>{player.背号}</td>
                <td>{player.俱乐部}</td>
                <td>{player.国籍}</td>
                <td>{player.身高}</td>
                <td>{player.惯用脚}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 移动端卡片 */}
      <div className="cards-container mobile-cards">
        {players.map((player, index) => (
          <div className="player-card" key={index}>
            <div className="player-card-header">
              <span className="player-name">{player.球员}</span>
              <span className="player-type">{player.类型}</span>
            </div>
            <div className="player-card-body">
              <div className="player-info-item">
                <span className="label">位置:</span>
                <span>{player.位置}</span>
              </div>
              <div className="player-info-item">
                <span className="label">背号:</span>
                <span>{player.背号}</span>
              </div>
              <div className="player-info-item">
                <span className="label">俱乐部:</span>
                <span>{player.俱乐部}</span>
              </div>
              <div className="player-info-item">
                <span className="label">国籍:</span>
                <span>{player.国籍}</span>
              </div>
              <div className="player-info-item">
                <span className="label">身高:</span>
                <span>{player.身高}cm</span>
              </div>
              <div className="player-info-item">
                <span className="label">惯用脚:</span>
                <span>{player.惯用脚}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
