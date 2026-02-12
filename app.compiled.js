// Firebase (using compat SDK globals)
const firebaseConfig = {
  apiKey: "AIzaSyAXbePVAUOqlHOa5E1QGWOHvEh1ljcbwKc",
  authDomain: "bet-tracker-5c891.firebaseapp.com",
  projectId: "bet-tracker-5c891",
  storageBucket: "bet-tracker-5c891.firebasestorage.app",
  messagingSenderId: "417850530820",
  appId: "1:417850530820:web:22bfbafa113762f153e951"
};
const fireApp = firebase.initializeApp(firebaseConfig);
const auth = fireApp.auth();
const db = fireApp.firestore();
const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} = React;
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart: RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ReferenceLine
} = Recharts;

// ======== CONSTANTS ========
const DEFAULT_BOOKMAKERS = [{
  id: '1',
  name: 'Betclic',
  tax: 0,
  count: 0
}, {
  id: '2',
  name: 'STS',
  tax: 12,
  count: 0
}, {
  id: '3',
  name: 'Fortuna',
  tax: 12,
  count: 0
}, {
  id: '4',
  name: 'Superbet',
  tax: 12,
  count: 0
}];
const DEFAULT_SPORTS = [{
  name: 'Piłka nożna',
  count: 0
}, {
  name: 'Tenis',
  count: 0
}, {
  name: 'Siatkówka',
  count: 0
}, {
  name: 'Piłka ręczna',
  count: 0
}, {
  name: 'Koszykówka',
  count: 0
}, {
  name: 'Hokej',
  count: 0
}, {
  name: 'E-sport',
  count: 0
}, {
  name: 'Dart',
  count: 0
}, {
  name: 'Inne',
  count: 0
}];
const STATUSES = [{
  id: 'pending',
  label: 'Oczekujący',
  color: '#facc15',
  bg: 'status-pending'
}, {
  id: 'won',
  label: 'Wygrany',
  color: '#4ade80',
  bg: 'status-won'
}, {
  id: 'lost',
  label: 'Przegrany',
  color: '#f87171',
  bg: 'status-lost'
}, {
  id: 'cashout',
  label: 'Cashout',
  color: '#60a5fa',
  bg: 'status-cashout'
}, {
  id: 'returned',
  label: 'Zwrot',
  color: '#94a3b8',
  bg: 'status-returned'
}];
const TIME_RANGES = [{
  id: 'day',
  label: 'Dzień'
}, {
  id: 'week',
  label: 'Tydzień'
}, {
  id: 'month',
  label: 'Miesiąc'
}, {
  id: 'year',
  label: 'Rok'
}];
const STATS_TIME_RANGES = [{
  id: 'day',
  label: 'Dzień'
}, {
  id: 'week',
  label: 'Tydzień'
}, {
  id: 'month',
  label: 'Miesiąc'
}, {
  id: 'year',
  label: 'Rok'
}, {
  id: 'all',
  label: 'Wszystko'
}];
const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6'];

// ======== SVG ICONS ========
function IconDashboard({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "14",
    width: "7",
    height: "7",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "14",
    width: "7",
    height: "7",
    rx: "1"
  }));
}
function IconHistory({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  }));
}
function IconStats({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "14"
  }));
}
function IconSettings({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
  }));
}
function IconPlus({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }));
}
function IconX({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
}
function IconCheck({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }));
}
function IconTrash({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }));
}
function IconEdit({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
  }));
}
function IconDownload({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  }));
}
function IconUpload({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 8 12 3 7 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "3",
    x2: "12",
    y2: "15"
  }));
}
function IconTrophy({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 22h16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 2H6v7a6 6 0 0 0 12 0V2Z"
  }));
}
function IconTarget({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  }));
}
function IconTrending({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "22 7 13.5 15.5 8.5 10.5 2 17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 7 22 7 22 13"
  }));
}
function IconBackspace({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "9",
    x2: "12",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "18",
    y2: "15"
  }));
}
function IconChevronDown({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }));
}
function IconMail({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22,6 12,13 2,6"
  }));
}
function IconLock({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  }));
}
function IconEye({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }));
}
function IconEyeOff({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }));
}
function IconLogOut({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 17 21 12 16 7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "9",
    y2: "12"
  }));
}
function IconUser({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  }));
}
function IconAlertTriangle({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17"
  }));
}
function IconCopy({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  }));
}

