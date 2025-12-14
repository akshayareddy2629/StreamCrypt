/* STREAMCRYPT - Complete Working Application */

const COINGECKO_API = "https://api.coingecko.com/api/v3";
const CRYPTO_IDS = [
  "bitcoin",
  "ethereum",
  "solana",
  "binancecoin",
  "ripple",
  "cardano",
  "dogecoin",
  "polkadot",
  "avalanche-2",
  "chainlink",
];

const CRYPTO_SYMBOLS = {
  bitcoin: "₿",
  ethereum: "Ξ",
  solana: "◎",
  binancecoin: "⬡",
  ripple: "✕",
  cardano: "₳",
  dogecoin: "Ð",
  polkadot: "●",
  "avalanche-2": "▲",
  chainlink: "⬢",
};

const CRYPTO_COLORS = {
  bitcoin: { hex: "#F7931A", rgb: "247, 147, 26" },
  ethereum: { hex: "#627EEA", rgb: "98, 126, 234" },
  solana: { hex: "#14F195", rgb: "20, 241, 149" },
  binancecoin: { hex: "#F3BA2F", rgb: "243, 186, 47" },
  ripple: { hex: "#23292F", rgb: "35, 41, 47" },
  cardano: { hex: "#0033AD", rgb: "0, 51, 173" },
  dogecoin: { hex: "#C2A633", rgb: "194, 166, 51" },
  polkadot: { hex: "#E6007A", rgb: "230, 0, 122" },
  "avalanche-2": { hex: "#E84142", rgb: "232, 65, 66" },
  chainlink: { hex: "#375BD2", rgb: "55, 91, 210" },
};

// Correlation Events - Historical data showing crypto-Netflix correlations
const CORRELATION_EVENTS = [
  {
    date: "Sep 2021",
    type: "rise",
    crypto: "BTC",
    cryptoChange: "+23%",
    show: "Squid Game",
    streamingChange: "+142M hours",
    description: "Squid Game breaks records, BTC hits $52K",
  },
  {
    date: "May 2022",
    type: "fall",
    crypto: "ETH",
    cryptoChange: "-38%",
    show: "Stranger Things S4",
    streamingChange: "-15M hours",
    description: "Crypto winter begins, streaming dips",
  },
  {
    date: "Nov 2022",
    type: "fall",
    crypto: "BTC",
    cryptoChange: "-18%",
    show: "Wednesday",
    streamingChange: "+89M hours",
    description: "FTX collapse, but Wednesday breaks records",
  },
  {
    date: "Jan 2023",
    type: "rise",
    crypto: "SOL",
    cryptoChange: "+140%",
    show: "The Night Agent",
    streamingChange: "+76M hours",
    description: "Solana recovery, Night Agent debuts #1",
  },
  {
    date: "Mar 2023",
    type: "rise",
    crypto: "BTC",
    cryptoChange: "+45%",
    show: "You S4",
    streamingChange: "+52M hours",
    description: "Banking crisis drives BTC, You returns",
  },
  {
    date: "Jul 2023",
    type: "fall",
    crypto: "ETH",
    cryptoChange: "-12%",
    show: "Black Mirror S6",
    streamingChange: "-8M hours",
    description: "Summer slump for both markets",
  },
  {
    date: "Oct 2023",
    type: "rise",
    crypto: "BTC",
    cryptoChange: "+28%",
    show: "The Fall of the House of Usher",
    streamingChange: "+45M hours",
    description: "ETF hopes rise, horror season peaks",
  },
  {
    date: "Dec 2024",
    type: "rise",
    crypto: "BTC",
    cryptoChange: "+15%",
    show: "Squid Game S2",
    streamingChange: "+180M hours",
    description: "BTC hits $100K, Squid Game returns",
  },
];

