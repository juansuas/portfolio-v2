(() => {
  // portfolio-v2/demos/chubut/assets/js/config.js?v=2.13.0
  var DATA_PATHS = {
    demographyPopulation: "data/poblacion_demografica.csv?v=2.8.0",
    demographyIndec: "data/poblacion_indec_provincial.csv",
    demographyMetadata: "data/demografia_metadata.json",
    attendanceRates: "data/tasas_asistencia_grupo.csv?v=2.8.0",
    capacitySections: "data/secciones_capacidad_2024.csv?v=2.8.0",
    capacityMetadata: "data/capacidad_metadata.json?v=2.8.0",
    productionInstallations: "data/instalaciones_energeticas.geojson?v=2.13.0",
    productionIndicators: "data/indicadores_productivos_departamento.csv?v=2.13.0",
    productionMetadata: "data/productivo_metadata.json?v=2.13.0",
    productionSources: "data/fuentes_productivas.csv?v=2.13.0",
    departmentBoundaries: "data/departamentos_chubut.geojson",
    metadata: "data/metadata.json?v=2.13.0"
  };
  var YEARS = Array.from({ length: 29 }, (_, index) => 2022 + index);
  var DEFAULT_CAPACITY_THRESHOLDS = Object.freeze({ INI: 18, PRI: 22, SEC: 26 });
  var COLORS = {
    primary: "#247C8C",
    primaryDark: "#14586A",
    coral: "#FF6B35",
    yellow: "#FFC928",
    support: "#63A6B1",
    critical: "#B9472F",
    brown: "#8A5A44",
    blue: "#14586A",
    green: "#247C8C",
    greenAlt: "#63A6B1",
    magenta: "#FF6B35",
    amber: "#FFC928",
    red: "#B9472F",
    ink: "#1F2933",
    muted: "#5B6470",
    line: "#E5E0D6",
    surface: "#FFFFFF",
    soft: "#FAF8F2"
  };
  var fmt = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
  var pct = new Intl.NumberFormat("es-AR", { style: "percent", maximumFractionDigits: 1 });

  // portfolio-v2/demos/chubut/assets/js/config.js
  var YEARS2 = Array.from({ length: 29 }, (_, index) => 2022 + index);
  var DEFAULT_CAPACITY_THRESHOLDS2 = Object.freeze({ INI: 18, PRI: 22, SEC: 26 });
  var MODULES = ["resumen", "demografia", "oferta", "productivos", "comparador"];
  var COLORS2 = {
    primary: "#247C8C",
    primaryDark: "#14586A",
    coral: "#FF6B35",
    yellow: "#FFC928",
    support: "#63A6B1",
    critical: "#B9472F",
    brown: "#8A5A44",
    blue: "#14586A",
    green: "#247C8C",
    greenAlt: "#63A6B1",
    magenta: "#FF6B35",
    amber: "#FFC928",
    red: "#B9472F",
    ink: "#1F2933",
    muted: "#5B6470",
    line: "#E5E0D6",
    surface: "#FFFFFF",
    soft: "#FAF8F2"
  };
  var fmt2 = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
  var pct2 = new Intl.NumberFormat("es-AR", { style: "percent", maximumFractionDigits: 1 });
  function occupancyStatus(value) {
    if (value > 1) return { label: "Saturada", className: "critical", color: COLORS2.red };
    if (value >= 0.85) return { label: "Alta presi\xF3n", className: "warn", color: COLORS2.coral };
    if (value >= 0.6) return { label: "Equilibrio", className: "balanced", color: COLORS2.yellow };
    return { label: "Capacidad disponible", className: "available", color: COLORS2.support };
  }

  // portfolio-v2/demos/chubut/assets/js/state.js
  var STORAGE_KEY = "chubut2050.v2.filters";
  var DEFAULTS_REVISION = 4;
  var defaults = { defaultsRevision: DEFAULTS_REVISION, module: "demografia", year: 2050, demographyYear: 2050, capacityYear: 2024, territory: "all", educationSelection: "all", sex: "all", demographyMapMetric: "variation", capacitySchool: "all", capacityMode: "scenario", capacityComparisonMode: "scenario", capacityTrendView: "group", capacityDistributionMode: "count", capacityDepartmentLevel: "all", capacityAttendanceLevels: ["INI", "PRI", "SEC", "AGE18"], capacityRates: {}, capacityThresholds: { ...DEFAULT_CAPACITY_THRESHOLDS2 }, productActivity: "all", productOperator: "all", productStatus: "all", productInstallation: "", scenarioProductDepartment: "", scenarioProductActivity: "", scenarioProductChangeType: "AMPLIACION", scenarioProductCapacityMw: "", scenarioProductYear: 2030, scenarioProductJobsPerMw: "", scenarioProductChanges: [] };
  var listeners = /* @__PURE__ */ new Set();
  var ranges = { all: "0-100", "level:INI": "0-5", "group:0_3": "0-3", "group:4_5": "4-5", "level:PRI": "6-11", "group:6_11": "6-11", "level:SEC": "12-17", "group:12_14": "12-14", "group:15_17": "15-17", "group:18_SEC": "18-18" };
  function saved() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }
  function migrate(value) {
    const territory = value.territory ?? value.capacityTerritory ?? value.demographyTerritory ?? "all";
    const hasCurrentDefaults = Number(value.defaultsRevision || 0) >= DEFAULTS_REVISION;
    const module = location.hash.slice(1) || value.module || defaults.module, demographyYear = Number(hasCurrentDefaults ? value.demographyYear ?? defaults.demographyYear : defaults.demographyYear), capacityYear = Math.max(2024, Number(value.capacityYear ?? defaults.capacityYear)), year = module === "oferta" ? capacityYear : module === "demografia" ? demographyYear : Number(value.year ?? demographyYear);
    const demographyMapMetric = hasCurrentDefaults ? value.demographyMapMetric ?? defaults.demographyMapMetric : defaults.demographyMapMetric;
    const sex = value.sex ?? value.capacitySex ?? value.demographySex ?? "all";
    let educationSelection = value.educationSelection;
    if (!educationSelection) {
      if (value.capacityGroup && value.capacityGroup !== "all") educationSelection = `group:${value.capacityGroup}`;
      else if (value.capacityLevel && value.capacityLevel !== "all") educationSelection = `level:${value.capacityLevel}`;
      else educationSelection = "all";
    }
    const capacityAttendanceLevels = Array.isArray(value.capacityAttendanceLevels) ? value.capacityAttendanceLevels.filter((id) => ["INI", "PRI", "SEC", "AGE18"].includes(id)) : [...defaults.capacityAttendanceLevels];
    const capacityDepartmentLevel = ["all", "INI", "PRI", "SEC", "AGE18"].includes(value.capacityDepartmentLevel) ? value.capacityDepartmentLevel : defaults.capacityDepartmentLevel;
    const scenarioProductChanges = Array.isArray(value.scenarioProductChanges) ? value.scenarioProductChanges : [];
    const scenarioProductChangeType = value.scenarioProductChangeType === "REDUCCION" ? "REDUCCION" : "AMPLIACION";
    const scenarioProductYear = Math.max(2026, Math.min(2050, Number(value.scenarioProductYear) || 2030));
    return { ...defaults, ...value, defaultsRevision: DEFAULTS_REVISION, territory, year, demographyYear, capacityYear, sex, educationSelection, demographyMapMetric, capacityAttendanceLevels, capacityDepartmentLevel, capacityThresholds: { ...DEFAULT_CAPACITY_THRESHOLDS2, ...value.capacityThresholds || {} }, scenarioProductChanges, scenarioProductChangeType, scenarioProductYear, module };
  }
  var state = migrate(saved());
  function aliases() {
    const selection = state.educationSelection;
    const group = selection.startsWith("group:") ? selection.slice(6) : "all";
    const level = selection.startsWith("level:") ? selection.slice(6) : group === "18_SEC" ? "all" : { "0_3": "INI", "4_5": "INI", "6_11": "PRI", "12_14": "SEC", "15_17": "SEC" }[group] || "all";
    return { ...state, demographyTerritory: state.territory, capacityTerritory: state.territory, demographySex: state.sex, capacitySex: state.sex, demographyAgeRange: ranges[selection] || "0-100", demographyAgeMode: "preset", capacityGroup: group, capacityLevel: level };
  }
  function getState() {
    return aliases();
  }
  function setState(patch, { persist = true } = {}) {
    const next = { ...patch };
    if ("demographyTerritory" in next || "capacityTerritory" in next) next.territory = next.capacityTerritory ?? next.demographyTerritory;
    if ("demographySex" in next || "capacitySex" in next) next.sex = next.capacitySex ?? next.demographySex;
    const targetModule = next.module ?? state.module;
    if ("demographyYear" in next) {
      next.demographyYear = Number(next.demographyYear);
      if (targetModule === "demografia" && !("year" in next)) next.year = next.demographyYear;
    }
    if ("capacityYear" in next) {
      next.capacityYear = Math.max(2024, Number(next.capacityYear));
      if (targetModule === "oferta" && !("year" in next)) next.year = next.capacityYear;
    }
    if ("module" in next && !("year" in next)) next.year = next.module === "oferta" ? state.capacityYear : next.module === "demografia" ? state.demographyYear : state.year;
    if ("year" in next) {
      next.year = Number(next.year);
      if (targetModule === "oferta") next.capacityYear = Math.max(2024, next.year);
      else if (targetModule === "demografia") next.demographyYear = next.year;
    }
    state = { ...state, ...next };
    if (persist) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    listeners.forEach((listener) => listener(getState(), next));
  }
  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  function resetState() {
    const module = state.module, year = module === "oferta" ? defaults.capacityYear : defaults.demographyYear;
    state = { ...defaults, year, capacityAttendanceLevels: [...defaults.capacityAttendanceLevels], capacityThresholds: { ...DEFAULT_CAPACITY_THRESHOLDS2 }, scenarioProductChanges: [], module };
    setState({}, {});
  }

  // portfolio-v2/demos/chubut/assets/js/router.js
  function initRouter(onRoute) {
    const activate = () => {
      const requested = location.hash.replace("#", "");
      const route = MODULES.includes(requested) ? requested : "demografia";
      if (getState().module !== route) setState({ module: route });
      document.querySelectorAll("[data-module]").forEach((element) => {
        element.hidden = element.dataset.module !== route;
      });
      document.querySelectorAll("[data-route]").forEach((element) => element.classList.toggle("active", element.dataset.route === route));
      onRoute?.(route);
    };
    addEventListener("hashchange", activate);
    if (!MODULES.includes(location.hash.slice(1))) history.replaceState(null, "", "#demografia");
    activate();
  }

  // portfolio-v2/demos/chubut/assets/js/data.js?v=2.13.0
  function readDemoFile(path) {
    const key = path.split("?")[0];
    if (!Object.hasOwn(chubutDemoFiles, key)) throw new Error("No se encontr\xF3 el recurso: " + key);
    return chubutDemoFiles[key];
  }
  async function fetchJSON(path) {
    return JSON.parse(readDemoFile(path));
  }
  async function fetchCSV(path) {
    const text = readDemoFile(path);
    return new Promise((resolve, reject) => Papa.parse(text, { header: true, skipEmptyLines: true, dynamicTyping: true, complete: (r) => r.errors.length ? reject(new Error(`CSV inv\xE1lido: ${path}`)) : resolve(r.data), error: reject }));
  }
  var pending = /* @__PURE__ */ new Map();
  function once(key, loader) {
    if (!pending.has(key)) pending.set(key, loader());
    return pending.get(key);
  }
  async function loadCoreData() {
    return once("core", async () => {
      const [departmentBoundaries, metadata] = await Promise.all([fetchJSON(DATA_PATHS.departmentBoundaries), fetchJSON(DATA_PATHS.metadata)]);
      const territoryById = Object.fromEntries(departmentBoundaries.features.map((f) => [String(f.properties.territorio_id), f.properties]));
      return { departmentBoundaries, metadata, territoryById };
    });
  }
  async function loadDemographyData() {
    return once("demography", async () => {
      const [population2, demographyIndec, demographyMetadata] = await Promise.all([fetchCSV(DATA_PATHS.demographyPopulation), fetchCSV(DATA_PATHS.demographyIndec), fetchJSON(DATA_PATHS.demographyMetadata)]);
      return { demographyPopulation: population2.map((r) => ({ territorio_id: String(r.departamento_id).padStart(5, "0"), territorio_nombre: r.departamento_nombre, year: Number(r.year), edad: Number(r.edad), sexo: r.sexo_id, poblacion: Number(r.poblacion) || 0 })), demographyIndec: demographyIndec.map((r) => ({ ...r, year: Number(r.year), poblacion: Number(r.poblacion) })), demographyMetadata };
    });
  }
  async function loadCapacityData() {
    return once("capacity", async () => {
      const [attendanceRaw, capacityRaw, capacityMetadata] = await Promise.all([fetchCSV(DATA_PATHS.attendanceRates), fetchCSV(DATA_PATHS.capacitySections), fetchJSON(DATA_PATHS.capacityMetadata)]);
      return { attendanceRates: attendanceRaw.map((r) => ({ ...r, territorio_id: String(r.territorio_id), tasa_asistencia: r.tasa_asistencia === "" || r.tasa_asistencia == null ? null : Number(r.tasa_asistencia), numerador: r.numerador === "" || r.numerador == null ? null : Number(r.numerador), denominador: r.denominador === "" || r.denominador == null ? null : Number(r.denominador) })), capacitySections: capacityRaw.map((r) => ({ ...r, departamento_id: String(r.departamento_id).padStart(5, "0"), cue_anexo: String(r.cue_anexo).padStart(9, "0"), matricula_actual: Number(r.matricula_actual) || 0, matricula_varones_actual: Number(r.matricula_varones_actual) || 0, matricula_mujeres_actual: Number(r.matricula_mujeres_actual) || 0, capacidad: Number(r.capacidad) || 0, longitud: r.longitud == null ? null : Number(r.longitud), latitud: r.latitud == null ? null : Number(r.latitud) })), capacityMetadata };
    });
  }
  async function loadProductionData() {
    return once("production", async () => {
      const [installationGeoJSON, indicatorRows, productionMetadata, sourceRows] = await Promise.all([
        fetchJSON(DATA_PATHS.productionInstallations),
        fetchCSV(DATA_PATHS.productionIndicators),
        fetchJSON(DATA_PATHS.productionMetadata),
        fetchCSV(DATA_PATHS.productionSources)
      ]);
      const productionInstallations = installationGeoJSON.features.map((feature) => ({
        ...feature.properties,
        departamento_id: String(feature.properties.departamento_id).padStart(5, "0"),
        latitud: Number(feature.geometry.coordinates[1]),
        longitud: Number(feature.geometry.coordinates[0]),
        capacidad_instalada_mw: feature.properties.capacidad_instalada_mw == null ? null : Number(feature.properties.capacidad_instalada_mw),
        potencia_declarada_proyecto_mw: feature.properties.potencia_declarada_proyecto_mw == null ? null : Number(feature.properties.potencia_declarada_proyecto_mw),
        turbinas_unidades: feature.properties.turbinas_unidades == null ? null : Number(feature.properties.turbinas_unidades)
      }));
      const productionIndicators = indicatorRows.map((row) => ({ ...row, departamento_id: String(row.departamento_id).padStart(5, "0"), instalaciones_total: Number(row.instalaciones_total) || 0, instalaciones_con_capacidad: Number(row.instalaciones_con_capacidad) || 0, capacidad_instalada_mw_conocida: row.capacidad_instalada_mw_conocida == null || row.capacidad_instalada_mw_conocida === "" ? null : Number(row.capacidad_instalada_mw_conocida), potencia_declarada_proyecto_mw: row.potencia_declarada_proyecto_mw == null || row.potencia_declarada_proyecto_mw === "" ? null : Number(row.potencia_declarada_proyecto_mw) }));
      const productionSourceById = Object.fromEntries(sourceRows.map((row) => [row.fuente_id, row]));
      return { productionInstallationGeoJSON: installationGeoJSON, productionInstallations, productionIndicators, productionMetadata, productionSources: sourceRows, productionSourceById };
    });
  }

  // portfolio-v2/demos/chubut/assets/js/maps.js
  var registry = {};
  function ensure(id) {
    if (registry[id]) {
      setTimeout(() => registry[id].map.invalidateSize(), 0);
      return registry[id];
    }
    const map = L.map(id, { zoomControl: true, scrollWheelZoom: false, attributionControl: true }).setView([-43.8, -68.3], 6);
    const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "\xA9 OpenStreetMap" }).addTo(map);
    registry[id] = { map, base, layers: [], control: null, legend: null };
    return registry[id];
  }
  function reset(entry) {
    entry.layers.forEach((layer) => entry.map.removeLayer(layer));
    entry.layers = [];
    if (entry.control) entry.map.removeControl(entry.control);
    if (entry.legend) entry.map.removeControl(entry.legend);
  }
  function jenksBreaks(inputValues, requestedClasses = 5) {
    const values = inputValues.filter(Number.isFinite).sort((a, b) => a - b);
    if (!values.length) return [0, 0];
    const classCount = Math.min(requestedClasses, new Set(values).size, values.length);
    if (classCount <= 1) return [values[0], values[values.length - 1]];
    const lower = Array.from({ length: values.length + 1 }, () => Array(classCount + 1).fill(0));
    const variance = Array.from({ length: values.length + 1 }, () => Array(classCount + 1).fill(Infinity));
    for (let column = 1; column <= classCount; column++) {
      lower[1][column] = 1;
      variance[1][column] = 0;
    }
    for (let length = 2; length <= values.length; length++) {
      let sum2 = 0, sumSquares = 0, weight = 0, currentVariance = 0;
      for (let offset = 1; offset <= length; offset++) {
        const lowerLimit = length - offset + 1;
        const value = values[lowerLimit - 1];
        weight++;
        sum2 += value;
        sumSquares += value * value;
        currentVariance = sumSquares - sum2 * sum2 / weight;
        const previous = lowerLimit - 1;
        if (previous !== 0) {
          for (let column = 2; column <= classCount; column++) {
            const candidate = currentVariance + variance[previous][column - 1];
            if (candidate <= variance[length][column]) {
              lower[length][column] = lowerLimit;
              variance[length][column] = candidate;
            }
          }
        }
      }
      lower[length][1] = 1;
      variance[length][1] = currentVariance;
    }
    const breaks = Array(classCount + 1).fill(0);
    breaks[0] = values[0];
    breaks[classCount] = values[values.length - 1];
    let valueIndex = values.length;
    for (let column = classCount; column > 1; column--) {
      const breakIndex = Math.max(0, Math.floor(lower[valueIndex][column]) - 2);
      breaks[column - 1] = values[breakIndex];
      valueIndex = Math.max(1, Math.floor(lower[valueIndex][column]) - 1);
    }
    return breaks;
  }
  function populationScale(stats) {
    const breaks = jenksBreaks(stats.map((item) => item.value), 5);
    const palette = ["#E3F0F2", "#BBD9DE", "#86B9C2", COLORS2.primary, COLORS2.primaryDark];
    const classCount = breaks.length - 1;
    return { breaks, colors: palette.slice(palette.length - classCount) };
  }
  function populationColor(value, scale) {
    for (let index = 1; index < scale.breaks.length; index++) {
      if (value <= scale.breaks[index]) return scale.colors[index - 1];
    }
    return scale.colors[scale.colors.length - 1];
  }
  function variationBand(value) {
    if (value === null || !Number.isFinite(value)) return { color: "#D9DEDF", label: "Sin dato" };
    if (value < -0.1) return { color: "#A64032", label: "Disminuye m\xE1s de 10%" };
    if (value < -0.02) return { color: "#E59A82", label: "Disminuye entre 2% y 10%" };
    if (value <= 0.02) return { color: "#E1E2DE", label: "Sin cambio relevante (\xB12%)" };
    if (value <= 0.1) return { color: "#8FC1C8", label: "Aumenta entre 2% y 10%" };
    return { color: COLORS2.primaryDark, label: "Aumenta m\xE1s de 10%" };
  }
  function variationColor(value) {
    return variationBand(value).color;
  }
  function variationText(value) {
    if (value === null || !Number.isFinite(value)) return "Sin dato";
    if (value < -0.02) return `Disminuye ${pct2.format(Math.abs(value))}`;
    if (value > 0.02) return `Aumenta ${pct2.format(value)}`;
    return `Sin cambio relevante (${pct2.format(value)})`;
  }
  function demographySexLabel(sex) {
    return sex === "M" ? "Varones" : sex === "F" ? "Mujeres" : "Ambos sexos";
  }
  function addDemographyLegend(entry, state2, scale) {
    const legend2 = L.control({ position: "bottomright" });
    legend2.onAdd = () => {
      const div = L.DomUtil.create("div", "map-legend");
      if (state2.demographyMapMetric === "variation") {
        div.innerHTML = `<strong>Cambio desde 2022</strong>
        <div class="legend-row"><span class="legend-swatch" style="background:#A64032"></span>Disminuye &gt;10%</div>
        <div class="legend-row"><span class="legend-swatch" style="background:#E59A82"></span>Disminuye 2%\u201310%</div>
        <div class="legend-row"><span class="legend-swatch" style="background:#E1E2DE"></span>Estable (\xB12%)</div>
        <div class="legend-row"><span class="legend-swatch" style="background:#8FC1C8"></span>Aumenta 2%\u201310%</div>
        <div class="legend-row"><span class="legend-swatch" style="background:${COLORS2.primaryDark}"></span>Aumenta &gt;10%</div>`;
      } else {
        const labels = scale.colors.map((_, index) => {
          const minimum = index === 0 ? scale.breaks[0] : scale.breaks[index] + 1;
          const maximum = scale.breaks[index + 1];
          return minimum === maximum ? fmt2.format(minimum) : `${fmt2.format(minimum)}\u2013${fmt2.format(maximum)}`;
        });
        div.innerHTML = `<strong>Poblaci\xF3n \xB7 cortes naturales</strong>${labels.map((label, index) => `<div class="legend-row"><span class="legend-swatch" style="background:${scale.colors[index]}"></span>${label}</div>`).join("")}`;
      }
      return div;
    };
    legend2.addTo(entry.map);
    entry.legend = legend2;
  }
  function renderDemographyMap(data2, state2, stats, onSelect) {
    const entry = ensure("demography-map");
    reset(entry);
    const byTerritory = Object.fromEntries(stats.map((item) => [item.territorio_id, item]));
    const scale = populationScale(stats);
    const selectedId = state2.demographyTerritory;
    const metric = state2.demographyMapMetric;
    const layer = L.geoJSON(data2.departmentBoundaries, {
      style: (feature) => {
        const item = byTerritory[String(feature.properties.territorio_id)];
        const selected2 = selectedId === String(feature.properties.territorio_id);
        return {
          color: selected2 ? COLORS2.ink : COLORS2.surface,
          weight: selected2 ? 3 : 1.2,
          fillColor: metric === "variation" ? variationColor(item?.variation) : populationColor(item?.value || 0, scale),
          fillOpacity: 0.78
        };
      },
      onEachFeature: (feature, featureLayer) => {
        const item = byTerritory[String(feature.properties.territorio_id)];
        const variation = variationText(item?.variation);
        const context = `${state2.demographyYear} \xB7 edades ${state2.demographyAgeRange.replace("-", "\u2013")} \xB7 ${demographySexLabel(state2.demographySex)}`;
        const population2 = `${fmt2.format(item?.value || 0)} personas`;
        const tooltipDetail = metric === "variation" ? `${variation} desde 2022 \xB7 ${population2}` : `${population2} \xB7 ${variation} desde 2022`;
        featureLayer.bindTooltip(`<div class="map-tooltip"><strong>${feature.properties.territorio_nombre}</strong><br>${tooltipDetail}</div>`);
        featureLayer.bindPopup(`<strong>${feature.properties.territorio_nombre}</strong><br>${context}<br>Poblaci\xF3n: ${population2}<br>Cambio desde 2022: ${variation}`);
        featureLayer.on("click", () => onSelect?.(String(feature.properties.territorio_id)));
      }
    }).addTo(entry.map);
    entry.layers = [layer];
    addDemographyLegend(entry, state2, scale);
    const selected = selectedId === "all" ? data2.departmentBoundaries : data2.departmentBoundaries.features.find((feature) => String(feature.properties.territorio_id) === selectedId);
    const bounds = L.geoJSON(selected || data2.departmentBoundaries).getBounds();
    if (bounds.isValid()) entry.map.fitBounds(bounds, { padding: [24, 24], maxZoom: selectedId === "all" ? 7 : 9 });
  }

  // portfolio-v2/demos/chubut/assets/js/demography.js
  var DEMOGRAPHY_BASE_YEAR = 2022;
  function demographyTerritoryName(data2, id) {
    if (id === "all") return "Toda la provincia";
    return data2.demographyPopulation.find((row) => row.territorio_id === id)?.territorio_nombre || "Toda la provincia";
  }
  function parseAgeRange(ageRange) {
    const [min, max] = String(ageRange).split("-").map(Number);
    return { min, max };
  }
  function demographySexLabel2(sex) {
    return sex === "M" ? "Varones" : sex === "F" ? "Mujeres" : "Ambos sexos";
  }
  function demographyRows(data2, state2, { year = state2.demographyYear, ageRange = state2.demographyAgeRange, sex = state2.demographySex || "all" } = {}) {
    const { min, max } = parseAgeRange(ageRange);
    return data2.demographyPopulation.filter((row) => (state2.demographyTerritory === "all" || row.territorio_id === state2.demographyTerritory) && (year === "all" || row.year === Number(year)) && row.edad >= min && row.edad <= max && (sex === "all" || row.sexo === sex));
  }
  function demographyMapStats(data2, state2) {
    const { min, max } = parseAgeRange(state2.demographyAgeRange);
    const selectedSex = state2.demographySex || "all";
    const years = /* @__PURE__ */ new Set([DEMOGRAPHY_BASE_YEAR, Number(state2.demographyYear)]);
    const totals = /* @__PURE__ */ new Map();
    data2.demographyPopulation.forEach((row) => {
      if (!years.has(row.year) || row.edad < min || row.edad > max || selectedSex !== "all" && row.sexo !== selectedSex) return;
      const key = `${row.territorio_id}:${row.year}`;
      totals.set(key, (totals.get(key) || 0) + Number(row.poblacion || 0));
    });
    return data2.departmentBoundaries.features.map((feature) => {
      const id = String(feature.properties.territorio_id);
      const value = totals.get(`${id}:${Number(state2.demographyYear)}`) || 0;
      const base = totals.get(`${id}:${DEMOGRAPHY_BASE_YEAR}`) || 0;
      return {
        territorio_id: id,
        territorio_nombre: feature.properties.territorio_nombre,
        value,
        base,
        variation: base ? value / base - 1 : null
      };
    });
  }
  function populationTotal(rows) {
    return rows.reduce((total, row) => total + Number(row.poblacion || 0), 0);
  }
  function totalForRange(data2, state2, ageRange, year = state2.demographyYear) {
    return populationTotal(demographyRows(data2, state2, { year, ageRange }));
  }

  // portfolio-v2/demos/chubut/assets/js/charts.js
  var layoutBase = {
    paper_bgcolor: COLORS2.surface,
    plot_bgcolor: COLORS2.surface,
    font: { family: "Inter, system-ui, sans-serif", color: COLORS2.ink, size: 12 },
    margin: { l: 55, r: 20, t: 28, b: 48 },
    hoverlabel: { bgcolor: COLORS2.surface, bordercolor: COLORS2.line, font: { color: COLORS2.ink } },
    xaxis: { gridcolor: "#EEF0EE", zeroline: false },
    yaxis: { gridcolor: "#EEF0EE", zeroline: false, separatethousands: true },
    legend: { orientation: "h", y: 1.12, x: 0 }
  };
  var config = { displayModeBar: false, responsive: true };
  function plot(id, traces, layout2 = {}) {
    const el = document.getElementById(id);
    if (!el) return;
    Plotly.react(el, traces, { ...layoutBase, ...layout2, autosize: true }, config);
    requestAnimationFrame(() => Plotly.Plots.resize(el));
  }
  function renderDemographyChart(data2, state2, onYearSelect) {
    const rows = demographyRows(data2, state2, { year: "all" });
    const years = Array.from({ length: 29 }, (_, index) => 2022 + index);
    const values = years.map((year) => populationTotal(rows.filter((row) => row.year === year)));
    const traces = [{
      type: "scatter",
      mode: "lines+markers",
      name: "Proyecci\xF3n departamental",
      x: years,
      y: values,
      line: { color: COLORS2.primary, width: 3 },
      marker: { color: COLORS2.primary, size: 5 },
      hovertemplate: "%{x}<br>%{y:,.0f} personas<br>Clic para seleccionar el a\xF1o<extra></extra>"
    }];
    if (state2.demographyTerritory === "all" && state2.demographyAgeRange === "0-100") {
      const referenceSex = state2.demographySex === "all" ? "T" : state2.demographySex;
      const reference = data2.demographyIndec.filter((row) => row.sexo === referenceSex);
      traces.push({
        type: "scatter",
        mode: "lines+markers",
        name: "Referencia INDEC provincial",
        x: reference.map((row) => row.year),
        y: reference.map((row) => row.poblacion),
        line: { color: COLORS2.muted, width: 2, dash: "dot" },
        marker: { color: COLORS2.muted, size: 4 },
        hovertemplate: "Referencia INDEC %{x}<br>%{y:,.0f} personas<extra></extra>"
      });
    }
    const activeYear = Number(state2.demographyYear), activeValue = values[activeYear - 2022];
    traces.push({
      type: "scatter",
      mode: "markers",
      name: "A\xF1o seleccionado",
      showlegend: false,
      x: [activeYear],
      y: [activeValue],
      marker: { color: COLORS2.yellow, size: 12, line: { color: COLORS2.primaryDark, width: 2 } },
      hovertemplate: `A\xF1o seleccionado ${activeYear}<br>%{y:,.0f} personas<extra></extra>`
    });
    plot("demography-chart", traces, { yaxis: { ...layoutBase.yaxis, title: "Poblaci\xF3n" }, hovermode: "x unified", clickmode: "event+select", shapes: [{ type: "line", x0: activeYear, x1: activeYear, y0: 0, y1: 1, yref: "paper", line: { color: COLORS2.yellow, width: 1.5, dash: "dot" } }] });
    const chart = document.getElementById("demography-chart");
    if (chart && onYearSelect) {
      if (chart._demographyYearClickHandler) chart.removeListener?.("plotly_click", chart._demographyYearClickHandler);
      chart._demographyYearClickHandler = (event) => {
        const year = Math.round(Number(event.points?.[0]?.x));
        if (Number.isInteger(year) && year >= 2022 && year <= 2050) onYearSelect(year);
      };
      chart.on("plotly_click", chart._demographyYearClickHandler);
      chart.style.cursor = "pointer";
    }
  }
  function renderPopulationPyramid(data2, state2) {
    const rows = demographyRows(data2, state2, { ageRange: "0-100", sex: "all" });
    const groups = [...Array.from({ length: 20 }, (_, index) => ({ min: index * 5, max: index * 5 + 4, label: `${index * 5}\u2013${index * 5 + 4}` })), { min: 100, max: 100, label: "100+" }];
    const male = groups.map((group) => -populationTotal(rows.filter((row) => row.sexo === "M" && row.edad >= group.min && row.edad <= group.max)));
    const female = groups.map((group) => populationTotal(rows.filter((row) => row.sexo === "F" && row.edad >= group.min && row.edad <= group.max)));
    const baselineRows = Number(state2.demographyYear) === 2022 ? [] : demographyRows(data2, state2, { year: 2022, ageRange: "0-100", sex: "all" });
    const baselineMale = groups.map((group) => -populationTotal(baselineRows.filter((row) => row.sexo === "M" && row.edad >= group.min && row.edad <= group.max)));
    const baselineFemale = groups.map((group) => populationTotal(baselineRows.filter((row) => row.sexo === "F" && row.edad >= group.min && row.edad <= group.max)));
    const maxValue = Math.max(1, ...female, ...male.map(Math.abs), ...baselineFemale, ...baselineMale.map(Math.abs));
    const step = Math.max(100, Math.ceil(maxValue / 4 / 1e3) * 1e3);
    const ticks = Array.from({ length: 9 }, (_, i) => (i - 4) * step);
    const traces = [
      { type: "bar", orientation: "h", name: "Varones", y: groups.map((group) => group.label), x: male, marker: { color: COLORS2.primary }, customdata: male.map(Math.abs), hovertemplate: "Edad %{y}<br>Varones: %{customdata:,.0f}<extra></extra>" },
      { type: "bar", orientation: "h", name: "Mujeres", y: groups.map((group) => group.label), x: female, marker: { color: COLORS2.coral }, hovertemplate: "Edad %{y}<br>Mujeres: %{x:,.0f}<extra></extra>" }
    ];
    if (baselineRows.length) {
      traces.push(
        { type: "scatter", mode: "lines", name: "Silueta 2022", legendgroup: "baseline2022", y: groups.map((group) => group.label), x: baselineMale, customdata: baselineMale.map(Math.abs), line: { color: COLORS2.ink, width: 1.3, dash: "dot", shape: "hv" }, hovertemplate: "Referencia 2022<br>Edad %{y}<br>Varones: %{customdata:,.0f}<extra></extra>" },
        { type: "scatter", mode: "lines", name: "Silueta 2022", legendgroup: "baseline2022", showlegend: false, y: groups.map((group) => group.label), x: baselineFemale, line: { color: COLORS2.ink, width: 1.3, dash: "dot", shape: "hv" }, hovertemplate: "Referencia 2022<br>Edad %{y}<br>Mujeres: %{x:,.0f}<extra></extra>" }
      );
    }
    plot("population-pyramid", traces, { barmode: "relative", margin: { l: 58, r: 20, t: 34, b: 48 }, xaxis: { gridcolor: "#EEF0EE", zeroline: true, zerolinecolor: COLORS2.primaryDark, tickvals: ticks, ticktext: ticks.map((x) => Math.abs(x).toLocaleString("es-AR")), title: "Poblaci\xF3n" }, yaxis: { gridcolor: "transparent", title: "Grupo de edad" }, legend: { orientation: "h", y: 1.13, x: 0.18 } });
  }
  function renderDepartmentShareChart(data2, state2) {
    const stats = demographyMapStats(data2, state2);
    const total = Math.max(1, stats.reduce((acc, item) => acc + item.value, 0));
    const ordered = [...stats].map((item) => ({ ...item, share: item.value / total })).sort((a, b) => b.share - a.share);
    const palette = ["#14586A", "#247C8C", "#3C919F", "#63A6B1", "#8ABBC2", "#FF6B35", "#E98645", "#FFC928", "#D5A92A", "#8A5A44", "#A87359", "#6D7880", "#899297", "#A8AFB2", "#C8CDCE"];
    const traces = ordered.map((item, index) => {
      const percentage = item.share * 100;
      return {
        type: "bar",
        orientation: "h",
        name: item.territorio_nombre,
        x: [percentage],
        y: ["Total provincial"],
        customdata: [[item.value, percentage]],
        marker: {
          color: palette[index % palette.length],
          line: { color: state2.demographyTerritory === item.territorio_id ? COLORS2.ink : COLORS2.surface, width: state2.demographyTerritory === item.territorio_id ? 3 : 1 }
        },
        text: [percentage >= 3 ? `${percentage.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%` : ""],
        textposition: "inside",
        textangle: 0,
        insidetextanchor: "middle",
        textfont: { color: index < 5 ? COLORS2.surface : COLORS2.ink },
        hovertemplate: `<b>${item.territorio_nombre}</b><br>%{customdata[0]:,.0f} personas<br>%{customdata[1]:.1f}% del total provincial<extra></extra>`
      };
    });
    plot("department-share-chart", traces, {
      barmode: "stack",
      barnorm: "percent",
      margin: { l: 18, r: 18, t: 35, b: 150 },
      xaxis: { gridcolor: "#EEF0EE", zeroline: false, title: "Participaci\xF3n en el total provincial (%)", ticksuffix: "%", range: [0, 100], dtick: 20 },
      yaxis: { gridcolor: "transparent", showticklabels: false, fixedrange: true },
      legend: { orientation: "h", y: -0.28, x: 0, xanchor: "left", yanchor: "top", font: { size: 10 }, traceorder: "normal" },
      bargap: 0.45,
      uniformtext: { mode: "hide", minsize: 10 }
    });
  }
  function renderGrowthPolesChart(data2, state2) {
    const selectedYear = Number(state2.demographyYear);
    const stats = demographyMapStats(data2, {
      ...state2,
      demographyYear: selectedYear,
      demographyAgeRange: "0-100",
      demographySex: "all"
    });
    const ordered = [...stats].sort((a, b) => a.variation - b.variation);
    const values = ordered.map((item) => item.variation * 100);
    const minimum = Math.min(...values, -1), maximum = Math.max(...values, 1);
    plot("growth-poles-chart", [{
      type: "bar",
      orientation: "h",
      x: values,
      y: ordered.map((item) => item.territorio_nombre),
      customdata: ordered.map((item) => [item.base, item.value]),
      marker: {
        color: values.map((value) => value < 0 ? COLORS2.critical : COLORS2.primary),
        line: {
          color: ordered.map((item) => state2.demographyTerritory === item.territorio_id ? COLORS2.ink : COLORS2.surface),
          width: ordered.map((item) => state2.demographyTerritory === item.territorio_id ? 2 : 1)
        }
      },
      text: values.map((value) => `${value > 0 ? "+" : ""}${value.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`),
      textposition: values.map((value) => value < 0 ? "inside" : "outside"),
      insidetextanchor: "middle",
      textfont: { color: values.map((value) => value < 0 ? COLORS2.surface : COLORS2.ink) },
      cliponaxis: false,
      hovertemplate: `%{y}<br>2022: %{customdata[0]:,.0f}<br>${selectedYear}: %{customdata[1]:,.0f}<br>Cambio: %{x:.1f}%<extra></extra>`
    }], {
      margin: { l: 130, r: 58, t: 10, b: 45 },
      showlegend: false,
      xaxis: { gridcolor: "#EEF0EE", zeroline: true, zerolinecolor: COLORS2.ink, zerolinewidth: 1.5, title: `Cambio 2022\u2013${selectedYear} (%)`, ticksuffix: "%", range: [minimum - 5, maximum + 5] },
      yaxis: { gridcolor: "transparent", automargin: true }
    });
  }

  // portfolio-v2/demos/chubut/assets/js/exports.js
  function downloadCSV(filename, headers, rows) {
    const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(escape).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = Object.assign(document.createElement("a"), { href: url, download: filename });
    link.click();
    URL.revokeObjectURL(url);
  }

  // portfolio-v2/demos/chubut/assets/js/scenario-model.js
  var POLICY_GROUPS = [
    { id: "0_3", label: "0\u20133 a\xF1os", level: "INI", levelLabel: "Inicial", color: "#FFC928" },
    { id: "4_5", label: "4\u20135 a\xF1os", level: "INI", levelLabel: "Inicial", color: "#D5A92A" },
    { id: "6_11", label: "6\u201311 a\xF1os", level: "PRI", levelLabel: "Primario", color: "#63A6B1" },
    { id: "12_14", label: "12\u201314 a\xF1os", level: "SEC", levelLabel: "Secundario", color: "#247C8C" },
    { id: "15_17", label: "15\u201317 a\xF1os", level: "SEC", levelLabel: "Secundario", color: "#FF6B35" },
    { id: "18_SEC", label: "18 a\xF1os", level: "AGE18", levelLabel: "18 a\xF1os", color: "#8A5A44" }
  ];
  var OCCUPANCY_CATEGORIES = [
    { id: "CAPACIDAD_DISPONIBLE", label: "Capacidad disponible", color: "#63A6B1" },
    { id: "EQUILIBRIO", label: "Equilibrio", color: "#FFC928" },
    { id: "ALTA_PRESION", label: "Alta presi\xF3n", color: "#FF6B35" },
    { id: "SATURADA", label: "Saturada", color: "#B9472F" }
  ];
  var GROUP_META = {
    "0_3": { min: 0, max: 3 },
    "4_5": { min: 4, max: 5 },
    "6_11": { min: 6, max: 11 },
    "12_14": { min: 12, max: 14 },
    "15_17": { min: 15, max: 17 },
    "18_SEC": { min: 18, max: 18 }
  };
  var LEVEL_GROUPS = { INI: ["0_3", "4_5"], PRI: ["6_11"], SEC: ["12_14", "15_17"], AGE18: ["18_SEC"] };
  var LEVEL_META = { INI: { label: "Inicial", color: "#FFC928" }, PRI: { label: "Primario", color: "#63A6B1" }, SEC: { label: "Secundario", color: "#247C8C" }, AGE18: { label: "18 a\xF1os", color: "#8A5A44" } };
  var cacheOwner = null;
  var indexCache = null;
  var projectionCache = /* @__PURE__ */ new Map();
  var factorCache = /* @__PURE__ */ new Map();
  function indexes(data2) {
    if (cacheOwner === data2 && indexCache) return indexCache;
    const rates = /* @__PURE__ */ new Map(), population2 = /* @__PURE__ */ new Map();
    data2.attendanceRates.forEach((r) => rates.set(`${r.ambito_tasa}|${r.territorio_id}|${r.grupo_edad_id}|${r.sexo_id}`, r));
    data2.demographyPopulation.forEach((r) => {
      for (const [g, m] of Object.entries(GROUP_META)) {
        if (r.edad >= m.min && r.edad <= m.max) {
          const k = `${r.territorio_id}|${r.year}|${g}|${r.sexo}`;
          population2.set(k, (population2.get(k) || 0) + r.poblacion);
        }
      }
    });
    cacheOwner = data2;
    projectionCache = /* @__PURE__ */ new Map();
    factorCache = /* @__PURE__ */ new Map();
    indexCache = { rates, population: population2 };
    return indexCache;
  }
  function currentRate(data2, territory, group, sex = "T") {
    const { rates } = indexes(data2), scope = territory === "all" ? "PROV" : "DEP", id = territory === "all" ? "26" : territory;
    const direct = rates.get(`${scope}|${id}|${group}|${sex}`);
    if (Number.isFinite(direct?.tasa_asistencia)) return { ...direct, source: scope === "DEP" ? "departamental" : "provincial" };
    return { ...rates.get(`PROV|26|${group}|${sex}`), source: "provincial (fallback)" };
  }
  function initialScenarioRates(data2, territory, sex = "all") {
    const s = sex === "all" ? "T" : sex;
    return Object.fromEntries(POLICY_GROUPS.map((g) => [g.id, currentRate(data2, territory, g.id, s).tasa_asistencia]));
  }
  function groupForId(id) {
    return POLICY_GROUPS.find((g) => g.id === id);
  }
  function population(data2, territory, year, group, sex) {
    const p = indexes(data2).population;
    if (territory !== "all") return p.get(`${territory}|${year}|${group}|${sex}`) || 0;
    return Object.keys(data2.territoryById).reduce((t, id) => t + (p.get(`${id}|${year}|${group}|${sex}`) || 0), 0);
  }
  function progress(data2, state2, group) {
    const sex = state2.sex === "all" ? "T" : state2.sex, base = Number(currentRate(data2, state2.territory, group, sex).tasa_asistencia) || 0, chosen = Math.max(base, Math.min(1, Number(state2.capacityRates?.[group] ?? base)));
    return base >= 1 ? 0 : (chosen - base) / (1 - base);
  }
  function parameterRate(data2, state2, territory, group, sex) {
    const current = Number(currentRate(data2, territory, group, sex).tasa_asistencia) || 0;
    return current + progress(data2, state2, group) * (1 - current);
  }
  function sexProjection(data2, state2, territory, group, sex, year, mode) {
    const chosen = mode === "trend" ? "trend" : Number(state2.capacityRates?.[group] ?? -1), key = `${territory}|${group}|${sex}|${year}|${mode}|${chosen}|${state2.territory}|${state2.sex}`;
    if (factorCache.has(key)) return factorCache.get(key);
    const currentInfo = currentRate(data2, territory, group, sex), current = Number(currentInfo.tasa_asistencia) || 0, basePopulation = population(data2, territory, 2024, group, sex), projectedPopulation = population(data2, territory, year, group, sex), rate = mode === "trend" ? current : parameterRate(data2, state2, territory, group, sex), baseDemand = basePopulation * current, projectedDemand = projectedPopulation * rate, factor = baseDemand > 0 ? projectedDemand / baseDemand : 1;
    const value = { basePopulation, projectedPopulation, currentRate: current, projectedRate: rate, baseDemand, projectedDemand, factor, rateSource: currentInfo.source };
    factorCache.set(key, value);
    return value;
  }
  function categoryId(x) {
    return x > 1 ? "SATURADA" : x >= 0.85 ? "ALTA_PRESION" : x >= 0.6 ? "EQUILIBRIO" : "CAPACIDAD_DISPONIBLE";
  }
  function projectSection(data2, state2, row, mode = state2.capacityMode || "scenario", year = state2.year) {
    const maleInputs = sexProjection(data2, state2, row.departamento_id, row.grupo_tasa_id, "M", Number(year), mode), femaleInputs = sexProjection(data2, state2, row.departamento_id, row.grupo_tasa_id, "F", Number(year), mode), maleLoad = row.matricula_varones_actual * maleInputs.factor, femaleLoad = row.matricula_mujeres_actual * femaleInputs.factor;
    const baseEnrollment = state2.sex === "M" ? row.matricula_varones_actual : state2.sex === "F" ? row.matricula_mujeres_actual : row.matricula_actual, load = state2.sex === "M" ? maleLoad : state2.sex === "F" ? femaleLoad : maleLoad + femaleLoad, level = row.grupo_tasa_id === "18_SEC" ? "SEC" : row.nivel_id, capacity = Math.max(1, Number(state2.capacityThresholds?.[level] ?? DEFAULT_CAPACITY_THRESHOLDS2[level] ?? row.capacidad)), baseOccupancy = baseEnrollment / capacity, occupancy = load / capacity, factor = baseEnrollment > 0 ? load / baseEnrollment : 1;
    return { ...row, capacidad_base: row.capacidad, capacidad: capacity, matricula_base_seleccionada: baseEnrollment, ocupacion_base_2024: baseOccupancy, ocupacion_base_2024_pct: baseOccupancy * 100, demanda_potencial_2024_varones: maleInputs.baseDemand, demanda_potencial_2024_mujeres: femaleInputs.baseDemand, demanda_potencial_proyectada_varones: maleInputs.projectedDemand, demanda_potencial_proyectada_mujeres: femaleInputs.projectedDemand, factor_demanda_varones: maleInputs.factor, factor_demanda_mujeres: femaleInputs.factor, factor_demanda_ponderado: factor, carga_equivalente_proyectada: load, carga_equivalente_varones: maleLoad, carga_equivalente_mujeres: femaleLoad, ocupacion: occupancy, ocupacion_pct: occupancy * 100, holgura_modelada: Math.max(0, capacity - load), sobreocupacion_modelada: Math.max(0, load - capacity), categoria_ocupacion: categoryId(occupancy) };
  }
  function selectedGroups(selection) {
    if (selection === "all") return Object.keys(GROUP_META);
    if (selection.startsWith("group:")) return [selection.slice(6)];
    return LEVEL_GROUPS[selection.slice(6)] || [];
  }
  function rowGroup(row) {
    return row.grupo_tasa_id;
  }
  function projectedSections(data2, state2, options = {}) {
    const territory = options.territory ?? state2.territory, selection = options.selection ?? state2.educationSelection, mode = options.mode || state2.capacityMode || "scenario", year = options.year ?? state2.year, groups = selectedGroups(selection);
    const signature = [territory, selection, mode, year, state2.sex, JSON.stringify(state2.capacityRates), JSON.stringify(state2.capacityThresholds)].join("|");
    let rows = projectionCache.get(signature);
    if (!rows) {
      rows = data2.capacitySections.filter((r) => (territory === "all" || r.departamento_id === territory) && groups.includes(rowGroup(r))).map((r) => projectSection(data2, state2, r, mode, year));
      projectionCache.set(signature, rows);
      if (projectionCache.size > 20) projectionCache.delete(projectionCache.keys().next().value);
    }
    const school = options.school === void 0 ? state2.capacitySchool : options.school;
    return school && school !== "all" ? rows.filter((r) => r.cue_anexo === school) : rows;
  }
  function aggregateCapacity(rows) {
    const r = { sections: rows.length, baseEnrollment: 0, load: 0, capacity: 0, availablePlaces: 0, overcapacity: 0, availableSections: 0, overoccupiedSections: 0, categories: {} };
    OCCUPANCY_CATEGORIES.forEach((c) => r.categories[c.id] = 0);
    rows.forEach((x) => {
      r.baseEnrollment += x.matricula_base_seleccionada;
      r.load += x.carga_equivalente_proyectada;
      r.capacity += x.capacidad;
      r.availablePlaces += x.holgura_modelada;
      r.overcapacity += x.sobreocupacion_modelada;
      if (x.carga_equivalente_proyectada < x.capacidad) r.availableSections++;
      if (x.carga_equivalente_proyectada > x.capacidad) r.overoccupiedSections++;
      r.categories[x.categoria_ocupacion]++;
    });
    r.baseOccupancy = r.capacity ? r.baseEnrollment / r.capacity : 0;
    r.occupancy = r.capacity ? r.load / r.capacity : 0;
    r.demandFactor = r.baseEnrollment ? r.load / r.baseEnrollment : 1;
    return r;
  }
  function aggregateSchools(rows) {
    const g = {};
    rows.forEach((r) => {
      g[r.cue_anexo] ??= { cue_anexo: r.cue_anexo, name: r.establecimiento_nombre, departmentId: r.departamento_id, department: r.departamento_nombre, locality: r.localidad, lat: r.latitud, lng: r.longitud, levels: /* @__PURE__ */ new Set(), rows: [] };
      g[r.cue_anexo].levels.add(r.grupo_tasa_id === "18_SEC" ? "18 a\xF1os" : r.nivel_nombre);
      g[r.cue_anexo].rows.push(r);
    });
    return Object.values(g).map((s) => ({ ...s, level: [...s.levels].join(", "), ...aggregateCapacity(s.rows) }));
  }
  function departmentCapacity(data2, state2) {
    const all = projectedSections(data2, state2, { territory: "all", school: "all" }), g = Object.fromEntries(Object.keys(data2.territoryById).map((id) => [id, []]));
    all.forEach((r) => g[r.departamento_id].push(r));
    return Object.entries(g).map(([id, rows]) => ({ id, name: data2.territoryById[id].territorio_nombre, ...aggregateCapacity(rows) }));
  }
  function departmentLevelCapacity(data2, state2) {
    const rows = projectedSections(data2, state2, { territory: "all", school: "all" }), groups = selectedGroups(state2.educationSelection), levels = state2.educationSelection.startsWith("level:") ? [state2.educationSelection.slice(6)] : state2.educationSelection.startsWith("group:") ? [groups[0] === "18_SEC" ? "AGE18" : groupForId(groups[0]).level] : ["INI", "PRI", "SEC", "AGE18"];
    const buckets = /* @__PURE__ */ new Map();
    rows.forEach((r) => {
      const level = r.grupo_tasa_id === "18_SEC" ? "AGE18" : r.nivel_id;
      if (!levels.includes(level)) return;
      const k = `${r.departamento_id}|${level}`;
      if (!buckets.has(k)) buckets.set(k, []);
      buckets.get(k).push(r);
    });
    return Object.keys(data2.territoryById).flatMap((id) => levels.map((level) => ({ id, department: data2.territoryById[id].territorio_nombre, level, levelLabel: LEVEL_META[level].label, ...aggregateCapacity(buckets.get(`${id}|${level}`) || []) })));
  }
  function point(data2, state2, territory, components, year, mode) {
    let pop = 0, demand = 0;
    const sources = /* @__PURE__ */ new Set(), sexes = state2.sex === "all" ? ["M", "F"] : [state2.sex];
    components.forEach((group) => sexes.forEach((sex) => {
      const p = population(data2, territory, year, group, sex), current = currentRate(data2, territory, group, sex), rate = mode === "trend" ? Number(current.tasa_asistencia) || 0 : parameterRate(data2, state2, territory, group, sex);
      pop += p;
      demand += p * rate;
      sources.add(mode === "trend" ? current.source : "tasa de escenario");
    }));
    return { year, population: pop, rate: pop ? demand / pop : 0, demand, rateSource: [...sources].join(" / ") };
  }
  function potentialDemandSeries(data2, state2) {
    const selection = state2.educationSelection, groups = selectedGroups(selection);
    let defs;
    if (state2.capacityTrendView === "level" && !selection.startsWith("group:")) {
      const levels = selection === "all" ? ["INI", "PRI", "SEC", "AGE18"] : [selection.slice(6)];
      defs = levels.map((id) => ({ id, label: LEVEL_META[id].label, color: LEVEL_META[id].color, components: LEVEL_GROUPS[id] }));
    } else defs = POLICY_GROUPS.filter((g) => groups.includes(g.id)).map((g) => ({ ...g, components: [g.id] }));
    const years = Array.from({ length: 29 }, (_, i) => 2022 + i);
    return defs.map((d) => ({ ...d, trend: years.map((y) => point(data2, state2, state2.territory, d.components, y, "trend")), scenario: years.map((y) => point(data2, state2, state2.territory, d.components, y, "scenario")) }));
  }
  function departmentAttendanceComparison(data2, state2, groups = selectedGroups(state2.educationSelection)) {
    const sexes = state2.sex === "all" ? ["M", "F"] : [state2.sex], year = Number(state2.year);
    return Object.keys(data2.territoryById).map((id) => {
      let populationTotal2 = 0, currentEnrollment = 0, scenarioEnrollment = 0;
      const sources = /* @__PURE__ */ new Set();
      groups.forEach((group) => sexes.forEach((sex) => {
        const p = population(data2, id, year, group, sex), current2 = currentRate(data2, id, group, sex), actual = Number(current2.tasa_asistencia) || 0, scenario2 = parameterRate(data2, state2, id, group, sex);
        populationTotal2 += p;
        currentEnrollment += p * actual;
        scenarioEnrollment += p * scenario2;
        sources.add(current2.source);
      }));
      const current = populationTotal2 ? currentEnrollment / populationTotal2 : 0, scenario = populationTotal2 ? scenarioEnrollment / populationTotal2 : 0;
      return { id, name: data2.territoryById[id].territorio_nombre, current, scenario, delta: scenario - current, population: populationTotal2, source: [...sources].join(" / ") };
    }).sort((a, b) => a.delta - b.delta || a.name.localeCompare(b.name, "es"));
  }
  function attendanceComparisonPanels(data2, state2) {
    return ["INI", "PRI", "SEC", "AGE18"].map((id) => ({ id, label: LEVEL_META[id].label, color: LEVEL_META[id].color, groups: LEVEL_GROUPS[id], rows: departmentAttendanceComparison(data2, state2, LEVEL_GROUPS[id]).sort((a, b) => a.name.localeCompare(b.name, "es")) }));
  }
  function occupancyLabel(id) {
    return OCCUPANCY_CATEGORIES.find((x) => x.id === id)?.label || occupancyStatus(0).label;
  }

  // portfolio-v2/demos/chubut/assets/js/capacity.js
  var schoolMap;
  var schoolLayer;
  var boundaryLayer;
  var legend;
  var boundaryTerritory = null;
  var fittedTerritory = null;
  var activeSchoolTooltip = null;
  var markerBySchool = /* @__PURE__ */ new Map();
  var layout = { paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)", font: { family: "Inter, Arial, sans-serif", size: 11, color: "#5B6470" }, margin: { l: 70, r: 24, t: 34, b: 48 }, xaxis: { gridcolor: "#ECE8DE", zeroline: false }, yaxis: { gridcolor: "#ECE8DE", zeroline: false }, hoverlabel: { bgcolor: "#fff", bordercolor: "#D8D4CA", font: { color: "#1F2933" } }, legend: { orientation: "h", y: 1.12, x: 0 } };
  var plot2 = (id, traces, extra = {}) => Plotly.react(id, traces, { ...layout, ...extra }, { displayModeBar: false, responsive: true });
  var distributionHTML = (c) => OCCUPANCY_CATEGORIES.map((x) => `${x.label}: ${fmt2.format(c[x.id] || 0)}`).join("<br>");
  function bindPlotClick(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;
    el.removeAllListeners?.("plotly_click");
    if (handler) {
      el.on("plotly_click", handler);
      el.style.cursor = "pointer";
    }
  }
  function closeSchoolTooltips() {
    if (activeSchoolTooltip) activeSchoolTooltip.closeTooltip();
    activeSchoolTooltip = null;
    markerBySchool.forEach((marker) => marker.closeTooltip());
  }
  function renderSchoolCapacityMap(data2, state2, onSchoolSelect, onTerritorySelect) {
    const schools = aggregateSchools(projectedSections(data2, state2, { school: "all" })).filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng));
    if (!schoolMap) {
      schoolMap = L.map("capacity-school-map", { zoomControl: true, scrollWheelZoom: false }).setView([-43.9, -68.7], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "\xA9 OpenStreetMap" }).addTo(schoolMap);
      schoolLayer = L.layerGroup().addTo(schoolMap);
      legend = L.control({ position: "bottomright" });
      legend.onAdd = () => {
        const d = L.DomUtil.create("div", "map-legend");
        d.innerHTML = "<strong>Ocupaci\xF3n</strong>" + OCCUPANCY_CATEGORIES.map((c) => `<span><i style="background:${c.color}"></i>${c.label}</span>`).join("");
        return d;
      };
      legend.addTo(schoolMap);
      schoolMap.on("movestart zoomstart click", closeSchoolTooltips);
    }
    closeSchoolTooltips();
    if (boundaryTerritory !== state2.territory) {
      boundaryLayer?.remove();
      boundaryLayer = L.geoJSON(data2.departmentBoundaries, { style: (f) => ({ fillColor: "#fff", fillOpacity: 0.04, color: state2.territory === String(f.properties.territorio_id) ? COLORS2.coral : "#9FB2B6", weight: state2.territory === String(f.properties.territorio_id) ? 3 : 1 }), onEachFeature: (f, l) => l.on("click", () => onTerritorySelect(String(f.properties.territorio_id))) }).addTo(schoolMap);
      boundaryTerritory = state2.territory;
    }
    const active = new Set(schools.map((s) => s.cue_anexo));
    for (const [id, marker] of markerBySchool) {
      if (!active.has(id)) {
        marker.closeTooltip();
        schoolLayer.removeLayer(marker);
        markerBySchool.delete(id);
      }
    }
    schools.forEach((s) => {
      const selected = state2.capacitySchool === s.cue_anexo, style = { radius: selected ? 8 : 5, fillColor: occupancyStatus(s.occupancy).color, fillOpacity: 0.86, color: selected ? COLORS2.ink : "#fff", weight: selected ? 3 : 1.2 }, tooltip = `<div class="map-tooltip"><strong>${s.name}</strong><br>${s.level}<br>Ocupaci\xF3n 2024: ${pct2.format(s.baseOccupancy)}<br>Ocupaci\xF3n proyectada: ${pct2.format(s.occupancy)}<br>Factor de demanda: ${s.demandFactor.toLocaleString("es-AR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</div>`, popup = `<div class="school-popup"><strong>${s.name}</strong><br>${s.level}<br>Matr\xEDcula observada 2024: ${fmt2.format(s.baseEnrollment)}<br>Carga equivalente proyectada: ${fmt2.format(s.load)}<br>Secciones: ${fmt2.format(s.sections)}<br>Capacidad modelada: ${fmt2.format(s.capacity)}<br>Holgura modelada: ${fmt2.format(s.availablePlaces)}<hr>${distributionHTML(s.categories)}</div>`;
      let marker = markerBySchool.get(s.cue_anexo);
      if (!marker) {
        marker = L.circleMarker([s.lat, s.lng], style).bindTooltip(tooltip, { sticky: false }).bindPopup(popup).on("tooltipopen", (e) => {
          if (activeSchoolTooltip && activeSchoolTooltip !== e.target) activeSchoolTooltip.closeTooltip();
          activeSchoolTooltip = e.target;
        }).on("tooltipclose", (e) => {
          if (activeSchoolTooltip === e.target) activeSchoolTooltip = null;
        }).on("click", () => {
          closeSchoolTooltips();
          onSchoolSelect(s.cue_anexo);
        }).addTo(schoolLayer);
        markerBySchool.set(s.cue_anexo, marker);
      } else {
        marker.closeTooltip();
        marker.setStyle(style);
        marker.setRadius(style.radius);
        marker.setTooltipContent(tooltip);
        marker.setPopupContent(popup);
      }
      if (selected) setTimeout(() => marker.openPopup(), 0);
    });
    if (fittedTerritory !== state2.territory) {
      const feature = state2.territory === "all" ? data2.departmentBoundaries : data2.departmentBoundaries.features.find((f) => String(f.properties.territorio_id) === state2.territory), bounds = L.geoJSON(feature || data2.departmentBoundaries).getBounds();
      if (bounds.isValid()) schoolMap.fitBounds(bounds, { padding: [18, 18], maxZoom: state2.territory === "all" ? 7 : 10 });
      fittedTerritory = state2.territory;
    }
    requestAnimationFrame(() => schoolMap.invalidateSize());
  }
  function renderPotentialDemandEvolution(data2, state2, onYearSelect) {
    const traces = [];
    potentialDemandSeries(data2, state2).forEach((g) => {
      for (const [mode, dash, label] of [["trend", "solid", "Tendencial"], ["scenario", "dot", "Escenario"]]) {
        const points = g[mode];
        traces.push({ type: "scatter", mode: "lines", name: g.label, legendgroup: g.id, showlegend: mode === "trend", x: points.map((p) => p.year), y: points.map((p) => p.demand), customdata: points.map((p) => [p.population, p.rate, label, p.rateSource]), line: { color: g.color, width: 3, dash }, hovertemplate: `<b>${g.label}</b><br>%{customdata[2]} \xB7 %{x}<br>Poblaci\xF3n proyectada: %{customdata[0]:,.0f}<br>Tasa equivalente: %{customdata[1]:.1%}<br>Demanda potencial: %{y:,.0f}<br>Fuente de tasa: %{customdata[3]}<br><i>Demanda = poblaci\xF3n \xD7 tasa</i><extra></extra>` });
      }
    });
    plot2("capacity-enrollment-trend", traces, { hovermode: "closest", yaxis: { ...layout.yaxis, title: "Demanda potencial" }, xaxis: { ...layout.xaxis, dtick: 4 }, shapes: [{ type: "line", x0: state2.year, x1: state2.year, y0: 0, y1: 1, yref: "paper", line: { color: COLORS2.ink, width: 1, dash: "dot" } }] }).then(() => requestAnimationFrame(() => {
      const chart = document.getElementById("capacity-enrollment-trend");
      if (chart?.offsetParent) Plotly.Plots.resize(chart);
    }));
    bindPlotClick("capacity-enrollment-trend", (e) => {
      const y = Math.round(Number(e.points?.[0]?.x));
      if (y >= 2022 && y <= 2050) onYearSelect(y);
    });
  }
  function renderAttendanceDumbbell(data2, state2, onTerritorySelect) {
    const definitions = attendanceComparisonPanels(data2, state2).filter((definition) => state2.capacityAttendanceLevels.includes(definition.id)), traces = [];
    if (!definitions.length) {
      plot2("capacity-attendance-dumbbell", [], { xaxis: { visible: false }, yaxis: { visible: false }, annotations: [{ text: "Seleccion\xE1 al menos un nivel para mostrar la comparaci\xF3n.", showarrow: false, font: { size: 14, color: COLORS2.muted } }] });
      return;
    }
    const names = definitions[0].rows.map((r) => r.name), offsets = definitions.length === 1 ? [0] : definitions.length === 2 ? [-0.12, 0.12] : definitions.length === 3 ? [-0.18, 0, 0.18] : [-0.24, -0.08, 0.08, 0.24];
    definitions.forEach((definition, index) => {
      const rows = definition.rows, offset = offsets[index], positions = rows.map((_, rowIndex) => rowIndex + offset), lineX = [], lineY = [];
      rows.forEach((r, rowIndex) => {
        lineX.push(r.current * 100, r.scenario * 100, null);
        lineY.push(rowIndex + offset, rowIndex + offset, null);
      });
      const customdata = rows.map((r) => [r.id, r.name, definition.label, r.current, r.scenario, r.delta, r.population, r.source]), markerSize = rows.map((r) => r.id === state2.territory ? 11 : 8), markerWidth = rows.map((r) => r.id === state2.territory ? 3 : 1.5);
      traces.push(
        { type: "scatter", mode: "lines", name: definition.label, legendgroup: definition.id, x: lineX, y: lineY, line: { color: definition.color, width: 3 }, hoverinfo: "skip" },
        { type: "scatter", mode: "markers", name: `${definition.label} \xB7 actual`, legendgroup: definition.id, showlegend: false, x: rows.map((r) => r.current * 100), y: positions, customdata, marker: { size: markerSize, color: definition.color, symbol: "circle-open", line: { color: definition.color, width: markerWidth } }, hovertemplate: "<b>%{customdata[1]}</b><br>Nivel: %{customdata[2]}<br>Tasa actual: %{customdata[3]:.1%}<br>Poblaci\xF3n de referencia: %{customdata[6]:,.0f}<br>Fuente: %{customdata[7]}<extra></extra>" },
        { type: "scatter", mode: "markers", name: `${definition.label} \xB7 escenario`, legendgroup: definition.id, showlegend: false, x: rows.map((r) => r.scenario * 100), y: positions, customdata, marker: { size: markerSize, color: definition.color, symbol: "diamond", line: { color: "#fff", width: markerWidth } }, hovertemplate: "<b>%{customdata[1]}</b><br>Nivel: %{customdata[2]}<br>Tasa escenario: %{customdata[4]:.1%}<br>Variaci\xF3n: %{customdata[5]:+.1%}<br>Poblaci\xF3n de referencia: %{customdata[6]:,.0f}<extra></extra>" }
      );
    });
    const selectedIndex = state2.territory === "all" ? -1 : definitions[0].rows.findIndex((r) => r.id === state2.territory), shapes = selectedIndex < 0 ? [] : [{ type: "rect", xref: "x", yref: "y", x0: 0, x1: 100, y0: selectedIndex - 0.43, y1: selectedIndex + 0.43, fillcolor: "rgba(36,124,140,.07)", line: { width: 0 }, layer: "below" }];
    plot2("capacity-attendance-dumbbell", traces, { margin: { ...layout.margin, l: 130, t: 46 }, xaxis: { ...layout.xaxis, title: "Tasa de asistencia (%)", range: [0, 100], ticksuffix: "%", anchor: "free", position: 0, side: "bottom" }, yaxis: { gridcolor: "transparent", zeroline: false, showline: false, tickmode: "array", tickvals: names.map((_, i) => i), ticktext: names, range: [names.length - 0.55, -0.55], automargin: true }, legend: { ...layout.legend, traceorder: "normal", itemclick: false, itemdoubleclick: false }, shapes });
    bindPlotClick("capacity-attendance-dumbbell", (e) => {
      const id = e.points?.[0]?.customdata?.[0];
      if (id) onTerritorySelect(id);
    });
  }
  function renderOccupancyDistribution(data2, state2, onTerritorySelect) {
    const container = document.getElementById("capacity-occupancy-distribution"), rows = departmentLevelCapacity(data2, state2), percent = state2.capacityDistributionMode === "percent", levelOrder = ["INI", "PRI", "SEC", "AGE18"], levels = levelOrder.filter((level) => rows.some((r) => r.level === level && r.sections > 0));
    container.querySelectorAll("[data-distribution-level]").forEach((panel) => {
      if (!levels.includes(panel.dataset.distributionLevel)) {
        const chart = panel.querySelector(".chart");
        if (chart) Plotly.purge(chart);
        panel.remove();
      }
    });
    levels.forEach((level) => {
      const levelRows = rows.filter((r) => r.level === level && r.sections > 0).sort((a, b) => b.department.localeCompare(a.department, "es")), panelId = `capacity-distribution-${level}`;
      let panel = container.querySelector(`[data-distribution-level="${level}"]`);
      if (!panel) {
        panel = document.createElement("section");
        panel.className = "capacity-level-panel";
        panel.dataset.distributionLevel = level;
        panel.innerHTML = `<h4>${levelRows[0]?.levelLabel || level}</h4><div id="${panelId}" class="chart capacity-level-chart"></div>`;
      }
      container.appendChild(panel);
      const traces = OCCUPANCY_CATEGORIES.map((c) => ({ type: "bar", orientation: "h", name: c.label, legendgroup: c.id, showlegend: false, x: levelRows.map((r) => percent ? (r.categories[c.id] || 0) / r.sections * 100 : r.categories[c.id] || 0), y: levelRows.map((r) => r.department), customdata: levelRows.map((r) => [r.id, r.levelLabel, r.availablePlaces, r.baseOccupancy, r.occupancy]), marker: { color: c.color }, hovertemplate: `Nivel: %{customdata[1]}<br>Capacidad disponible: %{customdata[2]:,.0f}<br>Ocupaci\xF3n 2024: %{customdata[3]:.1%}<br>Ocupaci\xF3n ${state2.year}: %{customdata[4]:.1%}<extra></extra>` }));
      plot2(panelId, traces, { barmode: "stack", showlegend: false, margin: { ...layout.margin, l: 112, t: 12, b: 45 }, xaxis: { ...layout.xaxis, title: percent ? "Distribuci\xF3n (%)" : "Secciones", range: percent ? [0, 100] : void 0 }, yaxis: { gridcolor: "transparent", automargin: true } });
      bindPlotClick(panelId, (e) => {
        const id = e.points?.[0]?.customdata?.[0];
        if (id) onTerritorySelect(id);
      });
    });
    if (!levels.length) container.innerHTML = '<p class="empty-chart">No hay secciones para la selecci\xF3n activa.</p>';
  }
  function renderDepartmentOccupancyComparison(data2, state2, onTerritorySelect) {
    const departmentLevel = ["INI", "PRI", "SEC", "AGE18"].includes(state2.capacityDepartmentLevel) ? state2.capacityDepartmentLevel : "all", selection = departmentLevel === "all" ? "all" : `level:${departmentLevel}`, chartState = { ...state2, educationSelection: selection }, rows = departmentCapacity(data2, chartState).filter((r) => r.sections > 0).sort((a, b) => a.occupancy - b.occupancy || b.name.localeCompare(a.name, "es")), lineX = [], lineY = [];
    rows.forEach((r) => {
      lineX.push(r.baseOccupancy * 100, r.occupancy * 100, null);
      lineY.push(r.name, r.name, null);
    });
    const customdata = rows.map((r) => [r.id, r.name, r.baseOccupancy, r.occupancy, (r.occupancy - r.baseOccupancy) * 100, r.availablePlaces]), selected = (id) => rows.map((r) => r.id === state2.territory ? id[0] : id[1]), maxOccupancy = Math.max(100, ...rows.map((r) => Math.max(r.baseOccupancy, r.occupancy) * 100)), maxX = Math.max(110, Math.ceil((maxOccupancy + 5) / 10) * 10);
    const hover = `<b>%{customdata[1]}</b><br>Base 2024: %{customdata[2]:.1%}<br>A\xF1o seleccionado (${state2.year}): %{customdata[3]:.1%}<br>Variaci\xF3n: %{customdata[4]:+.1f} p.p.<br>Capacidad disponible: %{customdata[5]:,.0f}<extra></extra>`;
    const traces = [
      { type: "scatter", mode: "lines", name: "Cambio", showlegend: false, x: lineX, y: lineY, line: { color: "#B8C4C6", width: 3 }, hoverinfo: "skip" },
      { type: "scatter", mode: "markers", name: "Base 2024", x: rows.map((r) => r.baseOccupancy * 100), y: rows.map((r) => r.name), customdata, marker: { size: selected([15, 12]), color: "#FFFFFF", symbol: "circle", line: { color: COLORS2.primaryDark, width: selected([3, 2]) } }, hovertemplate: hover },
      { type: "scatter", mode: "markers", name: `A\xF1o seleccionado (${state2.year})`, x: rows.map((r) => r.occupancy * 100), y: rows.map((r) => r.name), customdata, marker: { size: selected([10, 8]), color: COLORS2.coral, symbol: "circle", line: { color: "#FFFFFF", width: selected([2, 1]) } }, hovertemplate: hover }
    ];
    const thresholds = [
      { value: 60, label: "60% \xB7 equilibrio", color: "#63A6B1" },
      { value: 85, label: "85% \xB7 alta presi\xF3n", color: "#D5A92A" },
      { value: 100, label: "100% \xB7 saturaci\xF3n", color: "#B9472F" }
    ];
    plot2("capacity-department-enrollment", traces, { hovermode: "closest", margin: { ...layout.margin, l: 130, t: 62 }, legend: { ...layout.legend, traceorder: "normal" }, xaxis: { ...layout.xaxis, title: "Ocupaci\xF3n de la capacidad modelada (%)", range: [0, maxX], ticksuffix: "%" }, yaxis: { gridcolor: "transparent", automargin: true }, shapes: thresholds.map((t) => ({ type: "line", xref: "x", yref: "paper", x0: t.value, x1: t.value, y0: 0, y1: 1, line: { color: t.color, width: 1.5, dash: "dot" }, layer: "below" })), annotations: thresholds.map((t) => ({ xref: "x", yref: "paper", x: t.value, y: 1.03, text: t.label, showarrow: false, xanchor: "left", font: { size: 9, color: t.color } })) });
    bindPlotClick("capacity-department-enrollment", (e) => {
      const id = e.points?.[0]?.customdata?.[0];
      if (id) onTerritorySelect(id);
    });
  }
  function schoolName(data2, id) {
    return !id || id === "all" ? "" : data2.capacitySections.find((r) => r.cue_anexo === id)?.establecimiento_nombre || id;
  }
  function categorySummary(rows) {
    const c = Object.fromEntries(OCCUPANCY_CATEGORIES.map((x) => [x.id, 0]));
    rows.forEach((r) => c[r.categoria_ocupacion]++);
    return OCCUPANCY_CATEGORIES.map((x) => `${occupancyLabel(x.id)}: ${fmt2.format(c[x.id])}`).join(" \xB7 ");
  }

  // portfolio-v2/demos/chubut/assets/js/floating-panels.js
  var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  function storageKey(panel) {
    return `chubut2050.panel.${panel.dataset.panelModule || panel.id}`;
  }
  function readSession(panel) {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey(panel))) || {};
    } catch {
      return {};
    }
  }
  function writeSession(panel) {
    const rect = panel.getBoundingClientRect();
    sessionStorage.setItem(storageKey(panel), JSON.stringify({
      floating: panel.classList.contains("is-floating"),
      minimized: panel.classList.contains("is-minimized"),
      left: Math.round(rect.left),
      top: Math.round(rect.top)
    }));
  }
  function controls(panel) {
    return {
      float: panel.querySelector("[data-panel-float-toggle]"),
      minimize: panel.querySelector("[data-panel-minimize]")
    };
  }
  function syncButtons(panel) {
    const { float, minimize } = controls(panel), floating = panel.classList.contains("is-floating"), minimized = panel.classList.contains("is-minimized");
    if (float) {
      float.setAttribute("aria-pressed", String(floating));
      float.textContent = floating ? "\u2199 Volver a su lugar" : "\u2197 Mantener visible";
    }
    if (minimize) {
      minimize.hidden = !floating;
      minimize.setAttribute("aria-expanded", String(!minimized));
      minimize.textContent = minimized ? "\u25A1 Restaurar" : "\u2014 Minimizar";
    }
  }
  function constrain(panel, left, top) {
    const margin = 12, rect = panel.getBoundingClientRect(), maxLeft = Math.max(margin, innerWidth - rect.width - margin), maxTop = Math.max(margin, innerHeight - rect.height - margin);
    panel.style.left = `${clamp(left, margin, maxLeft)}px`;
    panel.style.top = `${clamp(top, margin, maxTop)}px`;
  }
  function restorePosition(panel, saved2 = {}) {
    requestAnimationFrame(() => {
      const rect = panel.getBoundingClientRect(), fallbackLeft = Math.max(12, innerWidth - rect.width - 24), fallbackTop = Math.min(118, Math.max(12, innerHeight - rect.height - 12));
      constrain(panel, Number.isFinite(saved2.left) ? saved2.left : fallbackLeft, Number.isFinite(saved2.top) ? saved2.top : fallbackTop);
    });
  }
  function setFloating(panel, enabled, { persist = true } = {}) {
    panel.classList.toggle("is-floating", enabled);
    if (!enabled) {
      panel.classList.remove("is-minimized");
      panel.style.left = "";
      panel.style.top = "";
    } else restorePosition(panel, readSession(panel));
    syncButtons(panel);
    if (persist) requestAnimationFrame(() => writeSession(panel));
  }
  function setMinimized(panel, enabled) {
    if (!panel.classList.contains("is-floating")) return;
    panel.classList.toggle("is-minimized", enabled);
    syncButtons(panel);
    if (!enabled) {
      const rect = panel.getBoundingClientRect();
      constrain(panel, rect.left, rect.top);
    }
    writeSession(panel);
  }
  function enableDrag(panel) {
    const handle = panel.querySelector("[data-panel-drag-handle]");
    if (!handle) return;
    let drag = null;
    handle.addEventListener("pointerdown", (event) => {
      if (matchMedia("(max-width: 680px)").matches || !panel.classList.contains("is-floating") || event.target.closest("button,input,select,label")) return;
      const rect = panel.getBoundingClientRect();
      drag = { pointer: event.pointerId, dx: event.clientX - rect.left, dy: event.clientY - rect.top };
      handle.setPointerCapture(event.pointerId);
      panel.classList.add("is-dragging");
      event.preventDefault();
    });
    handle.addEventListener("pointermove", (event) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      constrain(panel, event.clientX - drag.dx, event.clientY - drag.dy);
    });
    const finish = (event) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      drag = null;
      panel.classList.remove("is-dragging");
      const rect = panel.getBoundingClientRect(), edge = 28;
      if (rect.left < edge) panel.style.left = "12px";
      else if (innerWidth - rect.right < edge) panel.style.left = `${Math.max(12, innerWidth - rect.width - 12)}px`;
      writeSession(panel);
    };
    handle.addEventListener("pointerup", finish);
    handle.addEventListener("pointercancel", finish);
  }
  function initFloatingPanels() {
    const panels = [...document.querySelectorAll("[data-floating-panel]")];
    panels.forEach((panel) => {
      const saved2 = readSession(panel), { float, minimize } = controls(panel);
      float?.addEventListener("click", () => setFloating(panel, !panel.classList.contains("is-floating")));
      minimize?.addEventListener("click", () => setMinimized(panel, !panel.classList.contains("is-minimized")));
      enableDrag(panel);
      syncButtons(panel);
      if (saved2.floating && !panel.closest("[hidden]")) {
        setFloating(panel, true, { persist: false });
        if (saved2.minimized) {
          panel.classList.add("is-minimized");
          syncButtons(panel);
        }
        requestAnimationFrame(() => writeSession(panel));
      }
    });
    addEventListener("resize", () => panels.filter((panel) => panel.classList.contains("is-floating")).forEach((panel) => {
      const rect = panel.getBoundingClientRect();
      constrain(panel, rect.left, rect.top);
    }));
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const active = panels.find((panel) => panel.classList.contains("is-floating") && !panel.closest("[hidden]"));
      if (active) setFloating(active, false);
    });
    return panels;
  }
  function setPanelSummary(module, text) {
    const output = document.querySelector(`[data-floating-panel][data-panel-module="${module}"] [data-panel-summary]`);
    if (output) output.textContent = text;
  }

  // portfolio-v2/demos/chubut/assets/js/production.js?v=2.13.0
  var ACTIVITY_COLORS = { EOL: COLORS2.primary, HID: COLORS2.support, TER: COLORS2.coral, PET: COLORS2.primaryDark, GAS: COLORS2.brown, H2: COLORS2.yellow, OTR: COLORS2.muted };
  var STATE_ORDER = ["OPERATIVO", "EN_CONSTRUCCION", "PROYECTADO", "FUERA_SERVICIO", "SIN_INFO"];
  var STATE_COLORS = { OPERATIVO: COLORS2.primary, EN_CONSTRUCCION: COLORS2.coral, PROYECTADO: COLORS2.yellow, FUERA_SERVICIO: COLORS2.critical, SIN_INFO: "#8B9499" };
  var ACTIVITY_SYMBOLS = {
    EOL: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="10" r="1.7"/><path d="M12 11.5v8M9.4 20h5.2M12 8.3 8.1 3.8M13.6 9.1l6.2-1.2M10.8 10.9l-2.4 5.8"/></svg>',
    HID: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8c-2.5 4-6.3 8.1-6.3 12.1a6.3 6.3 0 0 0 12.6 0C18.3 10.9 14.5 6.8 12 2.8Z"/><path d="M9.1 15.2c.4 1.5 1.3 2.3 2.9 2.5"/></svg>',
    TER: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13.7 2.7-7.2 10h4.7l-1 8.6 7.3-11h-4.6l.8-7.6Z"/></svg>',
    PET: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 20h10M9 20l3-15 3 15M8.6 11h6.8M7.8 15h8.4M5.5 7.5h9M14.5 5v5M14.5 7.5H19l-2.5 3"/></svg>',
    GAS: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 2.8c.8 3-1.2 4.4-2.4 6.1-1.1 1.5-1.5 2.9-.4 4.6.1-2.2 1.4-3.2 2.7-4.5 2.7 2 4.2 4.3 4.2 6.7a5.3 5.3 0 0 1-10.6 0c0-3.5 2.5-6.1 6.5-12.9Z"/></svg>',
    H2: '<span class="production-h2-symbol">H<sub>2</sub></span>',
    OTR: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>'
  };
  var plotConfig = { displayModeBar: false, responsive: true };
  var mapEntry = null;
  var number = (value) => value === null || value === "" || value === void 0 ? null : Number(value);
  var formatDecimal = (value) => value === null || !Number.isFinite(Number(value)) ? "\u2014" : Number(value).toLocaleString("es-AR", { maximumFractionDigits: 2 });
  var escapeHTML = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  var operatorLabel = (value) => value || "Sin informar";
  function filteredProductionRows(data2, state2) {
    return (data2.productionInstallations || []).filter(
      (row) => (state2.territory === "all" || row.departamento_id === state2.territory) && (state2.productActivity === "all" || row.actividad_id === state2.productActivity) && (state2.productStatus === "all" || row.estado_id === state2.productStatus) && (state2.productOperator === "all" || (state2.productOperator === "__missing__" ? !row.operador : row.operador === state2.productOperator))
    );
  }
  function productionSummary(rows) {
    const installed = rows.reduce((sum2, row) => sum2 + (number(row.capacidad_instalada_mw) || 0), 0);
    const projectPower = rows.reduce((sum2, row) => sum2 + (number(row.potencia_declarada_proyecto_mw) || 0), 0);
    const withInstalled = rows.filter((row) => number(row.capacidad_instalada_mw) !== null).length;
    const future = rows.filter((row) => row.condicion_informacion === "proyecto_futuro").length;
    return { installations: rows.length, installed, projectPower, withInstalled, future, coverage: rows.length ? withInstalled / rows.length : 0 };
  }
  function productionFilterOptions(data2) {
    const rows = data2.productionInstallations || [];
    const unique = (field, filter = () => true) => [...new Set(rows.filter(filter).map((row) => row[field]).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
    return {
      activities: unique("actividad_id").map((value) => ({ value, label: rows.find((row) => row.actividad_id === value)?.actividad_nombre || value })),
      operators: unique("operador").map((value) => ({ value, label: value })),
      statuses: unique("estado_id").sort((a, b) => STATE_ORDER.indexOf(a) - STATE_ORDER.indexOf(b)).map((value) => ({ value, label: rows.find((row) => row.estado_id === value)?.estado_nombre || value }))
    };
  }
  function ensureMap() {
    if (mapEntry) {
      setTimeout(() => mapEntry.map.invalidateSize(), 0);
      return mapEntry;
    }
    const map = L.map("production-map", { zoomControl: true, scrollWheelZoom: false, attributionControl: true }).setView([-43.8, -68.3], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "\xA9 OpenStreetMap" }).addTo(map);
    mapEntry = { map, layers: [], legend: null };
    return mapEntry;
  }
  function resetMap(entry) {
    entry.layers.forEach((layer) => entry.map.removeLayer(layer));
    entry.layers = [];
    if (entry.legend) {
      entry.map.removeControl(entry.legend);
      entry.legend = null;
    }
  }
  function activitySymbol(activityId) {
    return ACTIVITY_SYMBOLS[activityId] || ACTIVITY_SYMBOLS.OTR;
  }
  function activityIcon(row, selected = false) {
    const size = selected ? 32 : 28;
    const activityClass = `activity-${String(row.actividad_id || "OTR").toLowerCase()}`;
    const stateClass = `state-${String(row.estado_id || "SIN_INFO").toLowerCase()}`;
    return L.divIcon({
      className: "production-div-icon",
      html: `<span class="production-map-symbol ${activityClass} ${stateClass}${selected ? " is-selected" : ""}" style="--marker-size:${size}px;--activity-color:${ACTIVITY_COLORS[row.actividad_id] || COLORS2.muted};--state-color:${STATE_COLORS[row.estado_id] || COLORS2.muted}">${activitySymbol(row.actividad_id)}</span>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      tooltipAnchor: [0, -size / 2]
    });
  }
  function addMapLegend(entry) {
    const legend2 = L.control({ position: "bottomright" });
    legend2.onAdd = () => {
      const div = L.DomUtil.create("div", "map-legend production-map-legend");
      div.innerHTML = `<strong>Actividad</strong>
      <span><b class="production-legend-icon activity-eol" style="--activity-color:${ACTIVITY_COLORS.EOL}">${activitySymbol("EOL")}</b>E\xF3lica</span>
      <span><b class="production-legend-icon activity-hid" style="--activity-color:${ACTIVITY_COLORS.HID}">${activitySymbol("HID")}</b>Hidroel\xE9ctrica</span>
      <span><b class="production-legend-icon activity-ter" style="--activity-color:${ACTIVITY_COLORS.TER}">${activitySymbol("TER")}</b>T\xE9rmica</span>
      <strong class="legend-subtitle">Estado</strong>
      <span><i class="legend-ring operative"></i>Operativo</span>
      <span><i class="legend-ring projected"></i>Proyectado</span>
      <span><i class="legend-ring unknown"></i>Estado sin informar</span>`;
      return div;
    };
    legend2.addTo(entry.map);
    entry.legend = legend2;
  }
  function renderProductionMap(data2, state2, rows, onTerritorySelect, onInstallationSelect) {
    const entry = ensureMap();
    resetMap(entry);
    const selectedId = state2.productInstallation;
    const boundaries = L.geoJSON(data2.departmentBoundaries, {
      style: (feature) => {
        const selected = state2.territory === String(feature.properties.territorio_id);
        return { color: selected ? COLORS2.primaryDark : COLORS2.ink, weight: selected ? 3 : 1.1, fillColor: COLORS2.primary, fillOpacity: selected ? 0.12 : 0.025 };
      },
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(`<div class="map-tooltip"><strong>${escapeHTML(feature.properties.territorio_nombre)}</strong><br>Clic para filtrar</div>`);
        layer.on("click", () => onTerritorySelect?.(String(feature.properties.territorio_id)));
      }
    }).addTo(entry.map);
    const markers = L.layerGroup().addTo(entry.map);
    rows.forEach((row) => {
      const selected = row.instalacion_id === selectedId;
      const marker = L.marker([row.latitud, row.longitud], {
        icon: activityIcon(row, selected),
        title: `${row.nombre_instalacion} \xB7 ${row.actividad_nombre} \xB7 ${row.estado_nombre}`,
        alt: `${row.nombre_instalacion}, ${row.actividad_nombre}, ${row.estado_nombre}`,
        keyboard: true,
        riseOnHover: true,
        zIndexOffset: selected ? 1e3 : 0
      });
      const capacity = number(row.capacidad_instalada_mw);
      const project = number(row.potencia_declarada_proyecto_mw);
      marker.bindTooltip(`<div class="map-tooltip"><strong>${escapeHTML(row.nombre_instalacion)}</strong><br>${escapeHTML(row.actividad_nombre)} \xB7 ${escapeHTML(row.estado_nombre)}<br>${capacity !== null ? `${formatDecimal(capacity)} MW instalados` : project !== null ? `${formatDecimal(project)} MW declarados de proyecto` : "Capacidad sin informar"}</div>`);
      marker.on("click", () => onInstallationSelect?.(row.instalacion_id));
      marker.addTo(markers);
    });
    entry.layers = [boundaries, markers];
    addMapLegend(entry);
    const selectedBoundary = state2.territory === "all" ? data2.departmentBoundaries : data2.departmentBoundaries.features.find((feature) => String(feature.properties.territorio_id) === state2.territory);
    const bounds = L.geoJSON(selectedBoundary || data2.departmentBoundaries).getBounds();
    if (bounds.isValid()) entry.map.fitBounds(bounds, { padding: [24, 24], maxZoom: state2.territory === "all" ? 7 : 9 });
  }
  function baseLayout(extra = {}) {
    return { paper_bgcolor: COLORS2.surface, plot_bgcolor: COLORS2.surface, font: { family: "Inter, system-ui, sans-serif", color: COLORS2.ink, size: 12 }, margin: { l: 55, r: 18, t: 20, b: 48 }, hoverlabel: { bgcolor: COLORS2.surface, bordercolor: COLORS2.line, font: { color: COLORS2.ink } }, legend: { orientation: "h", y: 1.13, x: 0 }, ...extra };
  }
  function renderDepartmentChart(rows, onTerritorySelect) {
    const el = document.getElementById("production-department-chart");
    const grouped = /* @__PURE__ */ new Map();
    rows.forEach((row) => {
      if (!grouped.has(row.departamento_id)) grouped.set(row.departamento_id, { id: row.departamento_id, name: row.departamento_nombre, total: 0, documented: 0, activities: {} });
      const value = number(row.capacidad_instalada_mw);
      if (value === null) return;
      const group = grouped.get(row.departamento_id);
      group.total += value;
      group.documented += 1;
      group.activities[row.actividad_id] = (group.activities[row.actividad_id] || 0) + value;
    });
    const departments = [...grouped.values()].filter((row) => row.total > 0).sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "es"));
    if (!departments.length) {
      Plotly.purge(el);
      el.innerHTML = '<p class="empty-chart">No hay capacidad instalada documentada para la selecci\xF3n.</p>';
      return;
    }
    if (el.querySelector(".empty-chart")) {
      el.innerHTML = "";
      Plotly.purge(el);
    }
    const activities = [...new Set(departments.flatMap((row) => Object.keys(row.activities)))].sort((a, b) => a.localeCompare(b));
    const traces = activities.map((activity) => ({ type: "bar", orientation: "h", name: rows.find((row) => row.actividad_id === activity)?.actividad_nombre || activity, y: departments.map((row) => row.name), x: departments.map((row) => row.activities[activity] || 0), customdata: departments.map((row) => [row.id, row.documented]), marker: { color: ACTIVITY_COLORS[activity] || COLORS2.muted }, hovertemplate: "%{y}<br>%{x:,.2f} MW<extra>%{fullData.name}</extra>" }));
    Plotly.react(el, traces, baseLayout({ barmode: "stack", margin: { l: 135, r: 24, t: 20, b: 45 }, xaxis: { title: "Capacidad instalada conocida (MW)", gridcolor: "#EEF0EE" }, yaxis: { automargin: true, categoryorder: "array", categoryarray: departments.map((row) => row.name).reverse() } }), plotConfig);
    if (el._productionDepartmentClick) el.removeListener?.("plotly_click", el._productionDepartmentClick);
    el._productionDepartmentClick = (event) => {
      const id = event.points?.[0]?.customdata?.[0];
      if (id) onTerritorySelect?.(String(id));
    };
    el.on("plotly_click", el._productionDepartmentClick);
    el.style.cursor = "pointer";
  }
  function renderFutureComparisonChart(rows, onTerritorySelect) {
    const el = document.getElementById("production-future-chart");
    const grouped = /* @__PURE__ */ new Map();
    rows.forEach((row) => {
      if (!grouped.has(row.departamento_id)) grouped.set(row.departamento_id, { id: row.departamento_id, name: row.departamento_nombre, current: 0, future: 0 });
      const group = grouped.get(row.departamento_id), installed = number(row.capacidad_instalada_mw), project = number(row.potencia_declarada_proyecto_mw);
      if (installed !== null) group.current += installed;
      if (row.condicion_informacion === "proyecto_futuro" && project !== null) group.future += project;
    });
    const departments = [...grouped.values()].filter((row) => row.current > 0 || row.future > 0).sort((a, b) => b.current + b.future - (a.current + a.future) || a.name.localeCompare(b.name, "es"));
    if (!departments.length) {
      Plotly.purge(el);
      el.innerHTML = '<p class="empty-chart">No hay capacidad actual ni proyectos futuros documentados para la selecci\xF3n.</p>';
      return;
    }
    if (el.querySelector(".empty-chart")) {
      el.innerHTML = "";
      Plotly.purge(el);
    }
    const traces = [
      { type: "bar", orientation: "h", name: "Capacidad instalada", y: departments.map((row) => row.name), x: departments.map((row) => row.current), customdata: departments.map((row) => row.id), marker: { color: COLORS2.primary }, hovertemplate: "%{y}<br>%{x:,.2f} MW instalados<extra></extra>" },
      { type: "bar", orientation: "h", name: "Proyectos futuros", y: departments.map((row) => row.name), x: departments.map((row) => row.future), customdata: departments.map((row) => row.id), marker: { color: COLORS2.yellow }, hovertemplate: "%{y}<br>%{x:,.2f} MW declarados<extra></extra>" }
    ];
    Plotly.react(el, traces, baseLayout({ barmode: "group", margin: { l: 120, r: 18, t: 20, b: 45 }, xaxis: { title: "MW documentados", gridcolor: "#EEF0EE" }, yaxis: { automargin: true, categoryorder: "array", categoryarray: departments.map((row) => row.name).reverse() } }), plotConfig);
    if (el._productionFutureClick) el.removeListener?.("plotly_click", el._productionFutureClick);
    el._productionFutureClick = (event) => {
      const id = event.points?.[0]?.customdata;
      if (id) onTerritorySelect?.(String(id));
    };
    el.on("plotly_click", el._productionFutureClick);
    el.style.cursor = "pointer";
  }
  function renderMatrixChart(rows) {
    const el = document.getElementById("production-matrix-chart");
    const grouped = /* @__PURE__ */ new Map();
    rows.forEach((row) => {
      const value = number(row.capacidad_instalada_mw);
      if (value !== null) grouped.set(row.actividad_id, { name: row.actividad_nombre, value: (grouped.get(row.actividad_id)?.value || 0) + value, color: ACTIVITY_COLORS[row.actividad_id] || COLORS2.muted });
    });
    const values = [...grouped.values()].sort((a, b) => b.value - a.value);
    if (!values.length) {
      Plotly.purge(el);
      el.innerHTML = '<p class="empty-chart">No hay capacidad instalada documentada para la selecci\xF3n.</p>';
      return;
    }
    if (el.querySelector(".empty-chart")) {
      el.innerHTML = "";
      Plotly.purge(el);
    }
    Plotly.react(el, [{ type: "pie", hole: 0.58, labels: values.map((row) => row.name), values: values.map((row) => row.value), marker: { colors: values.map((row) => row.color), line: { color: COLORS2.surface, width: 2 } }, textinfo: "label+percent", hovertemplate: "%{label}<br>%{value:,.2f} MW<br>%{percent}<extra></extra>", sort: false }], baseLayout({ margin: { l: 20, r: 20, t: 20, b: 45 }, legend: { orientation: "h", y: -0.04, x: 0.5, xanchor: "center" } }), plotConfig);
  }
  function renderKpis(rows) {
    const summary = productionSummary(rows);
    const cards = [
      ["Instalaciones", fmt2.format(summary.installations), "Unidades georreferenciadas"],
      ["Capacidad instalada", `${formatDecimal(summary.installed)} MW`, `${summary.withInstalled} instalaciones con dato`],
      ["Potencia de proyecto", `${formatDecimal(summary.projectPower)} MW`, "Valor documental; no se suma como instalada"],
      ["Proyectos futuros", fmt2.format(summary.future), "Construcci\xF3n no iniciada seg\xFAn SPIA"]
    ];
    document.getElementById("production-kpis").innerHTML = cards.map(([label, value, note]) => `<article><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join("");
  }
  function renderTable(rows, state2) {
    const body = document.getElementById("production-table");
    body.innerHTML = [...rows].sort((a, b) => a.departamento_nombre.localeCompare(b.departamento_nombre, "es") || a.nombre_instalacion.localeCompare(b.nombre_instalacion, "es")).map((row) => `<tr class="${row.instalacion_id === state2.productInstallation ? "is-selected" : ""}"><td><button type="button" data-product-installation="${escapeHTML(row.instalacion_id)}">${escapeHTML(row.nombre_instalacion)}</button></td><td>${escapeHTML(row.departamento_nombre)}</td><td>${escapeHTML(row.actividad_nombre)}</td><td><span class="production-status status-${escapeHTML(row.estado_id.toLowerCase())}">${escapeHTML(row.estado_nombre)}</span></td><td class="number">${formatDecimal(number(row.capacidad_instalada_mw))}</td><td class="number">${formatDecimal(number(row.potencia_declarada_proyecto_mw))}</td><td>${escapeHTML(operatorLabel(row.operador))}</td></tr>`).join("");
  }
  function renderDetail(data2, state2, rows) {
    const container = document.getElementById("production-detail");
    const row = rows.find((item) => item.instalacion_id === state2.productInstallation);
    if (!row) {
      container.innerHTML = '<div class="production-detail-empty"><span>\u2196</span><h4>Seleccion\xE1 una instalaci\xF3n</h4><p>El mapa y la tabla abren una ficha con capacidad, estado, operador y fuente. Los campos sin respaldo permanecen vac\xEDos.</p></div>';
      return;
    }
    const source = data2.productionSourceById?.[row.fuente_primaria_id];
    const sourceLink = source?.url ? `<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener">${escapeHTML(source.titulo || source.fuente_id)}</a>` : escapeHTML(row.fuente_primaria_id);
    const thermalEvidence = (row.fuentes_secundarias_ids || "").split("|").filter((id) => id.startsWith("CAMMESA_POTENCIA_TERMICA_") || id.startsWith("CAMMESA_GENERACION_LOCAL_")).map((id) => data2.productionSourceById?.[id]).filter(Boolean);
    container.innerHTML = `<article class="installation-card">
    <div class="installation-card-heading"><span style="--activity-color:${ACTIVITY_COLORS[row.actividad_id] || COLORS2.muted}">${escapeHTML(row.actividad_nombre)}</span><h4>${escapeHTML(row.nombre_instalacion)}</h4><p>${escapeHTML(row.departamento_nombre)} \xB7 ${escapeHTML(row.estado_nombre)}</p></div>
    <dl>
      <div><dt>Capacidad instalada</dt><dd>${number(row.capacidad_instalada_mw) !== null ? `${formatDecimal(row.capacidad_instalada_mw)} MW` : "Sin dato verificado"}</dd></div>
      <div><dt>Potencia declarada de proyecto</dt><dd>${number(row.potencia_declarada_proyecto_mw) !== null ? `${formatDecimal(row.potencia_declarada_proyecto_mw)} MW` : "Sin dato"}</dd></div>
      <div><dt>Operador / agente</dt><dd>${escapeHTML(operatorLabel(row.operador))}</dd></div>
      <div><dt>Empleo de construcci\xF3n</dt><dd>Sin dato observado</dd></div>
      <div><dt>Empleo de operaci\xF3n</dt><dd>Sin dato observado</dd></div>
      <div><dt>A\xF1o declarado</dt><dd>${escapeHTML(row.anio_referencia || "Sin informar")}</dd></div>
    </dl>
    <footer><strong>Fuente primaria</strong>${sourceLink}<small>${escapeHTML(source?.institucion || "")} ${source?.fecha_actualizacion_declarada ? `\xB7 actualizaci\xF3n declarada ${escapeHTML(source.fecha_actualizacion_declarada)}` : "\xB7 fecha de corte no informada"}</small>${thermalEvidence.map((item) => `<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener">${escapeHTML(item.titulo)}</a>`).join("")}</footer>
  </article>`;
  }
  function renderProduction(data2, state2, callbacks = {}) {
    const rows = filteredProductionRows(data2, state2);
    renderKpis(rows);
    renderProductionMap(data2, state2, rows, callbacks.onTerritorySelect, callbacks.onInstallationSelect);
    renderDepartmentChart(rows, callbacks.onTerritorySelect);
    renderFutureComparisonChart(rows, callbacks.onTerritorySelect);
    renderMatrixChart(rows);
    renderTable(rows, state2);
    renderDetail(data2, state2, rows);
    const territory = state2.territory === "all" ? "Toda la provincia" : data2.territoryById?.[state2.territory]?.territorio_nombre || "Departamento";
    document.getElementById("production-map-caption").textContent = `${territory} \xB7 ${rows.length} instalaciones visibles`;
    document.getElementById("production-department-caption").textContent = "MW verificados \xB7 clic para filtrar";
    document.getElementById("production-future-caption").textContent = "Valores separados; los proyectos no se suman a la capacidad actual";
    document.getElementById("production-matrix-caption").textContent = "S\xF3lo capacidad instalada documentada; excluye potencia declarada de proyectos";
    document.getElementById("production-source-note").textContent = (data2.productionMetadata?.advertencias || []).join(" ");
  }

  // portfolio-v2/demos/chubut/assets/js/production.js?v=2.11.0
  var ACTIVITY_COLORS2 = { EOL: COLORS2.primary, HID: COLORS2.support, TER: COLORS2.coral, PET: COLORS2.primaryDark, GAS: COLORS2.brown, H2: COLORS2.yellow, OTR: COLORS2.muted };
  var STATE_COLORS2 = { OPERATIVO: COLORS2.primary, EN_CONSTRUCCION: COLORS2.coral, PROYECTADO: COLORS2.yellow, FUERA_SERVICIO: COLORS2.critical, SIN_INFO: "#8B9499" };
  var ACTIVITY_SYMBOLS2 = {
    EOL: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="10" r="1.7"/><path d="M12 11.5v8M9.4 20h5.2M12 8.3 8.1 3.8M13.6 9.1l6.2-1.2M10.8 10.9l-2.4 5.8"/></svg>',
    HID: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8c-2.5 4-6.3 8.1-6.3 12.1a6.3 6.3 0 0 0 12.6 0C18.3 10.9 14.5 6.8 12 2.8Z"/><path d="M9.1 15.2c.4 1.5 1.3 2.3 2.9 2.5"/></svg>',
    TER: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13.7 2.7-7.2 10h4.7l-1 8.6 7.3-11h-4.6l.8-7.6Z"/></svg>',
    PET: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 20h10M9 20l3-15 3 15M8.6 11h6.8M7.8 15h8.4M5.5 7.5h9M14.5 5v5M14.5 7.5H19l-2.5 3"/></svg>',
    GAS: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 2.8c.8 3-1.2 4.4-2.4 6.1-1.1 1.5-1.5 2.9-.4 4.6.1-2.2 1.4-3.2 2.7-4.5 2.7 2 4.2 4.3 4.2 6.7a5.3 5.3 0 0 1-10.6 0c0-3.5 2.5-6.1 6.5-12.9Z"/></svg>',
    H2: '<span class="production-h2-symbol">H<sub>2</sub></span>',
    OTR: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>'
  };
  function activitySymbol2(activityId) {
    return ACTIVITY_SYMBOLS2[activityId] || ACTIVITY_SYMBOLS2.OTR;
  }

  // portfolio-v2/demos/chubut/assets/js/productive-scenario.js?v=2.13.0
  var PRODUCTIVE_SCENARIO_START_YEAR = 2026;
  var PRODUCTIVE_SCENARIO_END_YEAR = 2050;
  var number2 = (value) => value === null || value === "" || value === void 0 ? null : Number(value);
  var finite = (value) => Number.isFinite(Number(value));
  var formatDecimal2 = (value) => value === null || !finite(value) ? "\u2014" : Number(value).toLocaleString("es-AR", { maximumFractionDigits: 2 });
  var escapeHTML2 = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  function productiveScenarioActivities(data2) {
    const rows = data2.productionInstallations || [];
    const ids = [...new Set(rows.map((row) => row.actividad_id).filter(Boolean))];
    return ids.map((id) => {
      const row = rows.find((item) => item.actividad_id === id);
      return { id, label: row?.actividad_nombre || id, color: ACTIVITY_COLORS2[id] || COLORS2.muted };
    }).sort((a, b) => a.label.localeCompare(b.label, "es"));
  }
  function productiveScenarioBase(data2, departmentId, activityId) {
    const rows = (data2.productionInstallations || []).filter(
      (row) => row.departamento_id === departmentId && row.actividad_id === activityId && (activityId !== "EOL" || row.estado_id === "OPERATIVO")
    );
    const documented = rows.filter(
      (row) => number2(row.capacidad_instalada_mw) !== null && (activityId !== "TER" || row.estado_id === "OPERATIVO")
    );
    return {
      capacityMw: documented.reduce((sum2, row) => sum2 + Number(row.capacidad_instalada_mw), 0),
      installations: rows.length,
      documented: documented.length,
      incomplete: rows.length > documented.length
    };
  }
  function signedCapacity(change) {
    const value = Number(change.capacityMw) || 0;
    return change.changeType === "REDUCCION" ? -value : value;
  }
  function previousScenarioDelta(state2, departmentId, activityId, year) {
    return (state2.scenarioProductChanges || []).filter((change) => change.departmentId === departmentId && change.activityId === activityId && Number(change.operationYear) <= Number(year)).reduce((sum2, change) => sum2 + signedCapacity(change), 0);
  }
  function productiveScenarioPreview(data2, state2) {
    const departmentId = state2.scenarioProductDepartment || "";
    const activityId = state2.scenarioProductActivity || "";
    const changeType = state2.scenarioProductChangeType === "REDUCCION" ? "REDUCCION" : "AMPLIACION";
    const capacityMw = number2(state2.scenarioProductCapacityMw);
    const operationYear = Number(state2.scenarioProductYear);
    const jobsPerMw = number2(state2.scenarioProductJobsPerMw);
    const base = productiveScenarioBase(data2, departmentId, activityId);
    const previousDelta = departmentId && activityId ? previousScenarioDelta(state2, departmentId, activityId, operationYear) : 0;
    const capacityBefore = Math.max(0, base.capacityMw + previousDelta);
    const deltaMw = capacityMw === null ? null : changeType === "REDUCCION" ? -capacityMw : capacityMw;
    const capacityAfter = deltaMw === null ? null : capacityBefore + deltaMw;
    const errors = [];
    if (!departmentId) errors.push("Seleccion\xE1 un departamento.");
    if (!activityId) errors.push("Seleccion\xE1 una tecnolog\xEDa.");
    if (capacityMw === null || !finite(capacityMw) || capacityMw <= 0) errors.push("Ingres\xE1 una modificaci\xF3n de capacidad mayor que cero.");
    if (!Number.isInteger(operationYear) || operationYear < PRODUCTIVE_SCENARIO_START_YEAR || operationYear > PRODUCTIVE_SCENARIO_END_YEAR) errors.push(`El a\xF1o debe estar entre ${PRODUCTIVE_SCENARIO_START_YEAR} y ${PRODUCTIVE_SCENARIO_END_YEAR}.`);
    if (jobsPerMw === null || !finite(jobsPerMw) || jobsPerMw < 0) errors.push("Ingres\xE1 un coeficiente de empleo permanente no negativo.");
    if (changeType === "REDUCCION" && capacityMw !== null && capacityMw > capacityBefore) errors.push(`La reducci\xF3n supera la capacidad disponible antes del cambio (${formatDecimal2(capacityBefore)} MW).`);
    const ready = errors.length === 0;
    const departmentName = data2.territoryById?.[departmentId]?.territorio_nombre || "";
    const activity = productiveScenarioActivities(data2).find((item) => item.id === activityId);
    return {
      departmentId,
      departmentName,
      activityId,
      activityName: activity?.label || activityId,
      activityColor: activity?.color || COLORS2.muted,
      changeType,
      capacityMw,
      operationYear,
      jobsPerMw,
      base,
      previousDelta,
      capacityBefore,
      deltaMw,
      capacityAfter,
      employmentDelta: ready ? deltaMw * jobsPerMw : null,
      errors,
      ready
    };
  }
  function createProductiveScenarioChange(data2, state2) {
    const preview = productiveScenarioPreview(data2, state2);
    if (!preview.ready) return { change: null, errors: preview.errors };
    return { change: {
      id: `cambio-${Date.now()}-${(state2.scenarioProductChanges || []).length + 1}`,
      departmentId: preview.departmentId,
      departmentName: preview.departmentName,
      activityId: preview.activityId,
      activityName: preview.activityName,
      changeType: preview.changeType,
      capacityMw: preview.capacityMw,
      operationYear: preview.operationYear,
      jobsPerMw: preview.jobsPerMw,
      employmentDelta: preview.employmentDelta,
      assumptionStatus: "SUPUESTO_USUARIO"
    }, errors: [] };
  }
  function productiveScenarioSummary(state2) {
    const changes = state2.scenarioProductChanges || [];
    const netCapacityMw = changes.reduce((sum2, change) => sum2 + signedCapacity(change), 0);
    const employmentDelta = changes.reduce((sum2, change) => sum2 + (Number(change.employmentDelta) || 0), 0);
    const years = changes.map((change) => Number(change.operationYear)).filter(Number.isFinite);
    return {
      changes: changes.length,
      departments: new Set(changes.map((change) => change.departmentId)).size,
      netCapacityMw,
      employmentDelta,
      firstYear: years.length ? Math.min(...years) : null
    };
  }
  function previewCards(preview) {
    const employment = preview.employmentDelta === null ? "\u2014" : `${preview.employmentDelta >= 0 ? "+" : ""}${formatDecimal2(preview.employmentDelta)}`;
    const thermal = preview.activityId === "TER";
    const baseLabel = thermal ? "Piso t\xE9rmico verificado" : "Capacidad base verificada";
    const baseDetail = thermal ? "CAMMESA \xB7 operaci\xF3n confirmada en 09/2026" : "instalaciones con dato";
    return `<div class="productive-preview-grid">
    <article><span>${baseLabel}</span><strong>${preview.departmentId && preview.activityId ? `${formatDecimal2(preview.base.capacityMw)} MW` : "\u2014"}</strong><small>${preview.departmentId && preview.activityId ? `${preview.base.documented} de ${preview.base.installations} \xB7 ${baseDetail}` : "Seleccion\xE1 territorio y tecnolog\xEDa"}</small></article>
    <article><span>Capacidad antes del cambio</span><strong>${preview.departmentId && preview.activityId ? `${formatDecimal2(preview.capacityBefore)} MW` : "\u2014"}</strong><small>${preview.previousDelta ? `Incluye ${preview.previousDelta > 0 ? "+" : ""}${formatDecimal2(preview.previousDelta)} MW previos del escenario` : "Sin cambios anteriores aplicables"}</small></article>
    <article><span>Capacidad resultante</span><strong>${preview.capacityAfter === null ? "\u2014" : `${formatDecimal2(preview.capacityAfter)} MW`}</strong><small>${preview.deltaMw === null ? "Ingres\xE1 una modificaci\xF3n" : `${preview.deltaMw >= 0 ? "+" : ""}${formatDecimal2(preview.deltaMw)} MW en ${preview.operationYear}`}</small></article>
    <article><span>Empleo permanente</span><strong>${employment}</strong><small>${preview.jobsPerMw === null ? "Coeficiente pendiente" : `${formatDecimal2(preview.jobsPerMw)} puestos por MW`}</small></article>
  </div>`;
  }
  function renderChangesTable(state2) {
    const changes = state2.scenarioProductChanges || [];
    if (!changes.length) return '<tr><td colspan="7" class="scenario-empty-row">Todav\xEDa no se agregaron cambios productivos.</td></tr>';
    return [...changes].sort((a, b) => a.operationYear - b.operationYear || a.departmentName.localeCompare(b.departmentName, "es")).map((change) => {
      const sign = change.changeType === "REDUCCION" ? "\u2212" : "+";
      const employment = Number(change.employmentDelta) || 0;
      return `<tr><td>${escapeHTML2(change.departmentName)}</td><td><span class="scenario-activity" style="--activity-color:${ACTIVITY_COLORS2[change.activityId] || COLORS2.muted}">${activitySymbol2(change.activityId)} ${escapeHTML2(change.activityName)}</span></td><td class="number">${sign}${formatDecimal2(change.capacityMw)} MW</td><td>${change.operationYear}</td><td class="number">${formatDecimal2(change.jobsPerMw)}</td><td class="number">${employment >= 0 ? "+" : ""}${formatDecimal2(employment)}</td><td><button type="button" class="scenario-remove" data-remove-productive-change="${escapeHTML2(change.id)}" aria-label="Quitar cambio de ${escapeHTML2(change.departmentName)}">Quitar</button></td></tr>`;
    }).join("");
  }
  function renderProductiveScenario(data2, state2) {
    const preview = productiveScenarioPreview(data2, state2);
    const summary = productiveScenarioSummary(state2);
    document.getElementById("scenario-product-preview").innerHTML = previewCards(preview);
    const message = document.getElementById("scenario-product-message");
    if (preview.errors.length) {
      message.className = "scenario-form-message";
      message.textContent = preview.errors[0];
    } else if (preview.activityId === "TER" && !preview.base.documented) {
      message.className = "scenario-form-message warning";
      message.textContent = "Sin centrales t\xE9rmicas verificadas en este departamento. El c\xE1lculo s\xF3lo refleja los MW simulados.";
    } else if (preview.activityId === "TER") {
      message.className = "scenario-form-message warning";
      message.textContent = "Piso t\xE9rmico parcial. Incluye s\xF3lo centrales conciliadas con generaci\xF3n en septiembre de 2026.";
    } else if (preview.base.incomplete) {
      message.className = "scenario-form-message warning";
      message.textContent = `La capacidad base es parcial: ${preview.base.documented} de ${preview.base.installations} instalaciones tienen capacidad documentada.`;
    } else {
      message.className = "scenario-form-message valid";
      message.textContent = "Par\xE1metros completos. El cambio puede incorporarse al escenario.";
    }
    document.getElementById("scenario-add-change").disabled = !preview.ready;
    document.getElementById("scenario-clear-changes").disabled = !summary.changes;
    document.getElementById("scenario-product-table").innerHTML = renderChangesTable(state2);
    document.getElementById("scenario-summary").innerHTML = `<article><span>Cambios</span><strong>${fmt2.format(summary.changes)}</strong><small>${summary.departments} departamentos</small></article><article><span>Variaci\xF3n neta</span><strong>${summary.netCapacityMw >= 0 ? "+" : ""}${formatDecimal2(summary.netCapacityMw)} MW</strong><small>Capacidad el\xE9ctrica del escenario</small></article><article><span>Empleo permanente</span><strong>${summary.employmentDelta >= 0 ? "+" : ""}${formatDecimal2(summary.employmentDelta)}</strong><small>Puestos estimados</small></article><article><span>Primera entrada</span><strong>${summary.firstYear || "\u2014"}</strong><small>${summary.firstYear ? "A\xF1o de operaci\xF3n" : "Sin cambios cargados"}</small></article>`;
  }

  // portfolio-v2/demos/chubut/assets/js/app.js
  var data = {};
  var timer = null;
  var renderFrame = null;
  var routeToken = 0;
  var capacityControlsReady = false;
  var productionControlsReady = false;
  var productiveScenarioControlsReady = false;
  var lastProductionSignature = "";
  var $ = (s) => document.querySelector(s);
  var selections = [
    ["all", "Total / todos"],
    ["level:INI", "Inicial \xB7 nivel completo"],
    ["group:0_3", "\u21B3 0\u20133 a\xF1os"],
    ["group:4_5", "\u21B3 4\u20135 a\xF1os"],
    ["level:PRI", "Primario \xB7 nivel completo"],
    ["group:6_11", "\u21B3 6\u201311 a\xF1os"],
    ["level:SEC", "Secundario \xB7 nivel completo"],
    ["group:12_14", "\u21B3 12\u201314 a\xF1os"],
    ["group:15_17", "\u21B3 15\u201317 a\xF1os"],
    ["group:18_SEC", "18 a\xF1os"]
  ];
  var selectionLabel = (value) => (selections.find((x) => x[0] === value)?.[1] || "Todos").replace(/^↳\s*/, "");
  var selectOptions = () => `<option value="all">Total / todos</option>
  <optgroup label="Inicial"><option class="level-total-option" value="level:INI">Inicial \xB7 total del nivel</option><option value="group:0_3">\u21B3 0\u20133 a\xF1os</option><option value="group:4_5">\u21B3 4\u20135 a\xF1os</option></optgroup>
  <optgroup label="Primario"><option class="level-total-option" value="level:PRI">Primario \xB7 total del nivel</option><option value="group:6_11">\u21B3 6\u201311 a\xF1os</option></optgroup>
  <optgroup label="Secundario"><option class="level-total-option" value="level:SEC">Secundario \xB7 total del nivel</option><option value="group:12_14">\u21B3 12\u201314 a\xF1os</option><option value="group:15_17">\u21B3 15\u201317 a\xF1os</option></optgroup>
  <option value="group:18_SEC">18 a\xF1os</option>`;
  var territories = () => Object.entries(data.territoryById).map(([value, x]) => ({ value, label: x.territorio_nombre })).sort((a, b) => a.label.localeCompare(b.label, "es"));
  function populateTerritory(el) {
    el.innerHTML = '<option value="all">Toda la provincia</option>' + territories().map((x) => `<option value="${x.value}">${x.label}</option>`).join("");
  }
  function fillSelect(el, firstLabel, options, { includeMissing = false } = {}) {
    el.innerHTML = "";
    const first = document.createElement("option");
    first.value = "all";
    first.textContent = firstLabel;
    el.appendChild(first);
    if (includeMissing) {
      const missing = document.createElement("option");
      missing.value = "__missing__";
      missing.textContent = "Sin informar";
      el.appendChild(missing);
    }
    options.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.label;
      el.appendChild(option);
    });
  }
  function setupProductionControls() {
    if (productionControlsReady || !data.productionInstallations) return;
    populateTerritory($("#product-territory"));
    const options = productionFilterOptions(data);
    fillSelect($("#product-activity"), "Todas las actividades", options.activities);
    fillSelect($("#product-operator"), "Todos los operadores", options.operators, { includeMissing: true });
    fillSelect($("#product-status"), "Todos los estados", options.statuses);
    $("#product-territory").addEventListener("change", (event) => setState({ territory: event.target.value, productInstallation: "" }));
    $("#product-activity").addEventListener("change", (event) => setState({ productActivity: event.target.value, productInstallation: "" }));
    $("#product-operator").addEventListener("change", (event) => setState({ productOperator: event.target.value, productInstallation: "" }));
    $("#product-status").addEventListener("change", (event) => setState({ productStatus: event.target.value, productInstallation: "" }));
    $("#production-table").addEventListener("click", (event) => {
      const button = event.target.closest("[data-product-installation]");
      if (button) setState({ productInstallation: button.dataset.productInstallation });
    });
    productionControlsReady = true;
  }
  function setupProductiveScenarioControls() {
    if (productiveScenarioControlsReady || !data.productionInstallations) return;
    const department = $("#scenario-product-department");
    department.innerHTML = '<option value="">Seleccionar departamento</option>' + territories().map((item) => `<option value="${item.value}">${item.label}</option>`).join("");
    $("#scenario-product-activities").innerHTML = productiveScenarioActivities(data).map((item) => `<label style="--activity-color:${item.color}"><input type="radio" name="scenario-product-activity" value="${item.id}"><span>${activitySymbol(item.id)}<strong>${item.label}</strong></span></label>`).join("");
    department.addEventListener("change", (event) => setState({ scenarioProductDepartment: event.target.value }));
    $("#scenario-product-activities").addEventListener("change", (event) => {
      if (event.target.matches('[name="scenario-product-activity"]')) setState({ scenarioProductActivity: event.target.value });
    });
    document.querySelectorAll('[name="scenario-product-change-type"]').forEach((input) => input.addEventListener("change", (event) => {
      if (event.target.checked) setState({ scenarioProductChangeType: event.target.value });
    }));
    $("#scenario-product-capacity").addEventListener("input", (event) => setState({ scenarioProductCapacityMw: event.target.value }));
    document.querySelectorAll("[data-scenario-capacity-step]").forEach((button) => button.addEventListener("click", () => {
      const current = Number(getState().scenarioProductCapacityMw) || 0, delta = Number(button.dataset.scenarioCapacityStep) || 0;
      setState({ scenarioProductCapacityMw: Math.max(0, Math.round((current + delta) * 10) / 10) });
    }));
    $("#scenario-product-year").addEventListener("input", (event) => setState({ scenarioProductYear: Number(event.target.value) }));
    $("#scenario-product-jobs").addEventListener("input", (event) => setState({ scenarioProductJobsPerMw: event.target.value }));
    $("#scenario-clear-coefficient").addEventListener("click", () => setState({ scenarioProductJobsPerMw: "" }));
    $("#scenario-add-change").addEventListener("click", () => {
      const state2 = getState(), result = createProductiveScenarioChange(data, state2);
      if (result.change) setState({ scenarioProductChanges: [...state2.scenarioProductChanges || [], result.change], scenarioProductCapacityMw: "" });
    });
    $("#scenario-product-table").addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-productive-change]");
      if (button) setState({ scenarioProductChanges: (getState().scenarioProductChanges || []).filter((change) => change.id !== button.dataset.removeProductiveChange) });
    });
    $("#scenario-clear-changes").addEventListener("click", () => setState({ scenarioProductChanges: [] }));
    productiveScenarioControlsReady = true;
  }
  function setPlaybackUI(running) {
    const b = $("#shared-year-play");
    b.setAttribute("aria-pressed", String(running));
    b.textContent = running ? "\u275A\u275A Pausar" : "\u25B6 Reproducir a\xF1os";
  }
  function stopPlayback() {
    if (timer) clearInterval(timer);
    timer = null;
    setPlaybackUI(false);
  }
  var minimumYear = (module) => module === "oferta" ? 2024 : 2022;
  function togglePlayback() {
    if (timer) {
      stopPlayback();
      return;
    }
    if (getState().year >= 2050) setState({ year: minimumYear(getState().module) });
    setPlaybackUI(true);
    timer = setInterval(() => {
      const next = Math.min(2050, getState().year + 1);
      setState({ year: next });
      if (next === 2050) stopPlayback();
    }, 600);
  }
  function placeYearControl(route) {
    const slot = $(route === "oferta" ? "#capacity-year-slot" : "#demography-year-slot"), control = $("#shared-year-control"), min = minimumYear(route), input = $("#shared-year");
    if (slot && !slot.contains(control)) slot.appendChild(control);
    input.min = String(min);
    $("#shared-year-min").textContent = String(min);
    if (getState().year < min) {
      stopPlayback();
      setState({ year: min });
    }
  }
  function resetRates(territory = getState().territory, sex = getState().sex) {
    return data.attendanceRates ? initialScenarioRates(data, territory, sex) : {};
  }
  function setupControls() {
    populateTerritory($("#demography-territory"));
    populateTerritory($("#capacity-territory"));
    $("#age-group").innerHTML = selectOptions();
    $("#capacity-education").innerHTML = selectOptions();
    const changeTerritory = (e) => setState({ territory: e.target.value, capacitySchool: "all", capacityRates: resetRates(e.target.value, getState().sex) });
    $("#demography-territory").addEventListener("change", changeTerritory);
    $("#capacity-territory").addEventListener("change", changeTerritory);
    const changeSelection = (e) => setState({ educationSelection: e.target.value, capacitySchool: "all" });
    $("#age-group").addEventListener("change", changeSelection);
    $("#capacity-education").addEventListener("change", changeSelection);
    const changeSex = (e) => setState({ sex: e.target.value, capacitySchool: "all", capacityRates: resetRates(getState().territory, e.target.value) });
    $("#demography-sex").addEventListener("change", changeSex);
    $("#capacity-sex").addEventListener("change", changeSex);
    $("#demography-map-metric").addEventListener("change", (e) => setState({ demographyMapMetric: e.target.value }));
    $("#shared-year").addEventListener("input", (e) => setState({ year: Number(e.target.value) }));
    $("#shared-year-play").addEventListener("click", togglePlayback);
    $("#capacity-comparison-mode").addEventListener("change", (e) => {
      const mode = e.target.value;
      setState({ capacityMode: mode, capacityComparisonMode: mode, ...mode === "trend" ? { capacityRates: resetRates() } : {} });
    });
    $("#capacity-trend-view").addEventListener("change", (e) => setState({ capacityTrendView: e.target.value }));
    $("#capacity-distribution-mode").addEventListener("change", (e) => setState({ capacityDistributionMode: e.target.value }));
    $("#capacity-department-level").addEventListener("change", (e) => setState({ capacityDepartmentLevel: e.target.value }));
    $("#capacity-attendance-levels").addEventListener("change", (e) => {
      if (!e.target.matches("[data-attendance-level]")) return;
      const level = e.target.dataset.attendanceLevel, current = new Set(getState().capacityAttendanceLevels);
      e.target.checked ? current.add(level) : current.delete(level);
      setState({ capacityAttendanceLevels: ["INI", "PRI", "SEC", "AGE18"].filter((id) => current.has(id)) });
    });
    $("#reset-filters").addEventListener("click", () => {
      stopPlayback();
      resetState();
      if (data.attendanceRates) setState({ capacityRates: resetRates() });
    });
    $("#download-csv").addEventListener("click", exportFiltered);
    syncControls(getState());
  }
  function renderRateSliders() {
    const c = $("#capacity-rate-sliders");
    c.innerHTML = POLICY_GROUPS.map((g) => `<label class="rate-slider" style="--group-color:${g.color}"><span><strong>${g.levelLabel}</strong> \xB7 ${g.label}</span><output id="rate-output-${g.id}">\u2014</output><input data-rate-group="${g.id}" type="range" max="100" step="0.1"></label>`).join("");
    c.addEventListener("input", (e) => {
      if (!e.target.matches("[data-rate-group]")) return;
      setState({ capacityRates: { ...getState().capacityRates, [e.target.dataset.rateGroup]: Number(e.target.value) / 100 } });
    });
    capacityControlsReady = true;
  }
  function renderThresholdControls() {
    const c = $("#capacity-threshold-controls"), levels = [["INI", "Inicial"], ["PRI", "Primario"], ["SEC", "Secundario"]];
    c.innerHTML = levels.map(([id, label]) => `<label><span>${label}</span><span class="threshold-input"><input data-capacity-threshold="${id}" type="number" min="1" max="60" step="1"><small>estudiantes</small></span></label>`).join("");
    c.addEventListener("change", (e) => {
      if (!e.target.matches("[data-capacity-threshold]")) return;
      const value = Math.max(1, Math.min(60, Math.round(Number(e.target.value) || DEFAULT_CAPACITY_THRESHOLDS[e.target.dataset.capacityThreshold])));
      setState({ capacityThresholds: { ...getState().capacityThresholds, [e.target.dataset.capacityThreshold]: value }, capacitySchool: "all" });
    });
  }
  function syncRateSliders(state2) {
    if (!capacityControlsReady || !data.attendanceRates) return;
    const trend = state2.capacityMode === "trend";
    $("#rate-policy").classList.toggle("is-disabled", trend);
    POLICY_GROUPS.forEach((g) => {
      const sex = state2.sex === "all" ? "T" : state2.sex, current = currentRate(data, state2.territory, g.id, sex), min = Number(current.tasa_asistencia) || 0, value = Math.max(min, Math.min(1, Number(state2.capacityRates?.[g.id] ?? min))), input = $(`[data-rate-group="${g.id}"]`), output = $(`#rate-output-${g.id}`);
      input.min = (min * 100).toFixed(1);
      input.value = (value * 100).toFixed(1);
      input.disabled = trend;
      output.textContent = `${(value * 100).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
      output.title = `Tasa actual ${pct.format(min)} \xB7 ${current.source}`;
    });
  }
  function syncThresholdControls(state2) {
    document.querySelectorAll("[data-capacity-threshold]").forEach((input) => {
      input.value = state2.capacityThresholds?.[input.dataset.capacityThreshold] ?? DEFAULT_CAPACITY_THRESHOLDS[input.dataset.capacityThreshold];
    });
  }
  function syncControls(s) {
    const territory = s.territory === "all" ? "Toda la provincia" : data.territoryById?.[s.territory]?.territorio_nombre || "Departamento";
    $("#demography-territory").value = s.territory;
    $("#capacity-territory").value = s.territory;
    $("#age-group").value = s.educationSelection;
    $("#capacity-education").value = s.educationSelection;
    $("#demography-sex").value = s.sex;
    $("#capacity-sex").value = s.sex;
    $("#demography-map-metric").value = s.demographyMapMetric;
    $("#shared-year").value = s.year;
    $("#shared-year-output").textContent = s.year;
    $("#capacity-comparison-mode").value = s.capacityComparisonMode;
    $("#capacity-trend-view").value = s.capacityTrendView;
    $("#capacity-distribution-mode").value = s.capacityDistributionMode;
    $("#capacity-department-level").value = ["all", "INI", "PRI", "SEC", "AGE18"].includes(s.capacityDepartmentLevel) ? s.capacityDepartmentLevel : "all";
    document.querySelectorAll("[data-attendance-level]").forEach((input) => input.checked = s.capacityAttendanceLevels.includes(input.dataset.attendanceLevel));
    if (productionControlsReady) {
      $("#product-territory").value = s.territory;
      $("#product-activity").value = s.productActivity;
      $("#product-operator").value = s.productOperator;
      $("#product-status").value = s.productStatus;
    }
    if (productiveScenarioControlsReady) {
      $("#scenario-product-department").value = s.scenarioProductDepartment || "";
      document.querySelectorAll('[name="scenario-product-activity"]').forEach((input) => input.checked = input.value === s.scenarioProductActivity);
      document.querySelectorAll('[name="scenario-product-change-type"]').forEach((input) => input.checked = input.value === s.scenarioProductChangeType);
      $("#scenario-product-capacity").value = s.scenarioProductCapacityMw ?? "";
      $("#scenario-product-year").value = s.scenarioProductYear;
      $("#scenario-product-year-output").textContent = s.scenarioProductYear;
      $("#scenario-product-jobs").value = s.scenarioProductJobsPerMw ?? "";
    }
    setPanelSummary("demografia", `${s.demographyYear} \xB7 ${territory} \xB7 ${selectionLabel(s.educationSelection)} \xB7 ${demographySexLabel2(s.sex)}`);
    setPanelSummary("oferta", `${s.capacityYear} \xB7 ${s.capacityComparisonMode === "trend" ? "Tendencial" : "Escenario"} \xB7 ${territory} \xB7 ${selectionLabel(s.educationSelection)}`);
    setPanelSummary("productivos", `${territory} \xB7 ${s.productActivity === "all" ? "Todas las actividades" : data.productionInstallations?.find((row) => row.actividad_id === s.productActivity)?.actividad_nombre || s.productActivity} \xB7 ${s.productStatus === "all" ? "Todos los estados" : data.productionInstallations?.find((row) => row.estado_id === s.productStatus)?.estado_nombre || s.productStatus}`);
    syncRateSliders(s);
    syncThresholdControls(s);
  }
  function renderMetadata() {
    if (!data.metadata) return;
    $("#data-date").textContent = `Actualizaci\xF3n ${(/* @__PURE__ */ new Date(`${data.metadata.fecha_actualizacion}T12:00:00`)).toLocaleDateString("es-AR")}`;
    $("#footer-warning").textContent = data.metadata.advertencia_datos;
  }
  function renderSidebar() {
    const s = getState();
    if (s.module === "oferta" && data.capacitySections) {
      const rows = projectedSections(data, s), m = aggregateCapacity(rows), territory = s.territory === "all" ? "Toda la provincia" : data.territoryById[s.territory]?.territorio_nombre;
      $("#active-scenario").textContent = "Capacidad modelada";
      $("#active-selection").textContent = `${s.capacitySchool !== "all" ? schoolName(data, s.capacitySchool) : territory} \xB7 ${selectionLabel(s.educationSelection)} \xB7 ${s.year}`;
      const items = [["Secciones", fmt.format(m.sections), "Secciones-grado-oferta", COLORS.primary], ["Ocupaci\xF3n proyectada", pct.format(m.occupancy), `Base 2024: ${pct.format(m.baseOccupancy)}`, COLORS.coral], ["Capacidad modelada", fmt.format(m.capacity), "Umbrales por nivel", COLORS.yellow], ["Holgura modelada", fmt.format(m.availablePlaces), "Suma de holguras por secci\xF3n", COLORS.support]];
      $("#sidebar-kpi-list").innerHTML = items.map(([l, v, t, c]) => `<article class="sidebar-kpi" style="--kpi-color:${c}"><div class="kpi-line"><span class="kpi-label">${l}</span><strong>${v}</strong></div><small>${t}</small></article>`).join("");
      return;
    }
    if (s.module === "demografia" && data.demographyMetadata) {
      $("#active-scenario").textContent = data.demographyMetadata.serie_nombre;
      $("#active-selection").textContent = `${demographyTerritoryName(data, s.territory)} \xB7 ${selectionLabel(s.educationSelection)} \xB7 ${s.year}`;
      const value = totalForRange(data, s, s.demographyAgeRange);
      $("#sidebar-kpi-list").innerHTML = `<article class="sidebar-kpi" style="--kpi-color:${COLORS.primary}"><div class="kpi-line"><span class="kpi-label">Poblaci\xF3n seleccionada</span><strong>${fmt.format(value)}</strong></div><small>${demographySexLabel2(s.sex)}</small></article>`;
      return;
    }
    if (s.module === "productivos" && data.productionInstallations) {
      const rows = filteredProductionRows(data, s), summary = productionSummary(rows), territory = s.territory === "all" ? "Toda la provincia" : data.territoryById[s.territory]?.territorio_nombre;
      $("#active-scenario").textContent = "Inventario productivo";
      $("#active-selection").textContent = `${territory} \xB7 ${rows.length} instalaciones`;
      const items = [["Instalaciones", fmt.format(summary.installations), "Inventario filtrado", COLORS.primary], ["Capacidad instalada", `${summary.installed.toLocaleString("es-AR", { maximumFractionDigits: 2 })} MW`, `${summary.withInstalled} con dato`, COLORS.support], ["Potencia de proyecto", `${summary.projectPower.toLocaleString("es-AR", { maximumFractionDigits: 2 })} MW`, "No sumada como instalada", COLORS.yellow], ["Proyectos futuros", fmt.format(summary.future), "Construcci\xF3n no iniciada", COLORS.coral]];
      $("#sidebar-kpi-list").innerHTML = items.map(([l, v, t, c]) => `<article class="sidebar-kpi" style="--kpi-color:${c}"><div class="kpi-line"><span class="kpi-label">${l}</span><strong>${v}</strong></div><small>${t}</small></article>`).join("");
      return;
    }
    $("#active-scenario").textContent = "M\xF3dulo pendiente";
    $("#active-selection").textContent = "Sin datos disponibles";
    $("#sidebar-kpi-list").innerHTML = "";
  }
  function renderTable2() {
    const s = getState(), rows = demographyRows(data, s, { year: "all" }), byYear = /* @__PURE__ */ new Map();
    rows.forEach((r) => byYear.set(r.year, (byYear.get(r.year) || 0) + r.poblacion));
    const base = byYear.get(2022) || 0, territory = demographyTerritoryName(data, s.territory);
    $("#demography-table").innerHTML = [2022, 2025, 2030, 2040, 2050, s.year].filter((y, i, a) => a.indexOf(y) === i).sort().map((y) => `<tr><td>${y}</td><td>${y === 2022 ? "A\xF1o inicial ajustado" : y <= 2040 ? "Proyecci\xF3n ajustada \xB7 referencia INDEC" : "Extensi\xF3n provista"}</td><td>${territory}</td><td class="number">${fmt.format(byYear.get(y) || 0)}</td><td class="number">${base ? pct.format((byYear.get(y) || 0) / base - 1) : "\u2014"}</td></tr>`).join("");
  }
  function renderDemography() {
    const s = getState(), territory = demographyTerritoryName(data, s.territory), sex = demographySexLabel2(s.sex), stats = demographyMapStats(data, s);
    renderDemographyMap(data, s, stats, (id) => setState({ territory: id, capacitySchool: "all", capacityRates: resetRates(id, s.sex) }));
    renderDemographyChart(data, s, (y) => {
      stopPlayback();
      setState({ year: y });
    });
    renderPopulationPyramid(data, s);
    renderDepartmentShareChart(data, s);
    renderGrowthPolesChart(data, s);
    $("#demography-map-title").textContent = s.demographyMapMetric === "variation" ? "Cambio desde 2022 por departamento" : "Poblaci\xF3n por departamento";
    $("#demography-map-caption").textContent = `${s.year} \xB7 ${selectionLabel(s.educationSelection)} \xB7 ${sex}`;
    $("#pyramid-caption").textContent = `${territory} \xB7 ${s.year} \xB7 estructura M/F${s.year === 2022 ? "" : " \xB7 silueta punteada: 2022"}`;
    $("#department-share-caption").textContent = `${s.year} \xB7 ${selectionLabel(s.educationSelection)} \xB7 ${sex}`;
    $("#growth-poles-caption").textContent = `2022\u2013${s.year} \xB7 poblaci\xF3n total \xB7 ambos sexos`;
    renderTable2();
    const c = data.demographyMetadata.controles;
    $("#demography-source").textContent = `${data.demographyMetadata.metodo} ${data.demographyMetadata.advertencia} Total provincial 2022: ${fmt.format(c.total_2022)} personas.`;
  }
  function renderCapacity() {
    const s = getState(), rows = projectedSections(data, s), territory = s.territory === "all" ? "Toda la provincia" : data.territoryById[s.territory]?.territorio_nombre, select = (id) => setState({ territory: id, capacitySchool: "all", capacityRates: resetRates(id, s.sex) }), departmentLevelLabel = { all: "Todos los niveles", INI: "Inicial", PRI: "Primario", SEC: "Secundario", AGE18: "18 a\xF1os" }[s.capacityDepartmentLevel] || "Todos los niveles";
    renderSchoolCapacityMap(data, s, (id) => setState({ capacitySchool: id }), select);
    renderPotentialDemandEvolution(data, s, (y) => setState({ year: y }));
    renderAttendanceDumbbell(data, s, select);
    renderDepartmentOccupancyComparison(data, s, select);
    renderOccupancyDistribution(data, s, select);
    $("#capacity-map-caption").textContent = `${territory} \xB7 ${s.year} \xB7 ${selectionLabel(s.educationSelection)}`;
    $("#capacity-trend-caption").textContent = `${territory} \xB7 demanda = poblaci\xF3n proyectada \xD7 tasa \xB7 continua tendencial \xB7 punteada escenario`;
    $("#capacity-attendance-caption").textContent = `${s.year} \xB7 ${demographySexLabel2(s.sex)} \xB7 tasas equivalentes ponderadas por nivel`;
    $("#capacity-distribution-caption").textContent = `${s.year} \xB7 ${selectionLabel(s.educationSelection)}`;
    $("#capacity-department-caption").textContent = `2024 \u2192 ${s.year} \xB7 ${s.capacityComparisonMode === "trend" ? "Tendencial" : "Escenario"} \xB7 ${departmentLevelLabel}`;
    $("#capacity-source").innerHTML = `Universo: Educaci\xF3n Com\xFAn, niveles Inicial, Primario y Secundario. La demanda potencial usa la misma poblaci\xF3n proyectada del m\xF3dulo Demograf\xEDa y la multiplica por la tasa de asistencia correspondiente. La ocupaci\xF3n parte de cada secci\xF3n-grado-oferta observada en 2024 y aplica proporcionalmente el factor de variaci\xF3n de esa demanda dentro del mismo departamento, grupo y sexo. Capacidades modeladas activas: Inicial ${s.capacityThresholds.INI}, Primario ${s.capacityThresholds.PRI} y Secundario ${s.capacityThresholds.SEC} estudiantes por secci\xF3n. <strong>${categorySummary(rows)}</strong>`;
  }
  function renderProductivos() {
    const s = getState(), signature = [s.territory, s.productActivity, s.productOperator, s.productStatus, s.productInstallation].join("|");
    if (signature !== lastProductionSignature) {
      renderProduction(data, s, { onTerritorySelect: (id) => setState({ territory: id, productInstallation: "" }), onInstallationSelect: (id) => setState({ productInstallation: id }) });
      lastProductionSignature = signature;
    }
    renderProductiveScenario(data, s);
  }
  function exportFiltered() {
    const s = getState();
    if (s.module === "oferta" && data.capacitySections) {
      const rows = projectedSections(data, s), headers = ["seccion_id", "departamento_id", "departamento_nombre", "cue_anexo", "establecimiento_nombre", "nivel_id", "grupo_edad_id", "grupo_tasa_id", "matricula_actual", "matricula_varones_actual", "matricula_mujeres_actual", "capacidad", "matricula_base_seleccionada", "ocupacion_base_2024_pct", "demanda_potencial_2024_varones", "demanda_potencial_2024_mujeres", "demanda_potencial_proyectada_varones", "demanda_potencial_proyectada_mujeres", "factor_demanda_varones", "factor_demanda_mujeres", "factor_demanda_ponderado", "carga_equivalente_proyectada", "ocupacion_pct", "holgura_modelada", "sobreocupacion_modelada", "categoria_ocupacion"];
      downloadCSV(`chubut_ocupacion_${s.territory}_${s.year}.csv`, headers, rows.map((r) => headers.map((h) => r[h] ?? "")));
      return;
    }
    if (s.module === "demografia") {
      const rows = demographyRows(data, s), headers = ["departamento_id", "departamento_nombre", "year", "edad", "sexo_id", "poblacion"];
      downloadCSV(`chubut_demografia_${s.territory}_${s.year}.csv`, headers, rows.map((r) => [r.territorio_id, r.territorio_nombre, r.year, r.edad, r.sexo, r.poblacion]));
      return;
    }
    if (s.module === "productivos" && data.productionInstallations) {
      const rows = filteredProductionRows(data, s), headers = ["instalacion_id", "nombre_instalacion", "actividad_id", "actividad_nombre", "operador", "departamento_id", "departamento_nombre", "latitud", "longitud", "estado_id", "estado_nombre", "condicion_informacion", "anio_referencia", "capacidad_instalada_mw", "potencia_declarada_proyecto_mw", "fuente_primaria_id", "calidad_registro"];
      downloadCSV(`chubut_productivos_${s.territory}.csv`, headers, rows.map((row) => headers.map((header) => row[header] ?? "")));
    }
  }
  function renderCurrent() {
    const route = getState().module;
    renderSidebar();
    if (route === "demografia" && data.demographyPopulation) renderDemography();
    if (route === "oferta" && data.capacitySections) renderCapacity();
    if (route === "productivos" && data.productionInstallations) renderProductivos();
  }
  function scheduleRender() {
    if (renderFrame) cancelAnimationFrame(renderFrame);
    renderFrame = requestAnimationFrame(() => {
      renderFrame = null;
      renderCurrent();
    });
  }
  async function activateRoute(route) {
    const token = ++routeToken;
    if (route === "demografia" || route === "oferta") placeYearControl(route);
    $("#loading-state").hidden = false;
    $("#loading-state").querySelector("span").textContent = route === "oferta" ? "Preparando capacidad educativa\u2026" : route === "productivos" ? "Preparando inventario energ\xE9tico\u2026" : "Preparando demograf\xEDa\u2026";
    if (route === "oferta") {
      Object.assign(data, await loadDemographyData(), await loadCapacityData());
      if (!capacityControlsReady) {
        renderRateSliders();
        renderThresholdControls();
      }
      if (!Object.keys(getState().capacityRates || {}).length) setState({ capacityRates: resetRates() }, { persist: false });
    } else if (route === "demografia") Object.assign(data, await loadDemographyData());
    else if (route === "productivos") {
      Object.assign(data, await loadProductionData());
      setupProductionControls();
      setupProductiveScenarioControls();
    }
    if (token !== routeToken) return;
    $("#loading-state").hidden = true;
    syncControls(getState());
    scheduleRender();
  }
  async function init() {
    try {
      data = await loadCoreData();
      renderMetadata();
      setupControls();
      subscribe((s) => {
        syncControls(s);
        scheduleRender();
      });
      initRouter((route) => activateRoute(route));
      initFloatingPanels();
    } catch (error) {
      $("#loading-state").hidden = true;
      const p = $("#error-state");
      p.hidden = false;
      p.innerHTML = `<strong>No se pudo iniciar la V2.</strong><span>${error.message}</span>`;
      console.error(error);
    }
  }
  init();
})();
