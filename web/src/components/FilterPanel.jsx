import { useState } from 'react';
import { POSITION_GROUPS, LEAGUE_GROUPS, CONTINENTS, PLAYER_TYPES } from '../data/constants';
import './FilterPanel.css';

export default function FilterPanel({ filters, setFilters, onSearch, onReset, dropdownOptions }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section className="filter-section">
      <div className="filter-header">
        <h2>🔍 筛选条件</h2>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '展开' : '收起'}
        </button>
      </div>

      <div className={`filter-content ${collapsed ? 'collapsed' : ''}`}>
        {/* 位置筛选 */}
        <div className="filter-group">
          <div className="filter-group-title">
            <span className="icon">📍</span> 位置筛选
          </div>
          <div className="filter-row">
            <div className="filter-item">
              <label>位置组别</label>
              <select
                value={filters.positionGroup}
                onChange={e => handleChange('positionGroup', e.target.value)}
              >
                {Object.keys(POSITION_GROUPS).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>排除组别</label>
              <select
                value={filters.positionExclude}
                onChange={e => handleChange('positionExclude', e.target.value)}
              >
                {Object.keys(POSITION_GROUPS).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>精确位置</label>
              <select
                value={filters.position}
                onChange={e => handleChange('position', e.target.value)}
              >
                <option value="">全部</option>
                {dropdownOptions.positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 联赛筛选 */}
        <div className="filter-group">
          <div className="filter-group-title">
            <span className="icon">🏟️</span> 联赛/俱乐部
          </div>
          <div className="filter-row">
            <div className="filter-item">
              <label>联赛分组</label>
              <select
                value={filters.leagueGroup}
                onChange={e => handleChange('leagueGroup', e.target.value)}
              >
                {Object.keys(LEAGUE_GROUPS).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>排除联赛</label>
              <select
                value={filters.leagueExclude}
                onChange={e => handleChange('leagueExclude', e.target.value)}
              >
                {Object.keys(LEAGUE_GROUPS).map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>精确俱乐部</label>
              <select
                value={filters.club}
                onChange={e => handleChange('club', e.target.value)}
              >
                <option value="">全部</option>
                {dropdownOptions.clubs.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 国籍筛选 */}
        <div className="filter-group">
          <div className="filter-group-title">
            <span className="icon">🌍</span> 国籍筛选
          </div>
          <div className="filter-row">
            <div className="filter-item">
              <label>大洲</label>
              <select
                value={filters.continent}
                onChange={e => handleChange('continent', e.target.value)}
              >
                {CONTINENTS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>排除大洲</label>
              <select
                value={filters.continentExclude}
                onChange={e => handleChange('continentExclude', e.target.value)}
              >
                {CONTINENTS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>精确国籍</label>
              <select
                value={filters.country}
                onChange={e => handleChange('country', e.target.value)}
              >
                <option value="">全部</option>
                {dropdownOptions.countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 其他筛选 */}
        <div className="filter-group">
          <div className="filter-group-title">
            <span className="icon">⚙️</span> 其他条件
          </div>
          <div className="filter-row">
            <div className="filter-item">
              <label>类型</label>
              <select
                value={filters.playerType}
                onChange={e => handleChange('playerType', e.target.value)}
              >
                {PLAYER_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>惯用脚</label>
              <select
                value={filters.foot}
                onChange={e => handleChange('foot', e.target.value)}
              >
                <option value="全部">全部</option>
                {dropdownOptions.feet.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-item range-item">
              <label>背号范围</label>
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="最小"
                  value={filters.shirtMin}
                  onChange={e => handleChange('shirtMin', e.target.value)}
                />
                <span>至</span>
                <input
                  type="number"
                  placeholder="最大"
                  value={filters.shirtMax}
                  onChange={e => handleChange('shirtMax', e.target.value)}
                />
              </div>
            </div>
            <div className="filter-item range-item">
              <label>身高范围(cm)</label>
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="最小"
                  value={filters.heightMin}
                  onChange={e => handleChange('heightMin', e.target.value)}
                />
                <span>至</span>
                <input
                  type="number"
                  placeholder="最大"
                  value={filters.heightMax}
                  onChange={e => handleChange('heightMax', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 按钮 */}
        <div className="filter-actions">
          <button className="btn btn-primary" onClick={onSearch}>
            <span>🔍</span> 查询
          </button>
          <button className="btn btn-secondary" onClick={onReset}>
            <span>🔄</span> 重置
          </button>
        </div>
      </div>
    </section>
  );
}