const NETFLIX_DATA = [
  {
    title: "Squid Game S2",
    type: "TV",
    rating: 8.1,
    year: 2024,
    genre: "Thriller",
    poster: "https://picsum.photos/seed/squid/300/450",
  },
  {
    title: "Wednesday",
    type: "TV",
    rating: 8.2,
    year: 2022,
    genre: "Comedy",
    poster: "https://picsum.photos/seed/wed/300/450",
  },
  {
    title: "Stranger Things",
    type: "TV",
    rating: 8.7,
    year: 2016,
    genre: "Sci-Fi",
    poster: "https://picsum.photos/seed/stranger/300/450",
  },
  {
    title: "The Night Agent",
    type: "TV",
    rating: 7.6,
    year: 2023,
    genre: "Action",
    poster: "https://picsum.photos/seed/night/300/450",
  },
  {
    title: "Black Mirror",
    type: "TV",
    rating: 8.7,
    year: 2011,
    genre: "Sci-Fi",
    poster: "https://picsum.photos/seed/mirror/300/450",
  },
  {
    title: "Money Heist",
    type: "TV",
    rating: 8.3,
    year: 2017,
    genre: "Thriller",
    poster: "https://picsum.photos/seed/heist/300/450",
  },
  {
    title: "The Crown",
    type: "TV",
    rating: 8.6,
    year: 2016,
    genre: "Drama",
    poster: "https://picsum.photos/seed/crown/300/450",
  },
  {
    title: "Bridgerton",
    type: "TV",
    rating: 7.3,
    year: 2020,
    genre: "Romance",
    poster: "https://picsum.photos/seed/bridge/300/450",
  },
  {
    title: "The Witcher",
    type: "TV",
    rating: 8.0,
    year: 2019,
    genre: "Fantasy",
    poster: "https://picsum.photos/seed/witcher/300/450",
  },
  {
    title: "Ozark",
    type: "TV",
    rating: 8.5,
    year: 2017,
    genre: "Crime",
    poster: "https://picsum.photos/seed/ozark/300/450",
  },
];

let cryptoData = [];
let netflixData = NETFLIX_DATA;
let charts = {};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  createLights();
  setupButton();
});

function createParticles() {
  const c = document.getElementById("landingParticles");
  if (!c) return;
  const colors = ["#E50914", "#F7931A", "#627EEA", "#14F195", "#00d4ff"];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.cssText = `left:${Math.random() * 100}%;top:${
      Math.random() * 100
    }%;width:${Math.random() * 6 + 2}px;height:${
      Math.random() * 6 + 2
    }px;background:${
      colors[Math.floor(Math.random() * colors.length)]
    };animation-delay:${Math.random() * 5}s;animation-duration:${
      Math.random() * 10 + 8
    }s;opacity:${Math.random() * 0.5 + 0.2};`;
    c.appendChild(p);
  }
}

function createLights() {
  const c = document.getElementById("strangerLights");
  if (!c) return;
  const colors = ["#E50914", "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff"];
  for (let i = 0; i < 15; i++) {
    const l = document.createElement("div");
    l.className = "stranger-light";
    l.style.cssText = `left:${Math.random() * 100}%;top:${
      Math.random() * 100
    }%;background:${
      colors[Math.floor(Math.random() * colors.length)]
    };animation-delay:${Math.random() * 2}s;animation-duration:${
      Math.random() * 0.5 + 0.3
    }s;box-shadow:0 0 15px currentColor;`;
    c.appendChild(l);
  }
}

function setupButton() {
  const btn = document.getElementById("exploreBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    document.getElementById("flickerOverlay").classList.add("active");
    document.getElementById("staticNoise").classList.add("active");
    setTimeout(() => {
      document.getElementById("flickerOverlay").classList.remove("active");
      document.getElementById("staticNoise").classList.remove("active");
      document.getElementById("landingPage").classList.add("hidden");
      startIntro();
    }, 800);
  });
}

function startIntro() {
  document.getElementById("netflixIntro").classList.add("active");
  playSound();
  loadData();
}

function playSound() {
  const s = document.getElementById("netflixSound");
  if (s) {
    s.volume = 0.5;
    s.play().catch(() => {});
  }
}

async function loadData() {
  const text = document.getElementById("loaderText");
  const bar = document.getElementById("loaderBar");

  text.textContent = "Fetching crypto data...";
  bar.style.width = "25%";
  await fetchCrypto();
  await delay(400);

  text.textContent = "Loading shows...";
  bar.style.width = "60%";
  await delay(400);

  text.textContent = "Building charts...";
  bar.style.width = "90%";
  await delay(400);

  text.textContent = "Ready!";
  bar.style.width = "100%";
  await delay(500);

  showDashboard();
}

