import { useState, useEffect, useCallback } from 'react';
import Lanterns from './components/Lanterns';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import ResultPanel from './components/ResultPanel';
import { POSITION_GROUPS, LEAGUE_GROUPS, COUNTRY_CONTINENT } from './data/constants';
import './App.css';

// 初始筛选状态
const initialFilters = {
  positionGroup: '全部',
  positionExclude: '全部',
  position: '',
  leagueGroup: '全部',
  leagueExclude: '全部',
  club: '',
  continent: '全部',
  continentExclude: '全部',
  country: '',
  playerType: '全部',
  foot: '全部',
  shirtMin: '',
  shirtMax: '',
  heightMin: '',
  heightMax: '',
};

// 规范化文本
function normalizeText(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\s+/g, '');
}

// 获取大洲
function getContinent(country) {
  if (!country) return '其他';
  return COUNTRY_CONTINENT[country] || '其他';
}

// 解析数字
function parseNumber(value) {
  if (!value || String(value).trim() === '') return null;
  const num = parseInt(value, 10);
  return isNaN(num) ? null : num;
}

export default function App() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [dropdownOptions, setDropdownOptions] = useState({
    positions: [],
    clubs: [],
    countries: [],
    feet: [],
  });

  // 加载数据
  useEffect(() => {
    fetch('/players.json')
      .then(res => res.json())
      .then(data => {
        // 规范化数据
        const normalized = data.map(player => ({
          球员: normalizeText(player.球员),
          位置: normalizeText(player.位置),
          类型: normalizeText(player.类型),
          背号: normalizeText(player.背号),
          俱乐部: normalizeText(player.俱乐部),
          国籍: normalizeText(player.国籍),
          身高: normalizeText(player.身高),
          惯用脚: normalizeText(player.惯用脚),
        }));

        setAllPlayers(normalized);
        setFilteredPlayers(normalized);

        // 提取下拉选项
        const positions = [...new Set(normalized.map(p => p.位置).filter(Boolean))].sort();
        const clubs = [...new Set(normalized.map(p => p.俱乐部).filter(Boolean))].sort();
        const countries = [...new Set(normalized.map(p => p.国籍).filter(Boolean))].sort();
        const feet = [...new Set(normalized.map(p => p.惯用脚).filter(Boolean))].sort();

        setDropdownOptions({ positions, clubs, countries, feet });
      })
      .catch(err => {
        console.error('加载数据失败:', err);
      });
  }, []);

  // 搜索逻辑
  const handleSearch = useCallback(() => {
    let result = [...allPlayers];

    // 位置筛选
    if (filters.positionGroup !== '全部') {
      const groupPositions = POSITION_GROUPS[filters.positionGroup] || [];
      result = result.filter(p => groupPositions.includes(p.位置));
    }

    if (filters.positionExclude !== '全部') {
      const excludePositions = POSITION_GROUPS[filters.positionExclude] || [];
      if (excludePositions.length > 0) {
        result = result.filter(p => !excludePositions.includes(p.位置));
      }
    }

    if (filters.position) {
      result = result.filter(p => p.位置 === filters.position);
    }

    // 类型筛选
    if (filters.playerType !== '全部') {
      result = result.filter(p => p.类型 === filters.playerType);
    }

    // 背号范围
    const shirtMin = parseNumber(filters.shirtMin);
    const shirtMax = parseNumber(filters.shirtMax);
    if (shirtMin !== null || shirtMax !== null) {
      result = result.filter(p => {
        const num = parseNumber(p.背号);
        if (num === null) return false;
        if (shirtMin !== null && num < shirtMin) return false;
        if (shirtMax !== null && num > shirtMax) return false;
        return true;
      });
    }

    // 联赛筛选
    if (filters.leagueGroup !== '全部') {
      const clubsInGroup = LEAGUE_GROUPS[filters.leagueGroup] || new Set();
      result = result.filter(p => clubsInGroup.has(p.俱乐部));
    }

    if (filters.leagueExclude !== '全部') {
      const excludeClubs = LEAGUE_GROUPS[filters.leagueExclude] || new Set();
      if (excludeClubs.size > 0) {
        result = result.filter(p => !excludeClubs.has(p.俱乐部));
      }
    }

    if (filters.club) {
      result = result.filter(p => p.俱乐部 === filters.club);
    }

    // 国籍筛选
    if (filters.continent !== '全部') {
      result = result.filter(p => getContinent(p.国籍) === filters.continent);
    }

    if (filters.continentExclude !== '全部') {
      result = result.filter(p => getContinent(p.国籍) !== filters.continentExclude);
    }

    if (filters.country) {
      result = result.filter(p => p.国籍 === filters.country);
    }

    // 身高范围
    const heightMin = parseNumber(filters.heightMin);
    const heightMax = parseNumber(filters.heightMax);
    if (heightMin !== null || heightMax !== null) {
      result = result.filter(p => {
        const h = parseNumber(p.身高);
        if (h === null) return false;
        if (heightMin !== null && h < heightMin) return false;
        if (heightMax !== null && h > heightMax) return false;
        return true;
      });
    }

    // 惯用脚筛选
    if (filters.foot !== '全部') {
      result = result.filter(p => p.惯用脚 === filters.foot);
    }

    setFilteredPlayers(result);
  }, [allPlayers, filters]);

  // 重置
  const handleReset = useCallback(() => {
    setFilters(initialFilters);
    setFilteredPlayers(allPlayers);
  }, [allPlayers]);

  // 回车键搜索
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleSearch]);

  return (
    <>
      <Lanterns />
      <div className="container">
        <Header totalCount={allPlayers.length} />
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
          onReset={handleReset}
          dropdownOptions={dropdownOptions}
        />
        <ResultPanel players={filteredPlayers} />
        <footer className="footer">
          <p>🧧 JustPES 球员搜索 · 2025春节版 🧧</p>
          <p className="credits">
            数据来源感谢 <a href="https://github.com/nGnIJM" target="_blank" rel="noopener noreferrer">@nGnIJM</a>
          </p>
        </footer>
      </div>
    </>
  );
}