// ======== HELPERS ========
function filterByTimeRange(coupons, range) {
  const now = new Date();
  return coupons.filter(c => {
    const d = new Date(c.date);
    if (range === 'day') return d.toDateString() === now.toDateString();
    if (range === 'week') return (now - d) / (1000 * 60 * 60 * 24) <= 7;
    if (range === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    if (range === 'year') return d.getFullYear() === now.getFullYear();
    return true; // 'all'
  });
}
function calculateStats(range, coupons) {
  const filtered = filterByTimeRange(coupons, range);
  let profit = 0,
    stakeSum = 0,
    wins = 0,
    finished = 0;
  filtered.forEach(c => {
    const s = Number(c.stake || 0);
    if (c.status === 'won') {
      profit += s * Number(c.odds) * (1 - Number(c.tax || 0) / 100) - s;
      wins++;
      finished++;
      stakeSum += s;
    } else if (c.status === 'lost') {
      profit -= s;
      finished++;
      stakeSum += s;
    } else if (c.status === 'cashout') {
      profit += Number(c.payout || 0) - s;
      finished++;
      stakeSum += s;
    } else if (c.status === 'returned') {
      finished++;
    }
  });
  return {
    profit,
    yieldVal: stakeSum > 0 ? profit / stakeSum * 100 : 0,
    accuracy: finished > 0 ? wins / finished * 100 : 0,
    total: filtered.length,
    wins,
    finished,
    stakeSum,
    filtered
  };
}
function calculateSportsPodium(coupons) {
  const stats = {};
  const total = coupons.length;
  if (total === 0) return [];
  coupons.forEach(c => {
    const sport = c.sport || 'Inne';
    if (!stats[sport]) stats[sport] = {
      win: 0,
      total: 0
    };
    stats[sport].total++;
    if (c.status === 'won') stats[sport].win++;
  });
  return Object.keys(stats).map(s => ({
    name: s,
    count: stats[s].total,
    winRate: stats[s].total > 0 ? (stats[s].win / stats[s].total * 100).toFixed(1) : '0.0',
    volume: (stats[s].total / total * 100).toFixed(1)
  })).sort((a, b) => b.count - a.count);
}
function getAvgOdds(coupons) {
  if (coupons.length === 0) return '0.00';
  return (coupons.reduce((a, c) => a + Number(c.odds || 0), 0) / coupons.length).toFixed(2);
}
function getAvgWonOdds(coupons) {
  const won = coupons.filter(c => c.status === 'won');
  if (won.length === 0) return '0.00';
  return (won.reduce((a, c) => a + Number(c.odds || 0), 0) / won.length).toFixed(2);
}
function getMaxWonOdds(coupons) {
  const won = coupons.filter(c => c.status === 'won');
  if (won.length === 0) return '0.00';
  return Math.max(...won.map(c => Number(c.odds || 0))).toFixed(2);
}
function getMaxWinPLN(coupons) {
  const won = coupons.filter(c => c.status === 'won');
  if (won.length === 0) return '0.00';
  return Math.max(...won.map(c => {
    const s = Number(c.stake || 0);
    const o = Number(c.odds || 0);
    const t = Number(c.tax || 0);
    return s * o * (1 - t / 100) - s;
  })).toFixed(2);
}
function prepareBalanceChart(coupons) {
  const sorted = [...coupons].filter(c => c.status !== 'pending' && c.status !== 'returned').sort((a, b) => a.date - b.date);
  let bal = 0;
  return sorted.map(c => {
    let p = 0;
    const s = Number(c.stake || 0);
    if (c.status === 'won') p = s * Number(c.odds) * (1 - Number(c.tax || 0) / 100) - s;else if (c.status === 'lost') p = -s;else if (c.status === 'cashout') p = Number(c.payout || 0) - s;
    bal += p;
    return {
      name: new Date(c.date).toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit'
      }),
      value: Number(bal.toFixed(2))
    };
  });
}
function prepareProfitByMonthChart(coupons) {
  const months = {};
  coupons.filter(c => c.status !== 'pending' && c.status !== 'returned').forEach(c => {
    const d = new Date(c.date);
    const key = d.toLocaleDateString('pl-PL', {
      month: 'short',
      year: '2-digit'
    });
    if (!months[key]) months[key] = 0;
    const s = Number(c.stake || 0);
    if (c.status === 'won') months[key] += s * Number(c.odds) * (1 - Number(c.tax || 0) / 100) - s;else if (c.status === 'lost') months[key] -= s;else if (c.status === 'cashout') months[key] += Number(c.payout || 0) - s;
  });
  return Object.entries(months).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2))
  }));
}
function groupCouponsByDate(coupons) {
  const groups = {};
  coupons.forEach(c => {
    const dateStr = new Date(c.date).toLocaleDateString('pl-PL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    if (!groups[dateStr]) groups[dateStr] = [];
    groups[dateStr].push(c);
  });
  return groups;
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// ======== FIREBASE ERROR HELPER ========
function getFirebaseErrorDetails(error, context) {
  const code = error.code || '';
  const projectId = 'bet-tracker-5c891';

  // Auth errors
  if (code === 'auth/email-already-in-use') {
    return {
      title: 'E-mail już zajęty',
      message: 'Ten adres e-mail jest już zarejestrowany. Użyj opcji logowania lub zresetuj hasło.'
    };
  }
  if (code === 'auth/invalid-email') {
    return {
      title: 'Nieprawidłowy e-mail',
      message: 'Podany adres e-mail jest nieprawidłowy. Sprawdź pisownię.'
    };
  }
  if (code === 'auth/weak-password') {
    return {
      title: 'Słabe hasło',
      message: 'Hasło musi mieć co najmniej 6 znaków.'
    };
  }
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    return {
      title: 'Błąd logowania',
      message: 'Nieprawidłowy e-mail lub hasło. Sprawdź dane i spróbuj ponownie.'
    };
  }
  if (code === 'auth/too-many-requests') {
    return {
      title: 'Zbyt wiele prób',
      message: 'Zbyt wiele nieudanych prób logowania. Odczekaj chwilę i spróbuj ponownie, lub zresetuj hasło.'
    };
  }
  if (code === 'auth/network-request-failed') {
    return {
      title: 'Brak połączenia',
      message: 'Nie udało się połączyć z serwerem. Sprawdź połączenie internetowe.'
    };
  }
  if (code === 'auth/operation-not-allowed') {
    return {
      title: 'Logowanie e-mail wyłączone',
      message: 'Logowanie za pomocą e-maila jest wyłączone w projekcie Firebase. Aby je włączyć:',
      steps: ['1. Otwórz Firebase Console: https://console.firebase.google.com/project/' + projectId, '2. Przejdź do: Authentication → Sign-in method', '3. Kliknij "Email/Password"', '4. Włącz przełącznik "Enable"', '5. Kliknij "Save"']
    };
  }

  // Firestore permission errors
  if (code === 'permission-denied') {
    return {
      title: 'Brak uprawnień do bazy danych',
      message: 'Reguły bezpieczeństwa Firestore blokują dostęp. Aby to naprawić, otwórz Firebase Console i zmień reguły:',
      steps: ['1. Otwórz: https://console.firebase.google.com/project/' + projectId + '/firestore/rules', '2. Zamień obecne reguły na poniższy kod:'],
      code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`,
      codeNote: 'Skopiuj powyższy kod i wklej w edytorze reguł, a następnie kliknij "Publish".',
      extraSteps: ['3. Wklej powyższy kod w edytorze reguł', '4. Kliknij przycisk "Publish"', '5. Odśwież aplikację']
    };
  }

  // Firestore quota/unavailable
  if (code === 'resource-exhausted') {
    return {
      title: 'Przekroczono limit Firebase',
      message: 'Przekroczono dzienny limit darmowego planu Firebase (Spark). Poczekaj do jutra lub przejdź na plan Blaze w Firebase Console.'
    };
  }
  if (code === 'unavailable') {
    return {
      title: 'Serwer niedostępny',
      message: 'Serwer Firebase jest tymczasowo niedostępny. Spróbuj ponownie za chwilę.'
    };
  }

  // Generic fallback
  return {
    title: context === 'auth' ? 'Błąd autoryzacji' : 'Błąd bazy danych',
    message: `${error.message || 'Nieznany błąd'} (kod: ${code || 'brak'})`,
    steps: context === 'firestore' ? ['Sprawdź reguły Firestore: https://console.firebase.google.com/project/' + projectId + '/firestore/rules', 'Sprawdź czy usługa Firestore jest aktywna w konsoli Firebase.'] : undefined
  };
}

// ======== FIREBASE ERROR DISPLAY ========
function FirebaseErrorBanner({
  error,
  context,
  onDismiss
}) {
  const [copied, setCopied] = useState(false);
  const details = getFirebaseErrorDetails(error, context);
  const handleCopy = text => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: 16,
      padding: '18px 16px',
      marginBottom: 16,
      position: 'relative'
    }
  }, onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      background: 'none',
      border: 'none',
      color: '#64748b',
      cursor: 'pointer',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(IconAlertTriangle, {
    size: 16,
    style: {
      color: '#f87171',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#f87171'
    }
  }, details.title)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: '#cbd5e1',
      lineHeight: 1.6,
      marginBottom: details.steps || details.code ? 12 : 0
    }
  }, details.message), details.steps && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#94a3b8',
      lineHeight: 1.8,
      marginBottom: details.code ? 12 : 0
    }
  }, details.steps.map((step, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, step))), details.code && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("pre", {
    style: {
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      padding: '14px 12px',
      fontSize: 10,
      fontFamily: "'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
      color: '#a5f3fc',
      lineHeight: 1.6,
      overflowX: 'auto',
      whiteSpace: 'pre',
      userSelect: 'text'
    }
  }, details.code), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleCopy(details.code),
    className: "btn-press",
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      background: copied ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.1)',
      border: '1px solid ' + (copied ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)'),
      borderRadius: 6,
      padding: '4px 8px',
      cursor: 'pointer',
      color: copied ? '#4ade80' : '#94a3b8',
      fontSize: 9,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconCopy, {
    size: 12
  }), " ", copied ? 'Skopiowano!' : 'Kopiuj')), details.codeNote && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10,
      color: '#64748b',
      fontStyle: 'italic',
      marginBottom: 4
    }
  }, details.codeNote), details.extraSteps && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#94a3b8',
      lineHeight: 1.8
    }
  }, details.extraSteps.map((step, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, step))));
}

// ======== AUTH SCREEN ========
function AuthScreen({
  onAuth
}) {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(false);
  const handleLogin = async () => {
    if (!email.trim() || !password) return;
    setLoading(true);
    setError(null);
    try {
      await auth.signInWithEmailAndPassword(email.trim(), password);
    } catch (err) {
      console.error('Login error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async () => {
    if (!email.trim() || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      setError({
        code: 'custom',
        message: 'Hasła nie są identyczne.'
      });
      return;
    }
    if (password.length < 6) {
      setError({
        code: 'auth/weak-password',
        message: 'Hasło musi mieć co najmniej 6 znaków.'
      });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await auth.createUserWithEmailAndPassword(email.trim(), password);
    } catch (err) {
      console.error('Register error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = async () => {
    if (!email.trim()) {
      setError({
        code: 'custom',
        message: 'Podaj adres e-mail, na który wyślemy link do resetowania hasła.'
      });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await auth.sendPasswordResetEmail(email.trim());
      setResetSent(true);
    } catch (err) {
      console.error('Reset error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (mode === 'login') handleLogin();else if (mode === 'register') handleRegister();else if (mode === 'reset') handleReset();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-glow"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 400,
      position: 'relative',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      fontWeight: 900,
      fontStyle: 'italic',
      letterSpacing: '-0.05em',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: 4
    }
  }, "BET TRACKER"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.3em',
      color: '#475569'
    }
  }, "Panel zak\u0142ad\xF3w")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card animate-scale-in",
    style: {
      borderRadius: 24,
      padding: '28px 24px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 6,
      textAlign: 'center'
    }
  }, mode === 'login' ? 'Logowanie' : mode === 'register' ? 'Rejestracja' : 'Reset hasła'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: '#64748b',
      textAlign: 'center',
      marginBottom: 24
    }
  }, mode === 'login' ? 'Zaloguj się do swojego konta' : mode === 'register' ? 'Utwórz nowe konto' : 'Podaj e-mail, wyślemy Ci link'), error && error.code !== 'custom' && /*#__PURE__*/React.createElement(FirebaseErrorBanner, {
    error: error,
    context: "auth",
    onDismiss: () => setError(null)
  }), error && error.code === 'custom' && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: 12,
      padding: '12px 14px',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: '#f87171',
      fontWeight: 700
    }
  }, error.message)), resetSent && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(74,222,128,0.1)',
      border: '1px solid rgba(74,222,128,0.25)',
      borderRadius: 12,
      padding: '14px',
      marginBottom: 16,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: '#4ade80',
      fontWeight: 800,
      marginBottom: 4
    }
  }, "Link wys\u0142any!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: '#94a3b8'
    }
  }, "Sprawd\u017A skrzynk\u0119 e-mail (", email, ") i kliknij link do resetowania has\u0142a. Sprawd\u017A te\u017C folder spam.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 6,
      display: 'block',
      letterSpacing: '0.1em'
    }
  }, "E-mail"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#475569'
    }
  }, /*#__PURE__*/React.createElement(IconMail, {
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "twoj@email.com",
    className: "glass-input",
    style: {
      width: '100%',
      padding: '12px 12px 12px 38px',
      borderRadius: 14,
      fontSize: 13
    },
    autoComplete: "email"
  }))), mode !== 'reset' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 6,
      display: 'block',
      letterSpacing: '0.1em'
    }
  }, "Has\u0142o"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#475569'
    }
  }, /*#__PURE__*/React.createElement(IconLock, {
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    type: showPassword ? 'text' : 'password',
    value: password,
    onChange: e => setPassword(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    className: "glass-input",
    style: {
      width: '100%',
      padding: '12px 42px 12px 38px',
      borderRadius: 14,
      fontSize: 13
    },
    autoComplete: mode === 'login' ? 'current-password' : 'new-password'
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowPassword(!showPassword),
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#475569',
      cursor: 'pointer',
      padding: 2
    }
  }, showPassword ? /*#__PURE__*/React.createElement(IconEyeOff, {
    size: 16
  }) : /*#__PURE__*/React.createElement(IconEye, {
    size: 16
  })))), mode === 'register' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 6,
      display: 'block',
      letterSpacing: '0.1em'
    }
  }, "Powt\xF3rz has\u0142o"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#475569'
    }
  }, /*#__PURE__*/React.createElement(IconLock, {
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    type: showPassword ? 'text' : 'password',
    value: confirmPassword,
    onChange: e => setConfirmPassword(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    className: "glass-input",
    style: {
      width: '100%',
      padding: '12px 12px 12px 38px',
      borderRadius: 14,
      fontSize: 13
    },
    autoComplete: "new-password"
  }))), mode === 'login' && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setMode('reset');
      setError(null);
      setResetSent(false);
    },
    style: {
      background: 'none',
      border: 'none',
      color: '#60a5fa',
      fontSize: 11,
      fontWeight: 700,
      cursor: 'pointer',
      padding: 0
    }
  }, "Zapomnia\u0142e\u015B has\u0142a?")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: loading,
    className: "btn-press",
    style: {
      width: '100%',
      padding: '14px',
      background: loading ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
      border: 'none',
      borderRadius: 16,
      cursor: loading ? 'not-allowed' : 'pointer',
      color: 'white',
      fontWeight: 900,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
      opacity: loading ? 0.7 : 1,
      marginBottom: 16
    }
  }, loading ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      border: '2px solid rgba(255,255,255,0.3)',
      borderTopColor: '#fff',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      display: 'inline-block'
    }
  }), mode === 'login' ? 'Logowanie...' : mode === 'register' ? 'Rejestracja...' : 'Wysyłanie...') : mode === 'login' ? 'Zaloguj się' : mode === 'register' ? 'Zarejestruj się' : 'Wyślij link resetujący')), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, mode === 'login' && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: '#64748b'
    }
  }, "Nie masz konta?", ' ', /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setMode('register');
      setError(null);
    },
    style: {
      background: 'none',
      border: 'none',
      color: '#60a5fa',
      fontWeight: 800,
      cursor: 'pointer',
      fontSize: 12,
      padding: 0
    }
  }, "Zarejestruj si\u0119")), mode === 'register' && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: '#64748b'
    }
  }, "Masz ju\u017C konto?", ' ', /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setMode('login');
      setError(null);
    },
    style: {
      background: 'none',
      border: 'none',
      color: '#60a5fa',
      fontWeight: 800,
      cursor: 'pointer',
      fontSize: 12,
      padding: 0
    }
  }, "Zaloguj si\u0119")), mode === 'reset' && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setMode('login');
      setError(null);
      setResetSent(false);
    },
    style: {
      background: 'none',
      border: 'none',
      color: '#60a5fa',
      fontWeight: 800,
      cursor: 'pointer',
      fontSize: 12,
      padding: 0
    }
  }, "Wr\xF3\u0107 do logowania")))), /*#__PURE__*/React.createElement("style", null, `@keyframes spin { to { transform: rotate(360deg); } }`)));
}

// ======== MAIN APP ========
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firestoreError, setFirestoreError] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [bookmakers, setBookmakers] = useState(DEFAULT_BOOKMAKERS);
  const [sports, setSports] = useState(DEFAULT_SPORTS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('month');
  const [statsTimeRange, setStatsTimeRange] = useState('year');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Auth
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  const handleLogout = async () => {
    if (!window.confirm('Na pewno chcesz się wylogować?')) return;
    try {
      await auth.signOut();
      setCoupons([]);
      setBookmakers(DEFAULT_BOOKMAKERS);
      setSports(DEFAULT_SPORTS);
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Logout error:', err);
      alert('Błąd wylogowania: ' + err.message);
    }
  };

  // Firestore sync
  useEffect(() => {
    if (!user) return;
    const couponsRef = db.collection("users").doc(user.uid).collection("coupons");
    const settingsRef = db.collection("users").doc(user.uid).collection("settings");
    const unsubC = couponsRef.onSnapshot(snap => {
      setFirestoreError(null);
      setCoupons(snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      })).sort((a, b) => b.date - a.date));
    }, err => {
      console.error('Firestore coupons error:', err);
      setFirestoreError(err);
    });
    const unsubS = settingsRef.onSnapshot(snap => {
      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));
      const bks = data.find(d => d.id === 'bookmakers');
      const sps = data.find(d => d.id === 'sports');
      if (bks && bks.list) setBookmakers(bks.list);
      if (sps && sps.list) setSports(sps.list);
    }, err => {
      console.error('Firestore settings error:', err);
      setFirestoreError(err);
    });
    return () => {
      unsubC();
      unsubS();
    };
  }, [user]);
  const dashboardStats = useMemo(() => calculateStats(timeRange, coupons), [coupons, timeRange]);
  const detailedStats = useMemo(() => calculateStats(statsTimeRange, coupons), [coupons, statsTimeRange]);

  // Actions
  const saveCoupon = async data => {
    if (!user) throw new Error('User not authenticated');
    const ref = db.collection("users").doc(user.uid).collection("coupons");
    if (modalMode === 'edit' && editingCoupon) {
      await ref.doc(editingCoupon.id).update(data);
    } else {
      await ref.add({
        ...data,
        date: Date.now()
      });
    }
    setIsModalOpen(false);
    setEditingCoupon(null);
  };
  const deleteCoupon = async id => {
    if (!user || !window.confirm("Na pewno usunąć ten kupon?")) return;
    await db.collection("users").doc(user.uid).collection("coupons").doc(id).delete();
  };
  const updateStatus = async (id, status, extra = {}) => {
    if (!user) return;
    await db.collection("users").doc(user.uid).collection("coupons").doc(id).update({
      status,
      ...extra
    });
  };
  const saveBookmakers = async list => {
    if (!user) throw new Error('User not authenticated');
    await db.collection("users").doc(user.uid).collection("settings").doc("bookmakers").set({
      list
    });
    setBookmakers(list);
  };
  const saveSports = async list => {
    if (!user) throw new Error('User not authenticated');
    await db.collection("users").doc(user.uid).collection("settings").doc("sports").set({
      list
    });
    setSports(list);
  };
  const openAddModal = () => {
    setEditingCoupon(null);
    setModalMode('add');
    setIsModalOpen(true);
  };
  const openEditModal = coupon => {
    setEditingCoupon(coupon);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  if (loading) return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0e1a'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      border: '3px solid rgba(59,130,246,0.2)',
      borderTopColor: '#3b82f6',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }
  }), /*#__PURE__*/React.createElement("style", null, `@keyframes spin { to { transform: rotate(360deg); } }`));
  if (!user) return /*#__PURE__*/React.createElement(AuthScreen, null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      position: 'relative',
      paddingBottom: '100px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-glow"
  }), /*#__PURE__*/React.createElement("header", {
    className: "glass",
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '16px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      fontStyle: 'italic',
      letterSpacing: '-0.05em',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  }, "BET TRACKER"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      color: '#475569'
    }
  }, "Panel zak\u0142ad\xF3w")), /*#__PURE__*/React.createElement("button", {
    onClick: openAddModal,
    className: "btn-press",
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(59,130,246,0.3)'
    }
  }, /*#__PURE__*/React.createElement(IconPlus, {
    size: 20
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 480,
      margin: '0 auto',
      padding: '16px',
      position: 'relative',
      zIndex: 10
    }
  }, firestoreError && /*#__PURE__*/React.createElement(FirebaseErrorBanner, {
    error: firestoreError,
    context: "firestore",
    onDismiss: () => setFirestoreError(null)
  }), activeTab === 'dashboard' && /*#__PURE__*/React.createElement(DashboardTab, {
    stats: dashboardStats,
    timeRange: timeRange,
    setTimeRange: setTimeRange,
    coupons: coupons,
    bookmakers: bookmakers,
    onUpdateStatus: updateStatus,
    onEdit: openEditModal,
    onDelete: deleteCoupon
  }), activeTab === 'history' && /*#__PURE__*/React.createElement(HistoryTab, {
    coupons: coupons,
    bookmakers: bookmakers,
    onUpdateStatus: updateStatus,
    onEdit: openEditModal,
    onDelete: deleteCoupon
  }), activeTab === 'stats' && /*#__PURE__*/React.createElement(StatsTab, {
    stats: detailedStats,
    statsTimeRange: statsTimeRange,
    setStatsTimeRange: setStatsTimeRange,
    coupons: coupons
  }), activeTab === 'settings' && /*#__PURE__*/React.createElement(SettingsTab, {
    bookmakers: bookmakers,
    sports: sports,
    coupons: coupons,
    user: user,
    db: db,
    onSaveBookmakers: saveBookmakers,
    onSaveSports: saveSports,
    onLogout: handleLogout
  })), /*#__PURE__*/React.createElement("nav", {
    className: "glass-nav",
    style: {
      position: 'fixed',
      bottom: 12,
      left: 12,
      right: 12,
      zIndex: 50,
      borderRadius: 20,
      padding: '8px 0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(NavBtn, {
    active: activeTab === 'dashboard',
    onClick: () => setActiveTab('dashboard'),
    icon: /*#__PURE__*/React.createElement(IconDashboard, {
      size: 20
    }),
    label: "G\u0142\xF3wny"
  }), /*#__PURE__*/React.createElement(NavBtn, {
    active: activeTab === 'history',
    onClick: () => setActiveTab('history'),
    icon: /*#__PURE__*/React.createElement(IconHistory, {
      size: 20
    }),
    label: "Historia"
  }), /*#__PURE__*/React.createElement(NavBtn, {
    active: activeTab === 'stats',
    onClick: () => setActiveTab('stats'),
    icon: /*#__PURE__*/React.createElement(IconStats, {
      size: 20
    }),
    label: "Statystyki"
  }), /*#__PURE__*/React.createElement(NavBtn, {
    active: activeTab === 'settings',
    onClick: () => setActiveTab('settings'),
    icon: /*#__PURE__*/React.createElement(IconSettings, {
      size: 20
    }),
    label: "Ustawienia"
  })), isModalOpen && /*#__PURE__*/React.createElement(CouponModal, {
    mode: modalMode,
    coupon: editingCoupon,
    onClose: () => {
      setIsModalOpen(false);
      setEditingCoupon(null);
    },
    onSave: saveCoupon,
    bookmakers: [...bookmakers].sort((a, b) => (b.count || 0) - (a.count || 0)),
    sports: [...sports].sort((a, b) => (b.count || 0) - (a.count || 0))
  }));
}

// ======== NAV BUTTON ========
function NavBtn({
  active,
  onClick,
  icon,
  label
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "btn-press",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: active ? '#3b82f6' : '#475569',
      transition: 'all 0.2s',
      transform: active ? 'scale(1.05)' : 'scale(1)',
      padding: '6px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: active ? 6 : 0,
      borderRadius: 10,
      background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
      transition: 'all 0.2s'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em'
    }
  }, label));
}

// ======== TIME RANGE SWITCHER ========
function RangeSwitcher({
  ranges,
  active,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "glass",
    style: {
      display: 'flex',
      padding: 4,
      borderRadius: 16,
      marginBottom: 16
    }
  }, ranges.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    onClick: () => onSelect(r.id),
    className: `range-btn ${active === r.id ? 'active' : ''}`
  }, r.label)));
}

// ======== DASHBOARD TAB ========
function DashboardTab({
  stats,
  timeRange,
  setTimeRange,
  coupons,
  bookmakers,
  onUpdateStatus,
  onEdit,
  onDelete
}) {
  const pendingCoupons = coupons.filter(c => c.status === 'pending');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(RangeSwitcher, {
    ranges: TIME_RANGES,
    active: timeRange,
    onSelect: setTimeRange
  }), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 24,
      padding: '28px 24px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -40,
      right: -40,
      width: 120,
      height: 120,
      background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
      filter: 'blur(30px)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: '#64748b',
      marginBottom: 6
    }
  }, "Bilans okresu"), /*#__PURE__*/React.createElement("h2", {
    className: stats.profit >= 0 ? 'stat-green' : 'stat-red',
    style: {
      fontSize: 42,
      fontWeight: 900,
      letterSpacing: '-0.04em',
      color: stats.profit >= 0 ? '#4ade80' : '#f87171',
      lineHeight: 1
    }
  }, stats.profit >= 0 ? '+' : '', stats.profit.toFixed(2), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      opacity: 0.3
    }
  }, "PLN")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: 16,
      padding: '14px 16px',
      border: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 4
    }
  }, "Yield"), /*#__PURE__*/React.createElement("p", {
    className: "stat-blue",
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: stats.yieldVal >= 0 ? '#3b82f6' : '#f97316'
    }
  }, stats.yieldVal.toFixed(1), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: 16,
      padding: '14px 16px',
      border: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 4
    }
  }, "Skuteczno\u015B\u0107"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 22,
      fontWeight: 900,
      color: '#8b5cf6'
    }
  }, stats.accuracy.toFixed(1), "%")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 4px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b'
    }
  }, "Aktywne kupony (", pendingCoupons.length, ")")), pendingCoupons.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "glass",
    style: {
      borderRadius: 20,
      padding: '40px 20px',
      textAlign: 'center',
      borderStyle: 'dashed'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#475569',
      fontWeight: 600,
      fontSize: 13
    }
  }, "Brak aktywnych kupon\xF3w"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#334155',
      fontSize: 11,
      marginTop: 4
    }
  }, "Dodaj nowy kupon przyciskiem +")), pendingCoupons.map(c => /*#__PURE__*/React.createElement(ActiveCouponCard, {
    key: c.id,
    coupon: c,
    bookmakers: bookmakers,
    onUpdateStatus: onUpdateStatus,
    onEdit: onEdit,
    onDelete: onDelete
  })));
}

// ======== ACTIVE COUPON CARD ========
function ActiveCouponCard({
  coupon,
  bookmakers,
  onUpdateStatus,
  onEdit,
  onDelete
}) {
  const bk = bookmakers.find(b => b.name === coupon.bookmaker);
  const win = (Number(coupon.stake) * Number(coupon.odds) * (1 - Number(coupon.tax || 0) / 100)).toFixed(2);
  const [showActions, setShowActions] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      fontWeight: 900,
      color: '#60a5fa',
      border: '1px solid rgba(59,130,246,0.2)'
    }
  }, (bk?.name || 'B').substring(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 800,
      fontSize: 13
    }
  }, coupon.sport || 'Zakład'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10,
      color: '#64748b',
      fontWeight: 700,
      marginTop: 1
    }
  }, coupon.bookmaker))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "status-pending",
    style: {
      padding: '4px 10px',
      borderRadius: 8,
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase'
    }
  }, "Oczekuj\u0105cy"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowActions(!showActions),
    className: "btn-press",
    style: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      borderRadius: 8,
      padding: '4px 6px',
      cursor: 'pointer',
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement(IconChevronDown, {
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 8,
      background: 'rgba(0,0,0,0.25)',
      borderRadius: 14,
      padding: '12px 8px',
      border: '1px solid rgba(255,255,255,0.03)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      textTransform: 'uppercase',
      fontWeight: 800,
      color: '#64748b',
      marginBottom: 3
    }
  }, "Kurs"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 900,
      fontSize: 14,
      fontFamily: 'monospace'
    }
  }, coupon.odds)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      borderLeft: '1px solid rgba(255,255,255,0.06)',
      borderRight: '1px solid rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      textTransform: 'uppercase',
      fontWeight: 800,
      color: '#64748b',
      marginBottom: 3
    }
  }, "Stawka"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 900,
      fontSize: 14,
      fontFamily: 'monospace'
    }
  }, coupon.stake, " z\u0142")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      textTransform: 'uppercase',
      fontWeight: 800,
      color: '#64748b',
      marginBottom: 3
    }
  }, "Wygrana"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 900,
      fontSize: 14,
      fontFamily: 'monospace',
      color: '#4ade80'
    }
  }, win, " z\u0142")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      background: 'rgba(255,255,255,0.02)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdateStatus(coupon.id, 'won'),
    className: "btn-press",
    style: {
      flex: 1,
      padding: '12px 0',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#4ade80'
    }
  }, "Wygrana"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdateStatus(coupon.id, 'lost'),
    className: "btn-press",
    style: {
      flex: 1,
      padding: '12px 0',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#f87171',
      borderLeft: '1px solid rgba(255,255,255,0.04)',
      borderRight: '1px solid rgba(255,255,255,0.04)'
    }
  }, "Pora\u017Cka"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const p = prompt("Kwota cashout:", coupon.stake);
      if (p !== null) onUpdateStatus(coupon.id, 'cashout', {
        payout: Number(p)
      });
    },
    className: "btn-press",
    style: {
      flex: 1,
      padding: '12px 0',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#60a5fa'
    }
  }, "Cashout"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onUpdateStatus(coupon.id, 'returned'),
    className: "btn-press",
    style: {
      flex: 1,
      padding: '12px 0',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#94a3b8',
      borderLeft: '1px solid rgba(255,255,255,0.04)'
    }
  }, "Zwrot")), showActions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      background: 'rgba(255,255,255,0.02)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onEdit(coupon),
    className: "btn-press",
    style: {
      flex: 1,
      padding: '10px 0',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#60a5fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(IconEdit, {
    size: 12
  }), " Edytuj"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete(coupon.id),
    className: "btn-press",
    style: {
      flex: 1,
      padding: '10px 0',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#f87171',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      borderLeft: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement(IconTrash, {
    size: 12
  }), " Usu\u0144")));
}

// ======== HISTORY TAB ========
function HistoryTab({
  coupons,
  bookmakers,
  onUpdateStatus,
  onEdit,
  onDelete
}) {
  const groups = groupCouponsByDate(coupons);
  if (coupons.length === 0) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 16,
        fontWeight: 900,
        textTransform: 'uppercase',
        marginBottom: 16,
        letterSpacing: '-0.02em'
      }
    }, "Historia"), /*#__PURE__*/React.createElement("div", {
      className: "glass",
      style: {
        borderRadius: 20,
        padding: '40px 20px',
        textAlign: 'center',
        borderStyle: 'dashed'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#475569',
        fontWeight: 600,
        fontSize: 13
      }
    }, "Brak historii kupon\xF3w")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      textTransform: 'uppercase',
      marginBottom: 8,
      letterSpacing: '-0.02em'
    }
  }, "Historia"), Object.entries(groups).map(([date, dateCoupons]) => /*#__PURE__*/React.createElement("div", {
    key: date
  }, /*#__PURE__*/React.createElement("div", {
    className: "date-separator",
    style: {
      marginTop: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, date)), dateCoupons.map(c => /*#__PURE__*/React.createElement(HistoryCouponCard, {
    key: c.id,
    coupon: c,
    bookmakers: bookmakers,
    onEdit: onEdit,
    onDelete: onDelete
  })))));
}

// ======== HISTORY COUPON CARD ========
function HistoryCouponCard({
  coupon,
  bookmakers,
  onEdit,
  onDelete
}) {
  const status = STATUSES.find(s => s.id === coupon.status) || STATUSES[0];
  const bk = bookmakers.find(b => b.name === coupon.bookmaker);
  const win = (Number(coupon.stake) * Number(coupon.odds) * (1 - Number(coupon.tax || 0) / 100)).toFixed(2);
  const borderColor = coupon.status === 'won' ? '#4ade80' : coupon.status === 'lost' ? '#f87171' : coupon.status === 'cashout' ? '#60a5fa' : coupon.status === 'returned' ? '#94a3b8' : '#facc15';
  return /*#__PURE__*/React.createElement("div", {
    className: "glass",
    style: {
      borderRadius: 16,
      padding: '16px 18px',
      marginBottom: 8,
      borderLeft: `3px solid ${borderColor}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: `rgba(${coupon.status === 'won' ? '74,222,128' : coupon.status === 'lost' ? '248,113,113' : '59,130,246'},0.1)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 9,
      fontWeight: 900,
      color: borderColor
    }
  }, (bk?.name || 'B').substring(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 800,
      fontSize: 12
    }
  }, coupon.sport || 'Zakład'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      color: '#64748b',
      fontWeight: 700
    }
  }, coupon.bookmaker))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: status.bg,
    style: {
      padding: '3px 8px',
      borderRadius: 6,
      fontSize: 8,
      fontWeight: 800,
      textTransform: 'uppercase'
    }
  }, status.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      color: '#64748b',
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  }, "Kurs"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 900,
      fontSize: 13,
      fontFamily: 'monospace'
    }
  }, coupon.odds)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      color: '#64748b',
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  }, "Stawka"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 900,
      fontSize: 13,
      fontFamily: 'monospace'
    }
  }, coupon.stake, " z\u0142")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      color: '#64748b',
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  }, "Wygrana"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 900,
      fontSize: 13,
      fontFamily: 'monospace',
      color: '#4ade80'
    }
  }, win, " z\u0142"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onEdit(coupon),
    className: "btn-press",
    style: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement(IconEdit, {
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete(coupon.id),
    className: "btn-press",
    style: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement(IconTrash, {
    size: 13
  })))));
}

// ======== STATS TAB ========
function StatsTab({
  stats,
  statsTimeRange,
  setStatsTimeRange,
  coupons
}) {
  const podium = useMemo(() => calculateSportsPodium(stats.filtered), [stats.filtered]);
  const balanceData = useMemo(() => prepareBalanceChart(stats.filtered), [stats.filtered]);
  const monthlyData = useMemo(() => prepareProfitByMonthChart(stats.filtered), [stats.filtered]);
  const avgOdds = useMemo(() => getAvgOdds(stats.filtered), [stats.filtered]);
  const avgWonOdds = useMemo(() => getAvgWonOdds(stats.filtered), [stats.filtered]);
  const maxWonOdds = useMemo(() => getMaxWonOdds(stats.filtered), [stats.filtered]);
  const maxWinPLN = useMemo(() => getMaxWinPLN(stats.filtered), [stats.filtered]);

  // Bookmaker stats
  const bookmakerStats = useMemo(() => {
    const bks = {};
    stats.filtered.forEach(c => {
      const name = c.bookmaker || 'Nieznany';
      if (!bks[name]) bks[name] = {
        total: 0,
        won: 0,
        profit: 0
      };
      bks[name].total++;
      const s = Number(c.stake || 0);
      if (c.status === 'won') {
        bks[name].won++;
        bks[name].profit += s * Number(c.odds) * (1 - Number(c.tax || 0) / 100) - s;
      } else if (c.status === 'lost') {
        bks[name].profit -= s;
      } else if (c.status === 'cashout') {
        bks[name].profit += Number(c.payout || 0) - s;
      }
    });
    return Object.entries(bks).map(([name, d]) => ({
      name,
      total: d.total,
      winRate: d.total > 0 ? (d.won / d.total * 100).toFixed(1) : '0',
      profit: d.profit.toFixed(2)
    })).sort((a, b) => b.total - a.total);
  }, [stats.filtered]);

  // Win/loss distribution for pie chart
  const winLossData = useMemo(() => {
    const won = stats.filtered.filter(c => c.status === 'won').length;
    const lost = stats.filtered.filter(c => c.status === 'lost').length;
    const cashout = stats.filtered.filter(c => c.status === 'cashout').length;
    const pending = stats.filtered.filter(c => c.status === 'pending').length;
    const returned = stats.filtered.filter(c => c.status === 'returned').length;
    return [{
      name: 'Wygrane',
      value: won,
      color: '#4ade80'
    }, {
      name: 'Przegrane',
      value: lost,
      color: '#f87171'
    }, {
      name: 'Cashout',
      value: cashout,
      color: '#60a5fa'
    }, {
      name: 'Oczekujące',
      value: pending,
      color: '#facc15'
    }, {
      name: 'Zwroty',
      value: returned,
      color: '#94a3b8'
    }].filter(d => d.value > 0);
  }, [stats.filtered]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em'
    }
  }, "Statystyki"), /*#__PURE__*/React.createElement(RangeSwitcher, {
    ranges: STATS_TIME_RANGES,
    active: statsTimeRange,
    onSelect: setStatsTimeRange
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 16,
      padding: '16px 12px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 6,
      color: '#6366f1'
    }
  }, /*#__PURE__*/React.createElement(IconTarget, {
    size: 16
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 3
    }
  }, "\u015Aredni kurs"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 900
    }
  }, avgOdds)), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 16,
      padding: '16px 12px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 6,
      color: '#4ade80'
    }
  }, /*#__PURE__*/React.createElement(IconTrending, {
    size: 16
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 3
    }
  }, "Kurs wygranych"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 900
    }
  }, avgWonOdds)), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 16,
      padding: '16px 12px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 6,
      color: '#f59e0b'
    }
  }, /*#__PURE__*/React.createElement(IconTrophy, {
    size: 16
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 3
    }
  }, "Max kurs wygranej"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 900
    }
  }, maxWonOdds)), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 16,
      padding: '16px 12px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 6,
      color: '#4ade80'
    }
  }, /*#__PURE__*/React.createElement(IconTrophy, {
    size: 16
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 3
    }
  }, "Max wygrana PLN"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: '#4ade80'
    }
  }, maxWinPLN, " z\u0142"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconTrending, {
    size: 14,
    style: {
      color: '#3b82f6'
    }
  }), " Forma (bilans w czasie)"), balanceData.length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 220,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: balanceData
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "formGradPositive",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#4ade80",
    stopOpacity: 0.3
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#4ade80",
    stopOpacity: 0
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "formGradNegative",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#f87171",
    stopOpacity: 0
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#f87171",
    stopOpacity: 0.3
  }))), /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "5 5",
    stroke: "rgba(255,255,255,0.03)",
    vertical: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "name",
    stroke: "#334155",
    fontSize: 9,
    axisLine: false,
    tickLine: false,
    interval: "preserveStartEnd"
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#334155",
    fontSize: 9,
    axisLine: false,
    tickLine: false,
    tickFormatter: v => `${v} zł`,
    width: 55
  }), /*#__PURE__*/React.createElement(ReferenceLine, {
    y: 0,
    stroke: "rgba(255,255,255,0.1)",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1e293b',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12,
      fontSize: 11,
      boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
    },
    labelStyle: {
      color: '#94a3b8'
    },
    formatter: value => [`${value.toFixed(2)} PLN`, 'Bilans']
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "value",
    stroke: balanceData[balanceData.length - 1]?.value >= 0 ? '#4ade80' : '#f87171',
    strokeWidth: 3,
    fill: balanceData[balanceData.length - 1]?.value >= 0 ? 'url(#formGradPositive)' : 'url(#formGradNegative)',
    dot: false,
    activeDot: {
      r: 4,
      strokeWidth: 2,
      fill: '#1e293b'
    }
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 160,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px dashed rgba(255,255,255,0.06)',
      borderRadius: 14
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: '#475569',
      fontSize: 11,
      fontWeight: 600
    }
  }, "Wykres pojawi si\u0119 po rozliczeniu kupon\xF3w"))), podium.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconTrophy, {
    size: 14,
    style: {
      color: '#facc15'
    }
  }), " Ranking dyscyplin"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, podium.map((sport, i) => /*#__PURE__*/React.createElement("div", {
    key: sport.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: i === 0 ? 'medal-gold' : i === 1 ? 'medal-silver' : i === 2 ? 'medal-bronze' : '',
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
      fontSize: 11,
      ...(i > 2 ? {
        background: 'rgba(255,255,255,0.05)',
        color: '#64748b'
      } : {})
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 12
    }
  }, sport.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: '#64748b',
      fontWeight: 800
    }
  }, sport.winRate, "% SR")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      width: '100%',
      background: 'rgba(255,255,255,0.04)',
      borderRadius: 999,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      background: `${CHART_COLORS[i % CHART_COLORS.length]}`,
      width: `${sport.volume}%`,
      borderRadius: 999,
      transition: 'width 0.8s ease'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: '#475569',
      fontWeight: 700
    }
  }, sport.count, " kupon\xF3w"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: '#475569',
      fontWeight: 700
    }
  }, sport.volume, "% udzia\u0142u"))))))), winLossData.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16
    }
  }, "Rozk\u0142ad wynik\xF3w"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 200,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(RePieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: winLossData,
    cx: "50%",
    cy: "50%",
    innerRadius: 50,
    outerRadius: 80,
    paddingAngle: 3,
    dataKey: "value",
    stroke: "none"
  }, winLossData.map((entry, idx) => /*#__PURE__*/React.createElement(Cell, {
    key: idx,
    fill: entry.color
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1e293b',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12,
      fontSize: 11
    },
    formatter: (value, name) => [`${value} kuponów`, name]
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'center',
      marginTop: 8
    }
  }, winLossData.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: d.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      color: '#94a3b8'
    }
  }, d.name, " (", d.value, ")"))))), monthlyData.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16
    }
  }, "Zysk / strata miesi\u0119czna"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 200,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: monthlyData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "5 5",
    stroke: "rgba(255,255,255,0.03)",
    vertical: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "name",
    stroke: "#334155",
    fontSize: 9,
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: "#334155",
    fontSize: 9,
    axisLine: false,
    tickLine: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      backgroundColor: '#1e293b',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12,
      fontSize: 11
    },
    formatter: value => [`${value.toFixed(2)} PLN`, 'Bilans']
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "value",
    radius: [6, 6, 0, 0]
  }, monthlyData.map((entry, idx) => /*#__PURE__*/React.createElement(Cell, {
    key: idx,
    fill: entry.value >= 0 ? '#4ade80' : '#f87171'
  }))))))), bookmakerStats.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16
    }
  }, "Statystyki bukmacher\xF3w"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, bookmakerStats.map(bk => /*#__PURE__*/React.createElement("div", {
    key: bk.name,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 12px',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.03)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 800,
      fontSize: 12
    }
  }, bk.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      color: '#64748b'
    }
  }, bk.total, " kupon\xF3w | ", bk.winRate, "% SR")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 900,
      fontSize: 13,
      color: Number(bk.profit) >= 0 ? '#4ade80' : '#f87171'
    }
  }, Number(bk.profit) >= 0 ? '+' : '', bk.profit, " z\u0142"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass",
    style: {
      borderRadius: 16,
      padding: '16px 14px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 4
    }
  }, "Wszystkich kupon\xF3w"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      fontWeight: 900
    }
  }, stats.total)), /*#__PURE__*/React.createElement("div", {
    className: "glass",
    style: {
      borderRadius: 16,
      padding: '16px 14px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 4
    }
  }, "Suma stawek"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      fontWeight: 900
    }
  }, stats.stakeSum.toFixed(0), " z\u0142"))));
}

// ======== SETTINGS TAB ========
function SettingsTab({
  bookmakers,
  sports,
  coupons,
  user,
  db,
  onSaveBookmakers,
  onSaveSports,
  onLogout
}) {
  const [newBkName, setNewBkName] = useState('');
  const [newBkTax, setNewBkTax] = useState('12');
  const [editingBk, setEditingBk] = useState(null);
  const [editBkName, setEditBkName] = useState('');
  const [editBkTax, setEditBkTax] = useState('');
  const [savingBk, setSavingBk] = useState(false);
  const [newSportName, setNewSportName] = useState('');
  const [editingSport, setEditingSport] = useState(null);
  const [editSportName, setEditSportName] = useState('');
  const [savingSport, setSavingSport] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [exportText, setExportText] = useState('');
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const addBookmaker = async () => {
    if (!newBkName.trim() || savingBk) return;
    setSavingBk(true);
    try {
      const list = [...bookmakers, {
        id: Date.now().toString(),
        name: newBkName.trim(),
        tax: Number(newBkTax) || 0,
        count: 0
      }];
      await onSaveBookmakers(list);
      setNewBkName('');
      setNewBkTax('12');
    } catch (err) {
      console.error('Error saving bookmaker:', err);
      const d = getFirebaseErrorDetails(err, 'firestore');
      alert(d.title + '\n\n' + d.message + (d.code ? '\n\nReguły do wklejenia:\n' + d.code : '') + (d.extraSteps ? '\n\n' + d.extraSteps.join('\n') : ''));
    } finally {
      setSavingBk(false);
    }
  };
  const deleteBookmaker = async id => {
    if (!window.confirm('Na pewno usunąć bukmachera?')) return;
    try {
      await onSaveBookmakers(bookmakers.filter(b => b.id !== id));
    } catch (err) {
      console.error('Error deleting bookmaker:', err);
      const d = getFirebaseErrorDetails(err, 'firestore');
      alert(d.title + '\n\n' + d.message + (d.code ? '\n\nReguły do wklejenia:\n' + d.code : ''));
    }
  };
  const startEditBk = bk => {
    setEditingBk(bk.id);
    setEditBkName(bk.name);
    setEditBkTax(String(bk.tax));
  };
  const saveEditBk = async () => {
    if (savingBk) return;
    setSavingBk(true);
    try {
      const list = bookmakers.map(b => b.id === editingBk ? {
        ...b,
        name: editBkName.trim(),
        tax: Number(editBkTax) || 0
      } : b);
      await onSaveBookmakers(list);
      setEditingBk(null);
    } catch (err) {
      console.error('Error updating bookmaker:', err);
      const d = getFirebaseErrorDetails(err, 'firestore');
      alert(d.title + '\n\n' + d.message + (d.code ? '\n\nReguły do wklejenia:\n' + d.code : ''));
    } finally {
      setSavingBk(false);
    }
  };

  // Sports management
  const addSport = async () => {
    if (!newSportName.trim() || savingSport) return;
    setSavingSport(true);
    try {
      const list = [...sports, {
        name: newSportName.trim(),
        count: 0
      }];
      await onSaveSports(list);
      setNewSportName('');
    } catch (err) {
      console.error('Error saving sport:', err);
      const d = getFirebaseErrorDetails(err, 'firestore');
      alert(d.title + '\n\n' + d.message + (d.code ? '\n\nReguły do wklejenia:\n' + d.code : ''));
    } finally {
      setSavingSport(false);
    }
  };
  const deleteSport = async name => {
    if (!window.confirm('Na pewno usunąć dyscyplinę?')) return;
    try {
      await onSaveSports(sports.filter(s => s.name !== name));
    } catch (err) {
      console.error('Error deleting sport:', err);
      const d = getFirebaseErrorDetails(err, 'firestore');
      alert(d.title + '\n\n' + d.message + (d.code ? '\n\nReguły do wklejenia:\n' + d.code : ''));
    }
  };
  const startEditSport = sport => {
    setEditingSport(sport.name);
    setEditSportName(sport.name);
  };
  const saveEditSport = async () => {
    if (savingSport) return;
    setSavingSport(true);
    try {
      const list = sports.map(s => s.name === editingSport ? {
        ...s,
        name: editSportName.trim()
      } : s);
      await onSaveSports(list);
      setEditingSport(null);
    } catch (err) {
      console.error('Error updating sport:', err);
      const d = getFirebaseErrorDetails(err, 'firestore');
      alert(d.title + '\n\n' + d.message + (d.code ? '\n\nReguły do wklejenia:\n' + d.code : ''));
    } finally {
      setSavingSport(false);
    }
  };
  const handleExport = () => {
    const data = JSON.stringify({
      coupons,
      bookmakers,
      sports,
      date: new Date().toISOString()
    }, null, 2);
    setExportText(data);
    setShowExport(true);
    setShowImport(false);
  };
  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportText).then(() => {
      alert('Skopiowano do schowka!');
    }).catch(() => {
      // Fallback: select all text in textarea
      const ta = document.getElementById('export-textarea');
      if (ta) {
        ta.select();
        document.execCommand('copy');
      }
    });
  };
  const handleImport = async () => {
    if (!importText.trim()) {
      setImportStatus('Wklej dane JSON do pola tekstowego.');
      return;
    }
    try {
      const data = JSON.parse(importText);
      let importedCount = 0;
      if (data.bookmakers) {
        await onSaveBookmakers(data.bookmakers);
        importedCount++;
      }
      if (data.sports) {
        await onSaveSports(data.sports);
        importedCount++;
      }
      if (data.coupons && data.coupons.length > 0 && user) {
        const ref = db.collection("users").doc(user.uid).collection("coupons");
        const batch = db.batch();
        data.coupons.forEach(c => {
          const docRef = ref.doc();
          const {
            id,
            ...couponData
          } = c;
          batch.set(docRef, couponData);
        });
        await batch.commit();
        importedCount++;
      }
      setImportStatus('Dane zaimportowane pomyślnie!' + (data.coupons ? ` (${data.coupons.length} kuponów)` : ''));
      setImportText('');
    } catch (err) {
      console.error('Import error:', err);
      setImportStatus('Błąd: nieprawidłowy format JSON. Sprawdź dane i spróbuj ponownie.');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em'
    }
  }, "Ustawienia"), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconUser, {
    size: 14
  }), " Konto"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: 14,
      border: '1px solid rgba(255,255,255,0.03)',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(59,130,246,0.2)'
    }
  }, /*#__PURE__*/React.createElement(IconMail, {
    size: 18,
    style: {
      color: '#60a5fa'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: '#e2e8f0'
    }
  }, user?.email || 'Brak e-maila'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      color: '#64748b',
      fontWeight: 700,
      marginTop: 2
    }
  }, "Zalogowany"))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    className: "btn-press",
    style: {
      width: '100%',
      padding: '12px',
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.2)',
      borderRadius: 14,
      cursor: 'pointer',
      color: '#f87171',
      fontWeight: 800,
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconLogOut, {
    size: 16
  }), " Wyloguj si\u0119")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconSettings, {
    size: 14
  }), " Bukmacherzy"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 16
    }
  }, bookmakers.map(bk => /*#__PURE__*/React.createElement("div", {
    key: bk.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.03)'
    }
  }, editingBk === bk.id ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 1,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: editBkName,
    onChange: e => setEditBkName(e.target.value),
    className: "glass-input",
    style: {
      flex: 1,
      padding: '6px 10px',
      borderRadius: 8,
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: editBkTax,
    onChange: e => setEditBkTax(e.target.value),
    className: "glass-input",
    style: {
      width: 50,
      padding: '6px 8px',
      borderRadius: 8,
      fontSize: 11,
      textAlign: 'center'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: '#64748b'
    }
  }, "%"), /*#__PURE__*/React.createElement("button", {
    onClick: saveEditBk,
    disabled: savingBk,
    className: "btn-press",
    style: {
      background: 'rgba(74,222,128,0.15)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#4ade80'
    }
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditingBk(null),
    className: "btn-press",
    style: {
      background: 'rgba(248,113,113,0.15)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#f87171'
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 14
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'rgba(59,130,246,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 9,
      fontWeight: 900,
      color: '#60a5fa'
    }
  }, bk.name.substring(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 800,
      fontSize: 12
    }
  }, bk.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      color: '#64748b'
    }
  }, "Podatek: ", bk.tax, "%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => startEditBk(bk),
    className: "btn-press",
    style: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement(IconEdit, {
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteBookmaker(bk.id),
    className: "btn-press",
    style: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement(IconTrash, {
    size: 13
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px',
      border: '1px dashed rgba(255,255,255,0.08)',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#475569',
      marginBottom: 8
    }
  }, "Dodaj bukmachera"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nazwa",
    value: newBkName,
    onChange: e => setNewBkName(e.target.value),
    className: "glass-input",
    style: {
      flex: 1,
      padding: '8px 10px',
      borderRadius: 10,
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    placeholder: "%",
    value: newBkTax,
    onChange: e => setNewBkTax(e.target.value),
    className: "glass-input",
    style: {
      width: 55,
      padding: '8px 8px',
      borderRadius: 10,
      fontSize: 11,
      textAlign: 'center'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addBookmaker,
    disabled: savingBk,
    className: "btn-press",
    style: {
      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
      border: 'none',
      borderRadius: 10,
      padding: '8px 14px',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 800,
      fontSize: 10,
      whiteSpace: 'nowrap',
      opacity: savingBk ? 0.6 : 1
    }
  }, savingBk ? '...' : 'Dodaj')))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconTrophy, {
    size: 14
  }), " Dyscypliny"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 16
    }
  }, sports.map(sp => /*#__PURE__*/React.createElement("div", {
    key: sp.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.03)'
    }
  }, editingSport === sp.name ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 1,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: editSportName,
    onChange: e => setEditSportName(e.target.value),
    className: "glass-input",
    style: {
      flex: 1,
      padding: '6px 10px',
      borderRadius: 8,
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: saveEditSport,
    disabled: savingSport,
    className: "btn-press",
    style: {
      background: 'rgba(74,222,128,0.15)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#4ade80'
    }
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditingSport(null),
    className: "btn-press",
    style: {
      background: 'rgba(248,113,113,0.15)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#f87171'
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 14
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'rgba(139,92,246,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12
    }
  }, "\u26BD"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 800,
      fontSize: 12
    }
  }, sp.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => startEditSport(sp),
    className: "btn-press",
    style: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement(IconEdit, {
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteSport(sp.name),
    className: "btn-press",
    style: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      borderRadius: 8,
      padding: 6,
      cursor: 'pointer',
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement(IconTrash, {
    size: 13
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px',
      border: '1px dashed rgba(255,255,255,0.08)',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#475569',
      marginBottom: 8
    }
  }, "Dodaj dyscypline"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nazwa dyscypliny",
    value: newSportName,
    onChange: e => setNewSportName(e.target.value),
    className: "glass-input",
    style: {
      flex: 1,
      padding: '8px 10px',
      borderRadius: 10,
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addSport,
    disabled: savingSport,
    className: "btn-press",
    style: {
      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      border: 'none',
      borderRadius: 10,
      padding: '8px 14px',
      cursor: 'pointer',
      color: 'white',
      fontWeight: 800,
      fontSize: 10,
      whiteSpace: 'nowrap',
      opacity: savingSport ? 0.6 : 1
    }
  }, savingSport ? '...' : 'Dodaj')))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      borderRadius: 20,
      padding: '20px 16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#64748b',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 14
  }), " Kopia zapasowa"), /*#__PURE__*/React.createElement("button", {
    onClick: handleExport,
    className: "btn-press",
    style: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
      border: 'none',
      borderRadius: 14,
      cursor: 'pointer',
      color: 'white',
      fontWeight: 800,
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(IconDownload, {
    size: 16
  }), " Eksportuj dane (tekst)"), showExport && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    id: "export-textarea",
    readOnly: true,
    value: exportText,
    style: {
      width: '100%',
      minHeight: 120,
      padding: '10px',
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      color: '#e2e8f0',
      fontSize: 10,
      fontFamily: 'monospace',
      resize: 'vertical',
      outline: 'none'
    },
    onClick: e => e.target.select()
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleCopyExport,
    className: "btn-press",
    style: {
      width: '100%',
      padding: '10px',
      marginTop: 6,
      background: 'rgba(74,222,128,0.15)',
      border: '1px solid rgba(74,222,128,0.3)',
      borderRadius: 10,
      cursor: 'pointer',
      color: '#4ade80',
      fontWeight: 800,
      fontSize: 10,
      textTransform: 'uppercase'
    }
  }, "Kopiuj do schowka")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowImport(!showImport);
      setShowExport(false);
      setImportStatus('');
    },
    className: "btn-press",
    style: {
      width: '100%',
      padding: '14px',
      background: 'rgba(99,102,241,0.15)',
      border: '1px solid rgba(99,102,241,0.3)',
      borderRadius: 14,
      cursor: 'pointer',
      color: '#a78bfa',
      fontWeight: 800,
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconUpload, {
    size: 16
  }), " Importuj dane (tekst)"), showImport && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Wklej tutaj dane JSON...",
    value: importText,
    onChange: e => setImportText(e.target.value),
    style: {
      width: '100%',
      minHeight: 120,
      padding: '10px',
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      color: '#e2e8f0',
      fontSize: 10,
      fontFamily: 'monospace',
      resize: 'vertical',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleImport,
    className: "btn-press",
    style: {
      width: '100%',
      padding: '10px',
      marginTop: 6,
      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
      border: 'none',
      borderRadius: 10,
      cursor: 'pointer',
      color: 'white',
      fontWeight: 800,
      fontSize: 10,
      textTransform: 'uppercase'
    }
  }, "Importuj"), importStatus && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 10,
      marginTop: 6,
      color: importStatus.includes('Błąd') ? '#f87171' : '#4ade80',
      fontWeight: 700
    }
  }, importStatus))));
}

// ======== COUPON MODAL ========
function CouponModal({
  mode,
  coupon,
  onClose,
  onSave,
  bookmakers,
  sports
}) {
  const [odds, setOdds] = useState(coupon?.odds?.toString() || '');
  const [stake, setStake] = useState(coupon?.stake?.toString() || '');
  const [selectedBookie, setSelectedBookie] = useState(coupon?.bookmaker || bookmakers[0]?.name || '');
  const [selectedSport, setSelectedSport] = useState(coupon?.sport || sports[0]?.name || 'Piłka nożna');
  const [activeInput, setActiveInput] = useState('odds');

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const handleKeypad = val => {
    const setter = activeInput === 'odds' ? setOdds : setStake;
    const current = activeInput === 'odds' ? odds : stake;
    if (val === 'back') {
      setter(prev => prev.toString().slice(0, -1));
    } else if (val === '.' && current.toString().includes('.')) {
      return;
    } else {
      setter(prev => prev.toString() + val);
    }
  };
  const selectedBk = bookmakers.find(b => b.name === selectedBookie);
  const selectedTax = selectedBk ? Number(selectedBk.tax || 0) : 0;
  const potentialWin = odds && stake ? (Number(stake) * Number(odds) * (1 - selectedTax / 100)).toFixed(2) : '0.00';
  const [submitting, setSubmitting] = useState(false);
  const submit = async () => {
    if (!odds || !stake || Number(odds) <= 0 || Number(stake) <= 0) return;
    setSubmitting(true);
    try {
      await onSave({
        odds: Number(odds),
        stake: Number(stake),
        bookmaker: selectedBookie,
        sport: selectedSport,
        status: coupon?.status || 'pending',
        tax: selectedBk?.tax ?? 12,
        ...(coupon?.date ? {
          date: coupon.date
        } : {})
      });
    } catch (err) {
      console.error('Error saving coupon:', err);
      const d = getFirebaseErrorDetails(err, 'firestore');
      alert(d.title + '\n\n' + d.message + (d.code ? '\n\nReguły do wklejenia:\n' + d.code : ''));
    } finally {
      setSubmitting(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "glass-overlay animate-fade-in",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card animate-slide-up",
    style: {
      width: '100%',
      maxWidth: 480,
      borderRadius: '28px 28px 0 0',
      padding: '24px 20px',
      maxHeight: '92vh',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, mode === 'edit' ? 'Edytuj kupon' : 'Nowy kupon'), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "btn-press",
    style: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      borderRadius: 10,
      padding: 8,
      cursor: 'pointer',
      color: '#64748b'
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setActiveInput('odds'),
    style: {
      padding: '18px 16px',
      borderRadius: 18,
      border: `2px solid ${activeInput === 'odds' ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.05)'}`,
      background: activeInput === 'odds' ? 'rgba(59,130,246,0.06)' : 'rgba(255,255,255,0.02)',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 4
    }
  }, "Kurs"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 28,
      fontWeight: 900,
      fontFamily: 'monospace',
      color: activeInput === 'odds' ? '#e2e8f0' : '#94a3b8'
    }
  }, odds || '1.00')), /*#__PURE__*/React.createElement("div", {
    onClick: () => setActiveInput('stake'),
    style: {
      padding: '18px 16px',
      borderRadius: 18,
      border: `2px solid ${activeInput === 'stake' ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.05)'}`,
      background: activeInput === 'stake' ? 'rgba(59,130,246,0.06)' : 'rgba(255,255,255,0.02)',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 4
    }
  }, "Stawka (z\u0142)"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 28,
      fontWeight: 900,
      fontFamily: 'monospace',
      color: activeInput === 'stake' ? '#e2e8f0' : '#94a3b8'
    }
  }, stake || '0'))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 14,
      padding: '8px 12px',
      background: 'rgba(74,222,128,0.05)',
      borderRadius: 12,
      border: '1px solid rgba(74,222,128,0.1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b'
    }
  }, "Mo\u017Cliwa wygrana:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 900,
      color: '#4ade80'
    }
  }, potentialWin, " z\u0142")), selectedTax > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 8,
      color: '#64748b',
      marginTop: 2
    }
  }, "Podatek ", selectedTax, "% (", selectedBookie, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 6,
      marginBottom: 16
    }
  }, [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'back'].map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => handleKeypad(k.toString()),
    className: "btn-press",
    style: {
      padding: '14px 0',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.04)',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: 900,
      cursor: 'pointer',
      color: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, k === 'back' ? /*#__PURE__*/React.createElement(IconBackspace, {
    size: 20
  }) : k))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 6
    }
  }, "Bukmacher"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, bookmakers.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.id,
    onClick: () => setSelectedBookie(b.name),
    className: `chip ${selectedBookie === b.name ? 'chip-active' : 'chip-inactive'}`
  }, b.name)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#64748b',
      marginBottom: 6
    }
  }, "Dyscyplina"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, sports.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.name,
    onClick: () => setSelectedSport(s.name),
    className: `chip ${selectedSport === s.name ? 'chip-active' : 'chip-inactive'}`
  }, s.name)))), /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    disabled: submitting || !odds || !stake,
    className: "btn-press",
    style: {
      width: '100%',
      padding: '16px',
      background: submitting || !odds || !stake ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
      border: 'none',
      borderRadius: 18,
      cursor: submitting ? 'not-allowed' : 'pointer',
      color: 'white',
      fontWeight: 900,
      fontSize: 13,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
      opacity: submitting ? 0.7 : 1
    }
  }, submitting ? 'Zapisywanie...' : mode === 'edit' ? 'Zapisz zmiany' : 'Postaw zakład')));
}

// ======== RENDER ========
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