function showDashboard() {
  const intro = document.getElementById("netflixIntro");
  intro.style.opacity = "0";
  intro.style.transition = "opacity 0.8s";
  setTimeout(() => {
    intro.classList.remove("active");
    intro.style.opacity = "";
    document.getElementById("app").classList.add("visible");
    renderAll();
    initCharts();
    setupTheme();
    startUpdates();
    animateCorrelation();
  }, 800);
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchCrypto() {
  try {
    const r = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${CRYPTO_IDS.join(
        ","
      )}&order=market_cap_desc&sparkline=true&price_change_percentage=1h,24h,7d`
    );
    if (!r.ok) throw new Error();
    cryptoData = (await r.json()).slice(0, 10);
  } catch (e) {
    cryptoData = generateFallback();
  }
}

function generateFallback() {
  const prices = [97500, 3650, 220, 710, 2.35, 0.95, 0.32, 7.5, 38, 14];
  const caps = [
    1900e9, 440e9, 105e9, 105e9, 135e9, 33e9, 47e9, 10e9, 15e9, 8e9,
  ];
  return CRYPTO_IDS.map((id, i) => ({
    id,
    symbol: id.substring(0, 3).toUpperCase(),
    name: id.charAt(0).toUpperCase() + id.slice(1).replace("-2", ""),
    current_price: prices[i],
    price_change_percentage_1h_in_currency: (Math.random() - 0.5) * 2,
    price_change_percentage_24h_in_currency: (Math.random() - 0.5) * 8,
    price_change_percentage_7d_in_currency: (Math.random() - 0.5) * 15,
    market_cap: caps[i],
    sparkline_in_7d: {
      price: Array(168)
        .fill(0)
        .map(() => prices[i] * (0.92 + Math.random() * 0.16)),
    },
  }));
}

function renderAll() {
  renderTicker();
  renderStats();
  renderCryptoCards();
  renderNetflixCards();
  renderTables();
  updateTime();
}

function renderTicker() {
  const t = document.getElementById("liveTicker");
  if (!t) return;
  t.innerHTML = cryptoData
    .slice(0, 5)
    .map((c) => {
      const ch = c.price_change_percentage_24h_in_currency || 0;
      return `<div class="ticker-item"><span class="ticker-symbol">${c.symbol.toUpperCase()}</span><span class="ticker-price">$${formatPrice(
        c.current_price
      )}</span><span class="ticker-change ${
        ch >= 0 ? "up" : "down"
      }">${formatPercent(ch)}</span></div>`;
    })
    .join("");
}

function renderStats() {
  document.getElementById("totalShows").textContent = netflixData.length;
  document.getElementById("totalMarketCap").textContent = formatLarge(
    cryptoData.reduce((s, c) => s + (c.market_cap || 0), 0)
  );
}

function animateCorrelation() {
  const el = document.getElementById("correlationValue");
  if (!el) return;
  let v = 0;
  const target = 0.847;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / 2000, 1);
    v = target * (1 - Math.pow(2, -10 * p));
    el.textContent = v.toFixed(3);
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function renderCryptoCards() {
  const g = document.getElementById("cryptoGrid");
  if (!g) return;
  g.innerHTML = cryptoData
    .map((c, i) => {
      const col = CRYPTO_COLORS[c.id] || { hex: "#888", rgb: "136,136,136" };
      const icon = CRYPTO_SYMBOLS[c.id] || c.symbol.charAt(0);
      const c1h = c.price_change_percentage_1h_in_currency || 0;
      const c24h = c.price_change_percentage_24h_in_currency || 0;
      const c7d = c.price_change_percentage_7d_in_currency || 0;
      return `<div class="crypto-card" style="--coin-color:${
        col.hex
      };--coin-rgb:${col.rgb}">
      <div class="crypto-header"><div class="crypto-info"><span class="crypto-icon" style="color:${
        col.hex
      }">${icon}</span><div><div class="crypto-name">${
        c.name
      }</div><div class="crypto-symbol">${c.symbol.toUpperCase()}</div></div></div><span class="crypto-rank">#${
        i + 1
      }</span></div>
      <div class="crypto-price">$${formatPrice(c.current_price)}</div>
      <div class="crypto-changes"><div class="crypto-change ${
        c1h >= 0 ? "up" : "down"
      }"><span>1h</span><span>${formatPercent(
        c1h
      )}</span></div><div class="crypto-change ${
        c24h >= 0 ? "up" : "down"
      }"><span>24h</span><span>${formatPercent(
        c24h
      )}</span></div><div class="crypto-change ${
        c7d >= 0 ? "up" : "down"
      }"><span>7d</span><span>${formatPercent(c7d)}</span></div></div>
      <div class="crypto-sparkline">${sparkline(
        c.sparkline_in_7d?.price || [],
        c7d >= 0 ? "#00d68f" : "#E50914"
      )}</div>
    </div>`;
    })
    .join("");
}

function renderNetflixCards() {
  const g = document.getElementById("netflixGrid");
  if (!g) return;
  g.innerHTML = netflixData
    .map(
      (s, i) => `
    <div class="netflix-card">
      <img src="${s.poster}" alt="${
        s.title
      }" class="netflix-poster" loading="lazy" onerror="this.src='https://picsum.photos/seed/fb${i}/300/450'">
      <span class="netflix-rank">${i + 1}</span>
      <div class="netflix-info"><div class="netflix-title">${
        s.title
      }</div><div class="netflix-meta"><span class="netflix-rating">★ ${
        s.rating
      }</span> • ${s.year}</div></div>
    </div>
  `
    )
    .join("");
}

function renderTables() {
  const ct = document.getElementById("cryptoTableBody");
  const nt = document.getElementById("netflixTableBody");
  if (ct) {
    ct.innerHTML = cryptoData
      .map((c, i) => {
        const ch = c.price_change_percentage_24h_in_currency || 0;
        const col = CRYPTO_COLORS[c.id] || { hex: "#888" };
        const icon = CRYPTO_SYMBOLS[c.id] || c.symbol.charAt(0);
        return `<tr><td>${
          i + 1
        }</td><td><div class="coin-cell"><span class="coin-icon" style="color:${
          col.hex
        }">${icon}</span><div><div class="coin-name">${
          c.name
        }</div><div class="coin-sym">${c.symbol.toUpperCase()}</div></div></div></td><td class="price-cell">$${formatPrice(
          c.current_price
        )}</td><td class="${
          ch >= 0 ? "change-up" : "change-down"
        }">${formatPercent(ch)}</td><td>${formatLarge(
          c.market_cap
        )}</td><td class="mini-chart">${sparkline(
          c.sparkline_in_7d?.price?.slice(-24) || [],
          ch >= 0 ? "#00d68f" : "#E50914",
          80,
          30
        )}</td></tr>`;
      })
      .join("");
  }
  if (nt) {
    nt.innerHTML = netflixData
      .map(
        (s, i) =>
          `<tr><td><strong style="color:var(--red)">${i + 1}</strong></td><td>${
            s.title
          }</td><td>${s.type}</td><td><span style="color:var(--green)">★ ${
            s.rating
          }</span></td><td>${s.year}</td></tr>`
      )
      .join("");
  }
}

function sparkline(data, color, w = 120, h = 40) {
  if (!data.length) return "";
  const min = Math.min(...data),
    max = Math.max(...data),
    range = max - min || 1;
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${
          h - ((v - min) / range) * (h - 6) - 3
        }`
    )
    .join(" ");
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polygon points="0,${h} ${pts} ${w},${h}" fill="${color}" fill-opacity="0.2"/><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2"/></svg>`;
}

function initCharts() {
  Chart.defaults.color = "#888";
  Chart.defaults.borderColor = "rgba(255,255,255,0.06)";
  Chart.defaults.font.family = "'Rajdhani', sans-serif";

  // Correlation Chart with time period data
  const corrCtx = document.getElementById("correlationChart");
  if (corrCtx) {
    charts.correlation = new Chart(corrCtx, {
      type: "line",
      data: getCorrelationData("year"),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: { position: "top", labels: { usePointStyle: true } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const label = ctx.dataset.label || "";
                const value = ctx.parsed.y;
                if (label.includes("Netflix"))
                  return `${label}: ${value}M hours`;
                return `${label}: $${value}K`;
              },
            },
          },
        },
        scales: {
          y: {
            position: "left",
            title: {
              display: true,
              text: "Netflix (M hours)",
              color: "#E50914",
            },
            grid: { color: "rgba(255,255,255,0.04)" },
          },
          y1: {
            position: "right",
            title: { display: true, text: "BTC Price ($K)", color: "#F7931A" },
            grid: { drawOnChartArea: false },
          },
          x: { grid: { color: "rgba(255,255,255,0.04)" } },
        },
      },
    });
    setupCorrelationPeriodBtns();
  }

  // Genre Chart
  const genreCtx = document.getElementById("genreChart");
  if (genreCtx) {
    const genres = {};
    netflixData.forEach((s) => (genres[s.genre] = (genres[s.genre] || 0) + 1));
    charts.genre = new Chart(genreCtx, {
      type: "doughnut",
      data: {
        labels: Object.keys(genres),
        datasets: [
          {
            data: Object.values(genres),
            backgroundColor: [
              "#E50914",
              "#F7931A",
              "#627EEA",
              "#14F195",
              "#00d4ff",
              "#9945FF",
              "#FF6B6B",
              "#4ECDC4",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true } },
        },
      },
    });
  }

  // Performance Chart
  const perfCtx = document.getElementById("performanceChart");
  if (perfCtx) {
    const labels = cryptoData.map((c) => c.symbol.toUpperCase());
    const data = cryptoData.map(
      (c) => c.price_change_percentage_24h_in_currency || 0
    );
    charts.performance = new Chart(perfCtx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "24h %",
            data,
            backgroundColor: data.map((v) =>
              v >= 0 ? "rgba(0,214,143,0.8)" : "rgba(229,9,20,0.8)"
            ),
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: { callback: (v) => v + "%" },
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // Dominance Chart
  const domCtx = document.getElementById("dominanceChart");
  if (domCtx) {
    const total = cryptoData.reduce((s, c) => s + (c.market_cap || 0), 0);
    charts.dominance = new Chart(domCtx, {
      type: "doughnut",
      data: {
        labels: cryptoData.slice(0, 5).map((c) => c.symbol.toUpperCase()),
        datasets: [
          {
            data: cryptoData
              .slice(0, 5)
              .map((c) => (((c.market_cap || 0) / total) * 100).toFixed(1)),
            backgroundColor: cryptoData
              .slice(0, 5)
              .map((c) => CRYPTO_COLORS[c.id]?.hex || "#888"),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true } },
        },
      },
    });
  }

  // Price History Chart - 7 Day Trend
  const histCtx = document.getElementById("priceHistoryChart");
  if (histCtx) {
    const btcRaw = cryptoData[0]?.sparkline_in_7d?.price || [];
    const ethRaw = cryptoData[1]?.sparkline_in_7d?.price || [];
    const solRaw = cryptoData[2]?.sparkline_in_7d?.price || [];

    // Generate fallback data if API data is empty
    const generateTrendData = (base, volatility) => {
      const data = [];
      let price = base;
      for (let i = 0; i < 168; i++) {
        price = price * (1 + (Math.random() - 0.48) * volatility);
        data.push(price);
      }
      return data;
    };

    const btc = btcRaw.length > 0 ? btcRaw : generateTrendData(97000, 0.01);
    const eth = ethRaw.length > 0 ? ethRaw : generateTrendData(3600, 0.015);
    const sol = solRaw.length > 0 ? solRaw : generateTrendData(220, 0.02);

    // Sample every 6 hours (168 hours / 6 = 28 points)
    const sampleRate = Math.max(1, Math.floor(btc.length / 28));
    const btcS = btc.filter((_, i) => i % sampleRate === 0);
    const ethS = eth.filter((_, i) => i % sampleRate === 0);
    const solS = sol.filter((_, i) => i % sampleRate === 0);

    // Normalize to percentage change from start
    const normalize = (arr) => {
      if (!arr.length || arr[0] === 0) return arr.map(() => 0);
      return arr.map((v) => (v / arr[0] - 1) * 100);
    };

    const btcN = normalize(btcS);
    const ethN = normalize(ethS);
    const solN = normalize(solS);

    // Generate labels for 7 days
    const labels = btcN.map((_, i) => {
      if (i === btcN.length - 1) return "Now";
      const daysAgo = Math.floor(((btcN.length - 1 - i) * 6) / 24);
      if (daysAgo === 0)
        return `-${Math.floor(((btcN.length - 1 - i) * 6) % 24)}h`;
      return `-${daysAgo}d`;
    });

    charts.priceHistory = new Chart(histCtx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "BTC",
            data: btcN,
            borderColor: "#F7931A",
            backgroundColor: "rgba(247,147,26,0.15)",
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2,
          },
          {
            label: "ETH",
            data: ethN,
            borderColor: "#627EEA",
            backgroundColor: "rgba(98,126,234,0.15)",
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2,
          },
          {
            label: "SOL",
            data: solN,
            borderColor: "#14F195",
            backgroundColor: "rgba(20,241,149,0.15)",
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: {
            position: "top",
            labels: { usePointStyle: true, boxWidth: 8 },
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `${ctx.dataset.label}: ${
                  ctx.parsed.y >= 0 ? "+" : ""
                }${ctx.parsed.y.toFixed(2)}%`,
            },
          },
        },
        scales: {
          y: {
            grid: { color: "rgba(255,255,255,0.04)" },
            ticks: {
              callback: (v) => (v >= 0 ? "+" : "") + v.toFixed(1) + "%",
            },
          },
          x: {
            grid: { display: false },
            ticks: { maxTicksLimit: 8 },
          },
        },
      },
    });
  }

  // Event Timeline Chart
  const eventCtx = document.getElementById("eventTimelineChart");
  if (eventCtx) {
    const eventLabels = CORRELATION_EVENTS.map((e) => e.date);
    const btcData = [44, 52, 38, 22, 28, 42, 35, 30, 42, 97];
    const streamData = [320, 380, 290, 350, 420, 380, 340, 410, 450, 470];

    // Generate event markers
    const eventMarkers = CORRELATION_EVENTS.map((e, i) => ({
      x: i,
      y: e.type === "rise" ? btcData[i] : btcData[i],
      type: e.type,
    }));

    charts.eventTimeline = new Chart(eventCtx, {
      type: "line",
      data: {
        labels: eventLabels,
        datasets: [
          {
            label: "BTC Price ($K)",
            data: btcData,
            borderColor: "#F7931A",
            backgroundColor: "rgba(247,147,26,0.1)",
            fill: true,
            tension: 0.4,
            yAxisID: "y",
            pointRadius: 6,
            pointBackgroundColor: CORRELATION_EVENTS.map((e) =>
              e.type === "rise" ? "#00d68f" : "#E50914"
            ),
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 10,
          },
          {
            label: "Netflix (M hours)",
            data: streamData,
            borderColor: "#E50914",
            backgroundColor: "rgba(229,9,20,0.1)",
            fill: true,
            tension: 0.4,
            yAxisID: "y1",
            pointRadius: 4,
            pointBackgroundColor: "#E50914",
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: { position: "top", labels: { usePointStyle: true } },
          tooltip: {
            callbacks: {
              afterBody: (ctx) => {
                const idx = ctx[0].dataIndex;
                const event = CORRELATION_EVENTS[idx];
                if (event) {
                  return [
                    "",
                    `📺 ${event.show}`,
                    `${event.crypto}: ${event.cryptoChange}`,
                    `Streaming: ${event.streamingChange}`,
                  ];
                }
                return [];
              },
            },
          },
        },
        scales: {
          y: {
            position: "left",
            title: { display: true, text: "BTC ($K)", color: "#F7931A" },
            grid: { color: "rgba(255,255,255,0.04)" },
          },
          y1: {
            position: "right",
            title: { display: true, text: "Netflix (M hrs)", color: "#E50914" },
            grid: { drawOnChartArea: false },
          },
          x: { grid: { color: "rgba(255,255,255,0.04)" } },
        },
      },
    });
  }

  // Render event cards
  renderEventCards();
}

function renderEventCards() {
  const container = document.getElementById("eventsTimeline");
  if (!container) return;

  container.innerHTML = CORRELATION_EVENTS.map(
    (event) => `
    <div class="event-card ${event.type === "rise" ? "bullish" : "bearish"}">
      <div class="event-header">
        <span class="event-date">${event.date}</span>
        <span class="event-type ${event.type}">${
      event.type === "rise" ? "📈 Rise" : "📉 Fall"
    }</span>
      </div>
      <div class="event-title">${event.description}</div>
      <div class="event-show">
        <span class="netflix-icon">📺</span>
        <span>${event.show}</span>
      </div>
      <div class="event-stats">
        <div class="event-stat">
          <span class="event-stat-label">${event.crypto}</span>
          <span class="event-stat-value ${
            event.type === "rise" ? "up" : "down"
          }">${event.cryptoChange}</span>
        </div>
        <div class="event-stat">
          <span class="event-stat-label">Streaming</span>
          <span class="event-stat-value ${
            event.streamingChange.startsWith("+") ? "up" : "down"
          }">${event.streamingChange}</span>
        </div>
      </div>
    </div>
  `
  ).join("");
}

// Correlation data for different time periods
const CORRELATION_DATA = {
  day: {
    labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],
    netflix: [120, 180, 220, 280, 380, 520, 470],
    btc: [104.2, 104.5, 104.8, 105.1, 105.4, 105.8, 105.5],
  },
  week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    netflix: [445, 452, 448, 460, 475, 490, 470],
    btc: [96, 97, 95, 98, 101, 103, 105],
  },
  month: {
    labels: ["W1", "W2", "W3", "W4"],
    netflix: [420, 435, 455, 470],
    btc: [92, 96, 100, 105],
  },
  year: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    netflix: [280, 295, 310, 325, 340, 355, 370, 385, 400, 420, 445, 470],
    btc: [42, 48, 52, 58, 62, 68, 72, 78, 85, 92, 98, 105],
  },
  all: {
    labels: [
      "2020",
      "Q2",
      "Q3",
      "Q4",
      "2021",
      "Q2",
      "Q3",
      "Q4",
      "2022",
      "Q2",
      "Q3",
      "Q4",
      "2023",
      "Q2",
      "Q3",
      "Q4",
      "2024",
      "Q2",
      "Q3",
      "Q4",
    ],
    netflix: [
      120, 140, 155, 170, 185, 200, 220, 240, 260, 275, 290, 305, 320, 340, 360,
      380, 400, 425, 450, 470,
    ],
    btc: [
      9, 11, 13, 19, 29, 35, 42, 47, 38, 30, 22, 17, 23, 28, 35, 42, 52, 68, 85,
      105,
    ],
  },
};

function getCorrelationData(period) {
  const data = CORRELATION_DATA[period] || CORRELATION_DATA.year;
  return {
    labels: data.labels,
    datasets: [
      {
        label: "Netflix (M hours)",
        data: data.netflix,
        borderColor: "#E50914",
        backgroundColor: "rgba(229,9,20,0.15)",
        fill: true,
        tension: 0.4,
        yAxisID: "y",
        pointRadius: data.labels.length > 12 ? 2 : 4,
        pointHoverRadius: 6,
      },
      {
        label: "BTC Price ($K)",
        data: data.btc,
        borderColor: "#F7931A",
        backgroundColor: "rgba(247,147,26,0.15)",
        fill: true,
        tension: 0.4,
        yAxisID: "y1",
        pointRadius: data.labels.length > 12 ? 2 : 4,
        pointHoverRadius: 6,
      },
    ],
  };
}

function setupCorrelationPeriodBtns() {
  const container = document.getElementById("correlationPeriodBtns");
  if (!container) return;
  container.addEventListener("click", (e) => {
    if (!e.target.classList.contains("period-btn")) return;
    container
      .querySelectorAll(".period-btn")
      .forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    const period = e.target.dataset.period;
    if (charts.correlation) {
      const newData = getCorrelationData(period);
      charts.correlation.data = newData;
      charts.correlation.update("active");
    }
  });
}

// Store original data for restoration
let originalCryptoData = null;
let originalNetflixData = null;

function setupTheme() {
  const btn = document.getElementById("themeBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    document.body.classList.toggle("upside-down");
    const isUD = document.body.classList.contains("upside-down");
    btn.querySelector("span:last-child").textContent = isUD
      ? "Normal Mode"
      : "Upside Down";
    if (isUD) {
      createAsh();
      invertAllData();
    } else {
      clearAsh();
      restoreData();
    }
  });
}

function invertAllData() {
  // Store originals if not already stored
  if (!originalCryptoData) {
    originalCryptoData = JSON.parse(JSON.stringify(cryptoData));
    originalNetflixData = JSON.parse(JSON.stringify(netflixData));
  }

  // Invert crypto data - flip percentages and reverse order
  cryptoData = originalCryptoData
    .map((c) => ({
      ...c,
      price_change_percentage_1h_in_currency: -(
        c.price_change_percentage_1h_in_currency || 0
      ),
      price_change_percentage_24h_in_currency: -(
        c.price_change_percentage_24h_in_currency || 0
      ),
      price_change_percentage_7d_in_currency: -(
        c.price_change_percentage_7d_in_currency || 0
      ),
      sparkline_in_7d: c.sparkline_in_7d
        ? { price: c.sparkline_in_7d.price.slice().reverse() }
        : null,
    }))
    .reverse();

  // Invert Netflix data - reverse order and flip ratings
  netflixData = originalNetflixData
    .map((s) => ({
      ...s,
      rating: (10 - parseFloat(s.rating)).toFixed(1),
    }))
    .reverse();

  // Re-render everything with inverted data
  renderAll();
  updateChartsInverted();
}

function restoreData() {
  if (originalCryptoData) {
    cryptoData = JSON.parse(JSON.stringify(originalCryptoData));
    netflixData = JSON.parse(JSON.stringify(originalNetflixData));
    renderAll();
    updateChartsNormal();
  }
}

function updateChartsInverted() {
  if (charts.performance) {
    const data = cryptoData.map(
      (c) => c.price_change_percentage_24h_in_currency || 0
    );
    charts.performance.data.labels = cryptoData.map((c) =>
      c.symbol.toUpperCase()
    );
    charts.performance.data.datasets[0].data = data;
    charts.performance.data.datasets[0].backgroundColor = data.map((v) =>
      v >= 0 ? "rgba(0,214,143,0.8)" : "rgba(229,9,20,0.8)"
    );
    charts.performance.update();
  }
  if (charts.dominance) {
    const total = cryptoData.reduce((s, c) => s + (c.market_cap || 0), 0);
    charts.dominance.data.labels = cryptoData
      .slice(0, 5)
      .map((c) => c.symbol.toUpperCase());
    charts.dominance.data.datasets[0].data = cryptoData
      .slice(0, 5)
      .map((c) => (((c.market_cap || 0) / total) * 100).toFixed(1));
    charts.dominance.update();
  }
  if (charts.genre) {
    const genres = {};
    netflixData.forEach((s) => (genres[s.genre] = (genres[s.genre] || 0) + 1));
    charts.genre.data.labels = Object.keys(genres);
    charts.genre.data.datasets[0].data = Object.values(genres);
    charts.genre.update();
  }
  if (charts.correlation) {
    charts.correlation.data.datasets[0].data = [
      470, 445, 420, 400, 385, 370, 355, 340, 325, 310, 295, 280,
    ];
    charts.correlation.data.datasets[1].data = [
      105, 98, 92, 85, 78, 72, 68, 62, 58, 52, 48, 42,
    ];
    charts.correlation.update();
  }
  if (charts.priceHistory) {
    const d0 = charts.priceHistory.data.datasets[0].data.slice();
    const d1 = charts.priceHistory.data.datasets[1].data.slice();
    const d2 = charts.priceHistory.data.datasets[2]?.data.slice() || [];
    charts.priceHistory.data.datasets[0].data = d0.map((v) => -v).reverse();
    charts.priceHistory.data.datasets[1].data = d1.map((v) => -v).reverse();
    if (charts.priceHistory.data.datasets[2]) {
      charts.priceHistory.data.datasets[2].data = d2.map((v) => -v).reverse();
    }
    charts.priceHistory.update();
  }
}

function updateChartsNormal() {
  if (charts.performance) {
    const data = cryptoData.map(
      (c) => c.price_change_percentage_24h_in_currency || 0
    );
    charts.performance.data.labels = cryptoData.map((c) =>
      c.symbol.toUpperCase()
    );
    charts.performance.data.datasets[0].data = data;
    charts.performance.data.datasets[0].backgroundColor = data.map((v) =>
      v >= 0 ? "rgba(0,214,143,0.8)" : "rgba(229,9,20,0.8)"
    );
    charts.performance.update();
  }
  if (charts.dominance) {
    const total = cryptoData.reduce((s, c) => s + (c.market_cap || 0), 0);
    charts.dominance.data.labels = cryptoData
      .slice(0, 5)
      .map((c) => c.symbol.toUpperCase());
    charts.dominance.data.datasets[0].data = cryptoData
      .slice(0, 5)
      .map((c) => (((c.market_cap || 0) / total) * 100).toFixed(1));
    charts.dominance.update();
  }
  if (charts.genre) {
    const genres = {};
    netflixData.forEach((s) => (genres[s.genre] = (genres[s.genre] || 0) + 1));
    charts.genre.data.labels = Object.keys(genres);
    charts.genre.data.datasets[0].data = Object.values(genres);
    charts.genre.update();
  }
  if (charts.correlation) {
    charts.correlation.data.datasets[0].data = [
      280, 295, 310, 325, 340, 355, 370, 385, 400, 420, 445, 470,
    ];
    charts.correlation.data.datasets[1].data = [
      42, 48, 52, 58, 62, 68, 72, 78, 85, 92, 98, 105,
    ];
    charts.correlation.update();
  }
  if (charts.priceHistory && originalCryptoData) {
    const btc = originalCryptoData[0]?.sparkline_in_7d?.price || [];
    const eth = originalCryptoData[1]?.sparkline_in_7d?.price || [];
    const sol = originalCryptoData[2]?.sparkline_in_7d?.price || [];
    const sampleRate = Math.max(1, Math.floor(btc.length / 28));
    const btcS = btc.filter((_, i) => i % sampleRate === 0);
    const ethS = eth.filter((_, i) => i % sampleRate === 0);
    const solS = sol.filter((_, i) => i % sampleRate === 0);
    const normalize = (arr) =>
      arr.length && arr[0]
        ? arr.map((v) => (v / arr[0] - 1) * 100)
        : arr.map(() => 0);
    charts.priceHistory.data.datasets[0].data = normalize(btcS);
    charts.priceHistory.data.datasets[1].data = normalize(ethS);
    if (charts.priceHistory.data.datasets[2]) {
      charts.priceHistory.data.datasets[2].data = normalize(solS);
    }
    charts.priceHistory.update();
  }
}

function createAsh() {
  const c = document.getElementById("ashParticles");
  if (!c) return;
  c.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "ash-particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = Math.random() * 10 + 8 + "s";
    p.style.animationDelay = Math.random() * 10 + "s";
    c.appendChild(p);
  }
}

function clearAsh() {
  const c = document.getElementById("ashParticles");
  if (c) c.innerHTML = "";
}

function startUpdates() {
  setInterval(async () => {
    await fetchCrypto();
    renderTicker();
    renderCryptoCards();
    renderTables();
    renderStats();
    updateTime();
  }, 30000);
  setInterval(updateTime, 1000);
}

function updateTime() {
  const t = new Date().toLocaleTimeString("en-US", { hour12: false });
  ["lastUpdate", "footerTime"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t;
  });
}

function formatPrice(p) {
  if (p >= 1000)
    return p.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (p >= 1) return p.toFixed(2);
  return p.toFixed(4);
}

function formatPercent(v) {
  return (v >= 0 ? "+" : "") + v.toFixed(2) + "%";
}

function formatLarge(n) {
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  return "$" + n.toLocaleString();
}
