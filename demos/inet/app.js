(() => {
  // portfolio-v2/demos/inet/js/config/fields.js
  var ND = "Sin informaci\xF3n";
  var fields = {
    timestamp: "Marca temporal",
    jurisdiccion: "Indique la jurisdicci\xF3n a la que pertenece",
    nombre: "1.1. \xBFPodr\xEDa indicar el nombre de dicho espacio?",
    existeConsejo: "\xBFExiste en la jurisdicci\xF3n un espacio formal de articulaci\xF3n entre educaci\xF3n, trabajo y producci\xF3n?",
    anioCreacion: "1.2. \xBFEn qu\xE9 a\xF1o fue creado el Consejo (o instancia equivalente)?",
    tieneNorma: "1.3. \xBFExiste un marco normativo que regula la creaci\xF3n y/o funcionamiento del Consejo (o instancia equivalente)?",
    tipoNorma: "1.3.1. \xBFQu\xE9 tipo de norma regula la creaci\xF3n y/o funcionamiento del Consejo (o instancia equivalente)?",
    nombreNorma: "1.3.2. \xBFPodr\xEDa indicarnos el nombre, n\xFAmero y a\xF1o de la norma?",
    estadoNorma: "1.3.3.  Indique la situaci\xF3n actual de la principal normativa que regula el Consejo en su jurisdicci\xF3n:",
    ambito: "1.4. \xBFEn qu\xE9 \xE1mbito institucional se inscribe el Consejo?",
    dependencia: "1.4.1. Especifique la dependencia, \xE1rea u organismo del cual depende directamente dentro de dicho \xE1mbito.",
    nActores: "2.1. \xBFCu\xE1ntos actores/instituciones (de diferentes \xE1mbitos y sectores de actividad) integran la estructura organizativa del Consejo (o instancia equivalente)?",
    actoresGob: "2.2. \xBFQu\xE9 actores del \xE1mbito gubernamental participan en el Consejo (o instancia equivalente)?",
    actoresEduc: "2.3. \xBFQu\xE9 actores del \xE1mbito Educativo-Cient\xEDfico participan en el Consejo (o instancia equivalente)?",
    actoresProd: "2.4. \xBFQu\xE9 actores del sector Productivo/Empresarial participan en el Consejo (o instancia equivalente)?",
    otrosActores: "2.5. \xBFExisten otros actores o \xE1mbitos participantes que no hayan sido mencionados anteriormente?",
    organizacion: "2.6. \xBFC\xF3mo est\xE1 organizado el Consejo (o instancia equivalente)?",
    instanciasTf: "2.7. \xBFExisten instancias de trabajo del Consejo (mesas, foros u otras) que se agrupen por territorio o por sector de actividad?",
    cualesInstancias: "2.7.1. \xBFCu\xE1les son dichas instancias de trabajo del Consejo?",
    equipoPerm: "2.8. \xBFCu\xE1ntas personas integran el equipo de personas permanentes del Consejo (o instancia equivalente)?",
    vinculacionLab: "2.9. \xBFCu\xE1l es la modalidad de vinculaci\xF3n laboral de las personas que integran el equipo permanente del Consejo (o instancia equivalente)?",
    categoriaResp: "2.10.  En su rol como responsable del Consejo (o instancia equivalente), \xBFcu\xE1l es su categor\xEDa ocupacional?",
    perfilResp: "2.11. \xBFQu\xE9 perfil profesional tiene la persona Responsable del Consejo (o instancia equivalente)?",
    tiempoResp: "2.12. \xBFCu\xE1nto tiempo lleva como Responsable del Consejo (o instancia equivalente)?",
    funcionesPpal: "3.1. \xBFCu\xE1les son las funciones principales que desarrolla el Consejo (o instancia equivalente)?",
    funcionesFrecuentes: "3.2. Seleccione las funciones que el Consejo (o instancia equivalente) desarrolla con mayor frecuencia.",
    frecuenciaReun: "3.3. \xBFCon qu\xE9 frecuencia se re\xFAne el Consejo (o instancia equivalente)?",
    modalidadReun: "3.3.1. \xBFC\xF3mo se desarrollan las reuniones?",
    participacion: "3.4. En el \xFAltimo a\xF1o, aproximadamente, \xBFqu\xE9 cantidad de instituciones o entidades participaron en mesas de trabajo, foros o instancias similares?",
    difusion: "3.3. \xBFEl Consejo (o instancia equivalente) realiza acciones de difusi\xF3n o comunicaci\xF3n de sus actividades y/o acuerdos?",
    web: "3.3.1.  P\xE1gina web institucional",
    boletin: "3.3.2. Bolet\xEDn, peri\xF3dico o newsletter propio",
    rrss: "3.3.3.  Redes Sociales (Facebook, Instagram, otros)",
    twitter: "3.3.4. X (Ex Twitter)",
    medios: "3.3.5. Medios de comunicaci\xF3n (prensa escrita, radial o audiovisual)",
    otrosCanales: "3.3.6. Otros medios o canales de difusi\xF3n no mencionados",
    tipoAcuerdos: "3.4. \xBFQu\xE9 tipo de acuerdos o resultados se han alcanzado en el marco del Consejo (o instancia equivalente)?",
    formalizacion: "3.5. \xBFDe qu\xE9 modo quedaron formalizados o registrados esos acuerdos o resultados?",
    acuerdosRec: "3.6. Mencione hasta tres acuerdos o resultados relevantes alcanzados recientemente por el Consejo.",
    sectorProd: "4.1. \xBFCon qu\xE9 actores del sector productivo se vincula?",
    actoresLab: "4.2. \xBFCon qu\xE9 actores laborales se vincula?",
    otrosSectores: "4.3. \xBFExisten v\xEDnculos con otros sectores?",
    cualesSectores: "4.4.1. \xBFCon cu\xE1les otros sectores se vincula?",
    tipoAcciones: "4.5. \xBFQu\xE9 tipo de acciones o actividades se desarrollan en el marco de estas articulaciones?",
    caracterizVinc: "4.6. \xBFC\xF3mo se caracterizan los v\xEDnculos que establece el Consejo (o instancia equivalente) con los actores mencionados?",
    fortalecer: "4.7.  \xBFCon qu\xE9 actores considera que ser\xEDa relevante fortalecer o desarrollar v\xEDnculos que actualmente no existen?",
    rolEtp: "5.1. \xBFQu\xE9 rol tiene el Consejo (o instancia equivalente) en relaci\xF3n con la ETP?",
    actoresPp: "5.2.  \xBFQu\xE9 actores participan, a trav\xE9s del Consejo (o instancia equivalente), en el desarrollo de las pr\xE1cticas profesionalizantes?",
    comentarios: "6.1. \xBFQuisiera agregar alg\xFAn comentario en relaci\xF3n al funcionamiento actual del Consejo (o instancia equivalente)?",
    fortalezas: "6.2. \xBFCu\xE1les considera que son las principales fortalezas en relaci\xF3n al funcionamiento actual del Consejo  (o instancia equivalente)?",
    dificultades: "6.3. \xBFCu\xE1les considera que son las principales dificultades identificadas en relaci\xF3n al funcionamiento actual del Consejo (o instancia equivalente)?",
    documentacion: "6.4 \xBFDesea compartir documentaci\xF3n relevante o de inter\xE9s sobre el Consejo?",
    archivoDoc: "Adjuntar archivo.",
    enlaceDoc: "Enlace de acceso a la documentaci\xF3n."
  };

  // portfolio-v2/demos/inet/js/utils/csv-parser.js
  function parseCSV(text) {
    const result = [];
    let row = [];
    let cell = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"' && inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(cell);
        cell = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") i += 1;
        row.push(cell);
        if (row.some((value2) => value2.trim() !== "")) result.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }
    row.push(cell);
    if (row.some((value2) => value2.trim() !== "")) result.push(row);
    return result;
  }
  function csvToObjects(text) {
    const matrix = parseCSV(text);
    const headers = matrix.shift().map((header) => header.trim());
    return matrix.map((row, index) => {
      const obj = { __index: index };
      headers.forEach((header, columnIndex) => {
        obj[header] = (row[columnIndex] || "").trim();
      });
      return obj;
    });
  }

  // portfolio-v2/demos/inet/js/utils/normalize.js
  function normalize(value2) {
    return String(value2 || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  function escapeHTML(value2) {
    return String(value2 ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }
  function formatNumber(value2) {
    return Number(value2).toLocaleString("es-AR", {
      maximumFractionDigits: 1,
      minimumFractionDigits: value2 % 1 ? 1 : 0
    });
  }
  function get(row, key) {
    const field2 = fields[key];
    const direct = row[field2];
    if (direct && direct.trim()) return direct.trim();
    const normalizedField = normalize(field2);
    const matchedHeader = Object.keys(row).find((header) => !header.startsWith("__") && normalize(header) === normalizedField);
    const fallback = matchedHeader ? row[matchedHeader] : "";
    return fallback && fallback.trim() ? fallback.trim() : ND;
  }
  function hasCleanValue(value2) {
    const clean = normalize(value2);
    return !!clean && clean !== normalize(ND);
  }
  function splitOptions(value2) {
    if (!hasCleanValue(value2)) return [];
    return String(value2).split(",").map((option) => option.trim()).filter(Boolean);
  }

  // portfolio-v2/demos/inet/js/services/data-service.js
  function parseTimestamp(value2) {
    const raw = String(value2 || "").trim();
    if (!raw) return Number.NEGATIVE_INFINITY;
    const direct = Date.parse(raw);
    if (!Number.isNaN(direct)) return direct;
    const match = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
    if (!match) return Number.NEGATIVE_INFINITY;
    const day = Number(match[1]);
    const month = Number(match[2]) - 1;
    const year = Number(match[3].length === 2 ? `20${match[3]}` : match[3]);
    const hour = Number(match[4] || 0);
    const minute = Number(match[5] || 0);
    const second = Number(match[6] || 0);
    return new Date(year, month, day, hour, minute, second).getTime();
  }
  function latestByJurisdiction(data) {
    const map = /* @__PURE__ */ new Map();
    data.forEach((row) => {
      const jurisdiction = get(row, "jurisdiccion");
      if (jurisdiction === ND) return;
      const key = normalize(jurisdiction);
      const timestamp = parseTimestamp(get(row, "timestamp"));
      const current = map.get(key);
      if (!current || timestamp > current.__ts || timestamp === current.__ts && row.__index > current.__index) {
        map.set(key, { ...row, __ts: timestamp, __jurisdictionKey: key });
      }
    });
    return [...map.values()].sort((a, b) => get(a, "jurisdiccion").localeCompare(get(b, "jurisdiccion"), "es"));
  }
  async function loadJurisdictionRows() {
    const csvText = demoCsv;
    const allRows = csvToObjects(csvText).filter((row) => get(row, "jurisdiccion") !== ND);
    return latestByJurisdiction(allRows);
  }

  // portfolio-v2/demos/inet/js/services/institutionalization-service.js
  function yes(value2) {
    const clean = normalize(value2);
    return clean.startsWith("si") || clean === "1" || clean === "verdadero" || clean === "true";
  }
  function scoreAnyValue(value2) {
    return hasCleanValue(value2) ? 1 : 0;
  }
  function scoreNormativa(value2) {
    const clean = normalize(value2);
    if (!clean || clean.includes("derogada")) return 0;
    if (clean.includes("revision") || clean.includes("actualizacion") || clean.includes("elaboracion")) return 0.5;
    if (clean === "vigente" || clean.includes("ampliada") || clean.includes("modificada") || clean.includes("reemplazada")) return 1;
    if (clean.includes("vigente") && !clean.includes("nueva normativa")) return 1;
    return 0;
  }
  function scoreEquipo(value2) {
    const clean = normalize(value2);
    return clean && clean !== "sin informacion" && !clean.includes("no se dispone de informacion") ? 1 : 0;
  }
  function scoreFrecuenciaReunion(value2) {
    const clean = normalize(value2);
    if (!clean || clean.includes("no se reune")) return 0;
    if (clean.includes("esporadica")) return 0.5;
    if (clean.includes("mensual") || clean.includes("mas frecuente") || clean.includes("bimestral") || clean.includes("trimestral")) return 1;
    return 0;
  }
  function scoreParticipacion(value2) {
    const clean = normalize(value2);
    if (!clean || clean.includes("ninguna")) return 0;
    if (clean.includes("1 a 3") || clean.includes("4 a 6")) return 0.5;
    if (clean.includes("7 a 10") || clean.includes("11 o mas")) return 1;
    return 0;
  }
  function scoreOptionCount(value2) {
    const count = splitOptions(value2).length;
    if (count === 0) return 0;
    if (count <= 2) return 0.5;
    return 1;
  }
  function parseYear(value2) {
    const match = String(value2 || "").match(/(19|20)\d{2}/);
    return match ? Number(match[0]) : null;
  }
  function scoreAntiguedad(value2) {
    const year = parseYear(value2);
    if (!year) return 0;
    const age = Math.max(0, (/* @__PURE__ */ new Date()).getFullYear() - year);
    return age <= 10 ? 0.5 : 1;
  }
  function dimensionLevel(ratio) {
    if (ratio >= 0.75) return "Consolidado";
    if (ratio >= 0.35) return "Intermedio";
    return "Incipiente";
  }
  function questionForItem(item) {
    return item.keys.map((key) => fields[key]).filter(Boolean).join(" / ");
  }
  function rawForItem(row, item) {
    return item.keys.map((key) => get(row, key)).filter(Boolean).join(" | ");
  }
  var dimensions = [
    {
      id: "D1",
      title: "Institucionalizaci\xF3n formal",
      weight: 30,
      items: [
        { id: "D1.1", label: "Antig\xFCedad institucional del Consejo", keys: ["anioCreacion"], score: (row) => scoreAntiguedad(get(row, "anioCreacion")) },
        { id: "D1.2", label: "Tiene normativa espec\xEDfica", keys: ["tieneNorma"], score: (row) => yes(get(row, "tieneNorma")) ? 1 : 0 },
        { id: "D1.3", label: "Situaci\xF3n actual de la normativa", keys: ["estadoNorma"], score: (row) => scoreNormativa(get(row, "estadoNorma")) },
        { id: "D1.4", label: "Cuenta con equipo permanente", keys: ["equipoPerm"], score: (row) => scoreEquipo(get(row, "equipoPerm")) }
      ]
    },
    {
      id: "D2",
      title: "Funcionamiento efectivo",
      weight: 30,
      items: [
        { id: "D2.1", label: "Frecuencia de reuni\xF3n del Consejo", keys: ["frecuenciaReun"], score: (row) => scoreFrecuenciaReunion(get(row, "frecuenciaReun")) },
        { id: "D2.2", label: "Instituciones participantes en el \xFAltimo a\xF1o", keys: ["participacion"], score: (row) => scoreParticipacion(get(row, "participacion")) },
        { id: "D2.3", label: "Existen mesas, foros o instancias de trabajo", keys: ["instanciasTf"], score: (row) => yes(get(row, "instanciasTf")) ? 1 : 0 }
      ]
    },
    {
      id: "D3",
      title: "Articulaci\xF3n y representatividad",
      weight: 20,
      items: [
        { id: "D3.1", label: "Participan actores educativos/cient\xEDficos", keys: ["actoresEduc"], score: (row) => scoreAnyValue(get(row, "actoresEduc")) },
        { id: "D3.2", label: "Participan actores productivos/empresariales", keys: ["actoresProd"], score: (row) => scoreAnyValue(get(row, "actoresProd")) },
        { id: "D3.3", label: "Participan otros actores o \xE1mbitos", keys: ["otrosActores"], score: (row) => scoreAnyValue(get(row, "otrosActores")) }
      ]
    },
    {
      id: "D4",
      title: "Vinculaci\xF3n con PP y ETP",
      weight: 20,
      items: [
        { id: "D4.1", label: "Cantidad de funciones desarrolladas con mayor frecuencia", keys: ["funcionesFrecuentes"], score: (row) => scoreOptionCount(get(row, "funcionesFrecuentes")) },
        { id: "D4.2", label: "Cantidad de roles en relaci\xF3n con la ETP", keys: ["rolEtp"], score: (row) => scoreOptionCount(get(row, "rolEtp")) },
        { id: "D4.3", label: "Participan actores en el desarrollo de PP", keys: ["actoresPp"], score: (row) => scoreAnyValue(get(row, "actoresPp")) }
      ]
    }
  ];
  function evaluateInstitutionalization(row) {
    const dimResults = dimensions.map((dimension) => {
      const items = dimension.items.map((item) => {
        const max = item.max || 1;
        const value2 = Number(item.score(row) || 0);
        return {
          ...item,
          max,
          value: value2,
          present: value2 > 0,
          question: questionForItem(item),
          raw: rawForItem(row, item)
        };
      });
      const totalValue = items.reduce((sum, item) => sum + item.value, 0);
      const maxValue = items.reduce((sum, item) => sum + item.max, 0);
      const ratio = maxValue ? totalValue / maxValue : 0;
      return {
        ...dimension,
        items,
        totalValue,
        maxValue,
        ratio,
        weighted: ratio * dimension.weight,
        level: dimensionLevel(ratio)
      };
    });
    const total = dimResults.reduce((sum, dimension) => sum + dimension.weighted, 0);
    const d1 = dimResults.find((dimension) => dimension.id === "D1");
    const d2 = dimResults.find((dimension) => dimension.id === "D2");
    const d1MeetsFloor = d1 && d1.level !== "Incipiente";
    const d2MeetsFloor = d2 && d2.level !== "Incipiente";
    const d1IsConsolidated = d1 && d1.level === "Consolidado";
    const d2IsConsolidated = d2 && d2.level === "Consolidado";
    const hasEveryDim = dimResults.every((dimension) => dimension.totalValue > 0);
    let level = "Incipiente";
    if (!d1MeetsFloor || !d2MeetsFloor) {
      level = "Incipiente";
    } else if (total >= 65 && hasEveryDim && d1IsConsolidated && d2IsConsolidated) {
      level = "Consolidado";
    } else if (total >= 35) {
      level = "Intermedio";
    }
    return {
      row,
      dimResults,
      total,
      level,
      hasEveryDim,
      d1MeetsFloor,
      d2MeetsFloor,
      d1IsConsolidated,
      d2IsConsolidated
    };
  }
  function evaluateRows(rows) {
    return rows.map((row) => evaluateInstitutionalization(row));
  }

  // portfolio-v2/demos/inet/js/services/geo-service.js
  function provinceName(feature) {
    return feature.properties.NAM || feature.properties.FNA || feature.properties.nombre || "";
  }
  function provinceKey(feature) {
    const key = normalize(provinceName(feature));
    if (key === "ciudad autonoma de buenos aires" || key === "ciudad de buenos aires") return "caba";
    return key;
  }
  function resultKey(row) {
    const key = row.__jurisdictionKey;
    if (key === "ciudad autonoma de buenos aires" || key === "ciudad de buenos aires") return "caba";
    return key;
  }
  function indexResultsByProvince(results) {
    const index = /* @__PURE__ */ new Map();
    results.forEach((result) => {
      index.set(resultKey(result.row), result);
    });
    return index;
  }

  // portfolio-v2/demos/inet/js/components/summary-table.js
  function levelClass(level) {
    return normalize(level);
  }
  function renderSummaryTable(container, results, selectedKey, onSelect, options = {}) {
    const order = { Consolidado: 3, Intermedio: 2, Incipiente: 1 };
    const dimensionHeaders = results[0]?.dimResults || [];
    const selectedDimension = options.selectedDimension || "global";
    const dimensionHeader = (id, title) => `<th scope="col" class="${id === selectedDimension ? "map-dimension-active" : ""}">
    <button type="button" class="dimension-map-btn" data-dimension="${escapeHTML(id)}"
      aria-pressed="${id === selectedDimension}" title="Colorear el mapa por ${escapeHTML(title)}">${escapeHTML(title)}</button>
  </th>`;
    const sorted = [...results].sort((a, b) => {
      const byLevel = order[b.level] - order[a.level];
      if (byLevel) return byLevel;
      return get(a.row, "jurisdiccion").localeCompare(get(b.row, "jurisdiccion"), "es");
    });
    container.innerHTML = `
    <div class="table-card ${options.collapsed ? "collapsed" : ""} ${!selectedKey ? "full-height" : ""}">
      <div class="table-header">
        <div>
          <span class="section-kicker">Vista general</span>
          <h2>Mapa de Institucionalizaci\xF3n</h2>
        </div>
        <div class="table-actions">
          <span class="table-count">${sorted.length} jurisdicciones</span>
          ${options.collapsed ? '<button class="small-btn" id="expandGeneral" type="button">Ver tabla</button>' : ""}
        </div>
      </div>
      <p class="table-map-hint">Seleccion\xE1 Global o una dimensi\xF3n en los encabezados para colorear el mapa.</p>
      <div class="table-scroll ${options.collapsed ? "is-hidden" : ""}">
        <table>
          <thead>
            <tr>
              <th scope="col">Jurisdicci\xF3n</th>
              ${dimensionHeader("global", "Global")}
              ${dimensionHeaders.map((dimension) => dimensionHeader(dimension.id, dimension.title)).join("")}
            </tr>
          </thead>
          <tbody>
            ${sorted.map((result) => {
      const key = resultKey(result.row);
      return `
                <tr class="${key === selectedKey ? "selected" : ""}" data-key="${escapeHTML(key)}">
                  <td>${escapeHTML(get(result.row, "jurisdiccion"))}</td>
                  <td class="${selectedDimension === "global" ? "map-dimension-active" : ""}"><span class="pill ${levelClass(result.level)}">${escapeHTML(result.level)}</span></td>
                  ${result.dimResults.map((dimension) => `
                    <td class="${selectedDimension === dimension.id ? "map-dimension-active" : ""}">
                      <span class="mini-level ${levelClass(dimension.level)}">${escapeHTML(dimension.level)}</span>
                      <span class="score-frac">${formatNumber(dimension.totalValue)} / ${formatNumber(dimension.maxValue)}</span>
                    </td>
                  `).join("")}
                </tr>`;
    }).join("")}
          </tbody>
        </table>
      </div>
    </div>`;
    const expandButton = container.querySelector("#expandGeneral");
    if (expandButton && options.onExpand) expandButton.addEventListener("click", options.onExpand);
    container.querySelectorAll("[data-dimension]").forEach((button) => {
      button.addEventListener("click", () => options.onDimensionSelect?.(button.dataset.dimension));
    });
    container.querySelectorAll("tr[data-key]").forEach((row) => {
      row.addEventListener("click", () => onSelect(row.dataset.key));
    });
  }

  // portfolio-v2/demos/inet/js/components/institutionalization-detail.js
  function levelClass2(level) {
    return normalize(level);
  }
  function levelText(result) {
    if (!result) return "";
    if (result.level === "Consolidado") return "Presenta condiciones institucionales consolidadas, con base formal y funcionamiento efectivo robustos.";
    if (result.level === "Intermedio") return "Presenta condiciones institucionales parciales o en desarrollo, con atributos relevantes pero heterog\xE9neos.";
    return "Presenta condiciones institucionales incipientes o con baja presencia de atributos relevados.";
  }
  function methodologicalNote(result) {
    if (!result) return "";
    if (!result.d1MeetsFloor || !result.d2MeetsFloor) {
      return "Se mantiene como incipiente porque D1 y D2 deben alcanzar al menos nivel intermedio para superar el piso.";
    }
    if (result.level === "Intermedio" && result.total >= 65 && result.hasEveryDim && (!result.d1IsConsolidated || !result.d2IsConsolidated)) {
      return "Se mantiene como intermedio porque para alcanzar el nivel consolidado D1 y D2 deben estar consolidadas.";
    }
    if (result.level === "Intermedio" && result.total >= 65 && !result.hasEveryDim) {
      return "Se mantiene como intermedio porque no registra al menos un atributo en cada dimensi\xF3n.";
    }
    return "";
  }
  function itemStatus(item) {
    if (item.value >= item.max) return { className: "ok", symbol: "\u2713" };
    if (item.value > 0) return { className: "partial", symbol: "\xBD" };
    return { className: "no", symbol: "\xD7" };
  }
  function renderInstitutionalizationDetail(container, result) {
    if (!result) {
      container.innerHTML = "";
      return;
    }
    const note = methodologicalNote(result);
    container.innerHTML = `
    <section class="detail-card">
      <div class="detail-hero">
        <div>
          <span class="jbadge">${escapeHTML(get(result.row, "jurisdiccion"))}</span>
          <h2>${escapeHTML(get(result.row, "nombre"))}</h2>
          <p>\xDAltima respuesta: ${escapeHTML(get(result.row, "timestamp"))}</p>
        </div>
        <div class="global-score">
          <span class="pill ${levelClass2(result.level)}">${escapeHTML(result.level)}</span>
        </div>
      </div>
      <p class="detail-note">${escapeHTML(levelText(result))}${note ? ` ${escapeHTML(note)}` : ""}</p>

      <div class="dimension-grid">
        ${result.dimResults.map((dimension) => `
          <article class="dimension-card">
            <div class="dimension-head">
              <span>${escapeHTML(dimension.id)}</span>
              <strong>${escapeHTML(dimension.title)}</strong>
              <em class="${levelClass2(dimension.level)}">${escapeHTML(dimension.level)}</em>
            </div>
            <div class="dimension-score">${formatNumber(dimension.totalValue)} / ${formatNumber(dimension.maxValue)}</div>
            <div class="question-list">
              ${dimension.items.map((item) => `
                <div class="item-card">
                  <div class="item-icon ${itemStatus(item).className}">${itemStatus(item).symbol}</div>
                  <div class="item-content">
                    <div class="item-title">${escapeHTML(item.id)} \xB7 ${escapeHTML(item.label)}</div>
                    <div class="item-question"><strong>Pregunta fuente:</strong> ${escapeHTML(item.question)}</div>
                    <div class="item-raw"><strong>Respuesta:</strong> ${escapeHTML(item.raw)}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>`;
  }

  // portfolio-v2/demos/inet/js/components/ficha-consejo.js
  function tags(value2, className = "") {
    const parts = splitOptions(value2);
    if (!parts.length) return `<span class="fv">${ND}</span>`;
    return parts.map((part) => `<span class="tag ${className}">${escapeHTML(part)}</span>`).join("");
  }
  function listFromBullets(value2) {
    if (!value2 || value2 === ND) return `<span class="fv">${ND}</span>`;
    const items = value2.split("\u2022").map((item) => item.trim()).filter(Boolean);
    if (items.length <= 1) return `<span class="fv">${escapeHTML(value2)}</span>`;
    return `<ul class="fv-list">${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
  }
  function field(label, value2, full = false) {
    return `
    <div class="field ${full ? "full" : ""}">
      <div class="fl">${escapeHTML(label)}</div>
      <div class="fv">${escapeHTML(value2 || ND)}</div>
    </div>`;
  }
  function fieldTags(label, value2, className = "", full = false) {
    return `
    <div class="field ${full ? "full" : ""}">
      <div class="fl">${escapeHTML(label)}</div>
      <div class="tags">${tags(value2, className)}</div>
    </div>`;
  }
  function fieldList(label, value2, full = false) {
    return `
    <div class="field ${full ? "full" : ""}">
      <div class="fl">${escapeHTML(label)}</div>
      ${listFromBullets(value2)}
    </div>`;
  }
  function section(id, number, title, body, one = false) {
    return `
    <article class="sec">
      <button class="sec-hdr" type="button" data-toggle="${id}" aria-controls="${id}" aria-expanded="false">
        <span class="sn">${number}</span>
        <span class="st">${escapeHTML(title)}</span>
        <span class="btn-ver">Ver detalle</span>
      </button>
      <div class="sec-body ${one ? "one" : ""}" id="${id}">
        ${body}
      </div>
    </article>`;
  }
  function documentLinks(row) {
    const archivos = get(row, "archivoDoc");
    const enlace = get(row, "enlaceDoc");
    const links = [];
    if (archivos !== ND) {
      archivos.split(",").map((url) => url.trim()).filter((url) => url.startsWith("http")).forEach((url, index) => {
        links.push(`<a class="doc-btn" href="${escapeHTML(url)}" target="_blank" rel="noopener">Documento adjunto ${index + 1}</a>`);
      });
    }
    if (enlace !== ND && enlace.startsWith("http")) {
      links.push(`<a class="doc-btn" href="${escapeHTML(enlace)}" target="_blank" rel="noopener">Enlace de documentaci\xF3n</a>`);
    }
    if (!links.length) return field("Documentaci\xF3n", "Esta jurisdicci\xF3n no presenta documentaci\xF3n", true);
    return `<div class="field full"><div class="fl">Documentaci\xF3n</div><div class="doc-links">${links.join("")}</div></div>`;
  }
  function renderFichaConsejo(container, row) {
    if (!row) {
      container.innerHTML = "";
      return;
    }
    const responsable = [
      get(row, "perfilResp"),
      get(row, "categoriaResp"),
      get(row, "tiempoResp") !== ND ? `${get(row, "tiempoResp")} en el cargo` : ""
    ].filter((value2) => value2 && value2 !== ND).join(" \xB7 ") || ND;
    container.innerHTML = `
    <section class="ficha-card">
      <button class="ficha-toggle" type="button" data-toggle="ficha-completa" aria-expanded="false">
        <span>Ficha del Consejo</span>
        <strong>Ver detalle</strong>
      </button>
      <div class="ficha-body" id="ficha-completa">
        <div class="ficha-header">
          <span class="jbadge">${escapeHTML(get(row, "jurisdiccion"))}</span>
          <h2>${escapeHTML(get(row, "nombre"))}</h2>
          <div class="ficha-meta">
            <span>A\xF1o de creaci\xF3n: ${escapeHTML(get(row, "anioCreacion"))}</span>
            <span>Estado normativo: ${escapeHTML(get(row, "estadoNorma"))}</span>
            <span>\xC1mbito: ${escapeHTML(get(row, "ambito"))}</span>
          </div>
        </div>
        ${section("s1", "1", "Composici\xF3n y representatividad", `
          ${field("Cantidad de actores en la estructura", get(row, "nActores"))}
          ${fieldTags("Actores gubernamentales", get(row, "actoresGob"), "n", true)}
          ${fieldTags("Actores educativo-cient\xEDficos", get(row, "actoresEduc"), "", true)}
          ${fieldTags("Actores productivos / empresariales", get(row, "actoresProd"), "c", true)}
          ${field("Otros actores o \xE1mbitos", get(row, "otrosActores"), true)}
        `, true)}
        ${section("s2", "2", "Estructura org\xE1nica", `
          ${field("Organizaci\xF3n interna", get(row, "organizacion"))}
          ${field("Miembros permanentes", get(row, "equipoPerm"))}
          ${field("Instancias de trabajo", get(row, "cualesInstancias"), true)}
          ${field("Responsable", responsable, true)}
        `)}
        ${section("s3", "3", "Funciones, din\xE1mica y gobernanza", `
          ${fieldList("Funciones principales", get(row, "funcionesPpal"), true)}
          ${fieldTags("Funciones m\xE1s frecuentes", get(row, "funcionesFrecuentes"), "", true)}
          ${field("Frecuencia de reuniones", get(row, "frecuenciaReun"))}
          ${field("Modalidad de reuniones", get(row, "modalidadReun"))}
        `, true)}
        ${section("s4", "4", "Comunicaci\xF3n, acuerdos y resultados", `
          ${field("Acciones de difusi\xF3n", get(row, "difusion"), true)}
          ${fieldTags("Tipo de acuerdos o resultados", get(row, "tipoAcuerdos"), "n", true)}
          ${field("Formalizaci\xF3n de acuerdos", get(row, "formalizacion"), true)}
          ${field("Acuerdos relevantes recientes", get(row, "acuerdosRec"), true)}
        `, true)}
        ${section("s5", "5", "Vinculaci\xF3n y fortalecimiento", `
          ${field("Sector productivo", get(row, "sectorProd"), true)}
          ${field("Actores laborales", get(row, "actoresLab"), true)}
          ${field("Otros sectores", get(row, "cualesSectores"), true)}
          ${field("Tipos de acciones en articulaciones", get(row, "tipoAcciones"), true)}
        `, true)}
        ${section("s6", "6", "Espec\xEDficos de la ETP", `
          ${fieldTags("Rol del Consejo en relaci\xF3n con la ETP", get(row, "rolEtp"), "c", true)}
          ${field("Participaci\xF3n en Pr\xE1cticas Profesionalizantes", get(row, "actoresPp"), true)}
        `, true)}
        ${section("s7", "7", "Desaf\xEDos y fortalezas", `
          ${field("Principales fortalezas", get(row, "fortalezas"), true)}
          ${field("Principales desaf\xEDos", get(row, "dificultades"), true)}
          ${field("Comentarios adicionales", get(row, "comentarios"), true)}
          ${documentLinks(row)}
        `, true)}
      </div>
    </section>`;
    container.querySelectorAll("[data-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.toggle;
        const body = container.querySelector(`#${id}`);
        const isOpen = body.classList.toggle("open");
        button.classList.toggle("open", isOpen);
        button.setAttribute("aria-expanded", String(isOpen));
        const label = button.querySelector(".btn-ver, strong");
        if (label) label.textContent = isOpen ? "Ocultar" : "Ver detalle";
      });
    });
  }

  // portfolio-v2/demos/inet/js/components/map-view.js
  var LEVEL_COLORS = {
    Consolidado: "#27AE60",
    Intermedio: "#C8A84B",
    Incipiente: "#C94A4A",
    SinDatos: "#D7E2EE"
  };
  var PROVINCE_ID = {
    "buenos aires": "6",
    caba: "2",
    catamarca: "10",
    cordoba: "14",
    corrientes: "18",
    chaco: "22",
    chubut: "26",
    "entre rios": "30",
    formosa: "34",
    jujuy: "38",
    "la pampa": "42",
    "la rioja": "46",
    mendoza: "50",
    misiones: "54",
    neuquen: "58",
    "rio negro": "62",
    salta: "66",
    "san juan": "70",
    "san luis": "74",
    "santa cruz": "78",
    "santa fe": "82",
    "santiago del estero": "86",
    tucuman: "90",
    "tierra del fuego": "94"
  };
  var GESTION_CONFIG = {
    Estatal: { color: "#27AE60" },
    Privado: { color: "#2980B9" },
    "Gesti\xF3n social/cooperativa": { color: "#8E44AD" }
  };
  var AMBITO_CONFIG = {
    Urbano: { color: "#E67E22" },
    Rural: { color: "#16A085" }
  };
  function selectedStyle() {
    return { color: "#0A2340", weight: 2.5, fillOpacity: 0.9 };
  }
  function mappedLevel(result, dimensionId) {
    return dimensionId === "global" ? result?.level : result?.dimResults.find((dimension) => dimension.id === dimensionId)?.level;
  }
  function featureStyle(result, isSelected, dimensionId) {
    const level = mappedLevel(result, dimensionId);
    if (!level) {
      return {
        fillColor: LEVEL_COLORS.SinDatos,
        fillOpacity: 0.22,
        color: "rgba(10,35,64,.22)",
        weight: 1
      };
    }
    return {
      fillColor: LEVEL_COLORS[level],
      fillOpacity: 0.62,
      color: LEVEL_COLORS[level],
      weight: 1.2,
      ...isSelected ? selectedStyle() : {}
    };
  }
  var MapView = class {
    constructor(elementId, onSelect, onClearSelection) {
      this.elementId = elementId;
      this.onSelect = onSelect;
      this.onClearSelection = onClearSelection;
      this.map = null;
      this.layer = null;
      this.results = [];
      this.resultIndex = /* @__PURE__ */ new Map();
      this.selectedKey = null;
      this.dimensionId = "global";
      this.schoolsData = null;
      this.schoolsLayer = null;
      this.schoolsActive = false;
      this.colorSchoolsBy = "gestion";
      this.gestionFilters = {};
      this.ambitoFilters = {};
      this.schoolsPanel = null;
      this.featureLayers = /* @__PURE__ */ new Map();
    }
    async init(results) {
      this.results = results;
      this.resultIndex = indexResultsByProvince(results);
      this.map = L.map(this.elementId, {
        zoomControl: false,
        scrollWheelZoom: true,
        dragging: true,
        attributionControl: true
      });
      L.tileLayer("https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png", {
        attribution: '\xA9 <a href="https://www.ign.gob.ar/">IGN Argentina</a>',
        tms: true,
        maxZoom: 18
      }).addTo(this.map);
      this.map.on("click", () => {
        if (this.selectedKey && this.onClearSelection) this.onClearSelection();
      });
      const geojson = demoGeography;
      this.layer = L.geoJSON(geojson, {
        style: (feature) => {
          const key = provinceKey(feature);
          return featureStyle(this.resultIndex.get(key), key === this.selectedKey, this.dimensionId);
        },
        onEachFeature: (feature, layer) => {
          const key = provinceKey(feature);
          const result = this.resultIndex.get(key);
          this.featureLayers.set(key, layer);
          layer.bindTooltip(this.tooltipContent(feature, result), {
            permanent: false,
            direction: "center",
            className: "map-tooltip"
          });
          if (result) {
            layer.on("click", (event) => {
              L.DomEvent.stopPropagation(event);
              this.onSelect(key);
            });
            layer.on("mouseover", () => {
              if (key !== this.selectedKey) layer.setStyle({ fillOpacity: 0.82, weight: 2 });
            });
            layer.on("mouseout", () => this.refreshStyles());
          }
        }
      }).addTo(this.map);
      this.map.setView([-40, -63], 4);
      this.map.setMaxBounds([[-60, -80], [-20, -50]]);
      this.map.setMinZoom(4);
      this.map.setMaxZoom(10);
    }
    select(key) {
      this.selectedKey = normalize(key);
      this.refreshStyles();
      this.zoomToSelected();
      if (this.schoolsActive) {
        this.renderSchoolsLayer();
        this.renderSchoolsPanel();
      }
    }
    clearSelection() {
      this.selectedKey = null;
      this.refreshStyles();
      if (this.map) this.map.setView([-40, -63], 4, { animate: true });
      if (this.schoolsActive) {
        this.renderSchoolsLayer();
        this.renderSchoolsPanel();
      }
    }
    refreshStyles() {
      if (!this.layer) return;
      this.layer.eachLayer((layer) => {
        const key = provinceKey(layer.feature);
        const result = this.resultIndex.get(key);
        layer.setStyle(featureStyle(result, key === this.selectedKey, this.dimensionId));
        layer.setTooltipContent(this.tooltipContent(layer.feature, result));
      });
    }
    setDimension(id) {
      this.dimensionId = id;
      this.refreshStyles();
    }
    tooltipContent(feature, result) {
      const dimension = result?.dimResults.find((item) => item.id === this.dimensionId);
      const title = this.dimensionId === "global" ? "Global" : dimension?.title || this.dimensionId;
      const level = mappedLevel(result, this.dimensionId) || "Sin datos";
      return `${escapeHTML(provinceName(feature))}<br>${escapeHTML(title)}: ${escapeHTML(level)}`;
    }
    zoomToSelected() {
      if (!this.map || !this.selectedKey) return;
      const layer = this.featureLayers.get(this.selectedKey);
      if (!layer) return;
      this.map.fitBounds(layer.getBounds(), {
        padding: [28, 28],
        maxZoom: 6,
        animate: true
      });
    }
    async toggleSchools() {
      this.schoolsActive = !this.schoolsActive;
      if (this.schoolsActive) {
        await this.ensureSchoolsData();
        this.renderSchoolsLayer();
        this.renderSchoolsPanel();
      } else {
        if (this.schoolsLayer) this.map.removeLayer(this.schoolsLayer);
        this.closeSchoolsPanel();
      }
      return this.schoolsActive;
    }
    async ensureSchoolsData() {
      if (this.schoolsData) return;
      const response = await fetch("assets/escuelas.geojson");
      this.schoolsData = await response.json();
      Object.keys(GESTION_CONFIG).forEach((key) => {
        this.gestionFilters[key] = true;
      });
      Object.keys(AMBITO_CONFIG).forEach((key) => {
        this.ambitoFilters[key] = true;
      });
      this.schoolsData.features.forEach((feature) => {
        const gestion = feature.properties.ges || "";
        const ambito = feature.properties.amg || "";
        if (gestion) this.gestionFilters[gestion] = true;
        if (ambito) this.ambitoFilters[ambito] = true;
      });
    }
    schoolsForSelectedProvince() {
      if (!this.schoolsData || !this.selectedKey) return this.schoolsData;
      const provinceId = PROVINCE_ID[this.selectedKey];
      if (!provinceId) return this.schoolsData;
      const prefix = provinceId.padStart(2, "0");
      return {
        type: "FeatureCollection",
        features: this.schoolsData.features.filter((feature) => String(feature.properties.cue || "").slice(0, 2) === prefix)
      };
    }
    renderSchoolsLayer() {
      if (!this.map || !this.schoolsData) return;
      if (this.schoolsLayer) this.map.removeLayer(this.schoolsLayer);
      const data = this.schoolsForSelectedProvince();
      this.schoolsLayer = L.geoJSON(data, {
        filter: (feature) => {
          const gestion = feature.properties.ges || "";
          const ambito = feature.properties.amg || "";
          return this.gestionFilters[gestion] !== false && this.ambitoFilters[ambito] !== false;
        },
        pointToLayer: (feature, latlng) => {
          const gestion = feature.properties.ges || "";
          const ambito = feature.properties.amg || "";
          const color = this.colorSchoolsBy === "gestion" ? (GESTION_CONFIG[gestion] || {}).color || "#999" : (AMBITO_CONFIG[ambito] || {}).color || "#999";
          return L.circleMarker(latlng, {
            radius: 2.6,
            fillColor: color,
            color: "#fff",
            weight: 0.5,
            fillOpacity: 0.88
          });
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const nombre = props.fna || "Escuela";
          const gestion = props.ges || "";
          const ambito = props.amg || "";
          const nivel = props.nen ? props.nen.replace(/;\s*$/, "").replace(/;/g, " \xB7") : "";
          layer.bindTooltip(`
          <div class="school-tooltip">
            <strong>${nombre}</strong>
            <span>${gestion}${ambito ? ` \xB7 ${ambito}` : ""}</span>
            ${nivel ? `<em>${nivel}</em>` : ""}
          </div>
        `, { className: "school-tooltip-wrap", sticky: true });
        }
      }).addTo(this.map);
    }
    renderSchoolsPanel() {
      const mapElement = document.getElementById(this.elementId);
      if (!mapElement) return;
      if (!this.schoolsPanel) {
        this.schoolsPanel = document.createElement("div");
        this.schoolsPanel.className = "schools-panel";
        mapElement.appendChild(this.schoolsPanel);
      }
      const data = this.schoolsForSelectedProvince();
      const gestionCounts = {};
      const ambitoCounts = {};
      data.features.forEach((feature) => {
        const gestion = feature.properties.ges || "Sin dato";
        const ambito = feature.properties.amg || "Sin dato";
        gestionCounts[gestion] = (gestionCounts[gestion] || 0) + 1;
        ambitoCounts[ambito] = (ambitoCounts[ambito] || 0) + 1;
      });
      this.schoolsPanel.innerHTML = `
      <div class="schools-panel-head">
        <div>
          <strong>Escuelas ETP</strong>
          <span>${this.selectedKey ? "Provincia seleccionada" : "Todo el pa\xEDs"}</span>
        </div>
        <button type="button" data-close>\xD7</button>
      </div>
      <div class="schools-panel-body">
        <span class="panel-label">Colorear por</span>
        <div class="segmented">
          <button type="button" data-color="gestion" class="${this.colorSchoolsBy === "gestion" ? "active" : ""}">Gesti\xF3n</button>
          <button type="button" data-color="ambito" class="${this.colorSchoolsBy === "ambito" ? "active" : ""}">\xC1mbito</button>
        </div>
        <span class="panel-label">Sector de gesti\xF3n</span>
        ${this.filterRows("gestion", GESTION_CONFIG, gestionCounts)}
        <span class="panel-label">\xC1mbito</span>
        ${this.filterRows("ambito", AMBITO_CONFIG, ambitoCounts)}
      </div>
    `;
      this.schoolsPanel.querySelector("[data-close]").addEventListener("click", () => {
        this.schoolsActive = false;
        if (this.schoolsLayer) this.map.removeLayer(this.schoolsLayer);
        this.closeSchoolsPanel();
        document.getElementById("schoolsLayerBtn")?.classList.remove("active");
      });
      this.schoolsPanel.querySelectorAll("[data-color]").forEach((button) => {
        button.addEventListener("click", () => {
          this.colorSchoolsBy = button.dataset.color;
          this.renderSchoolsLayer();
          this.renderSchoolsPanel();
        });
      });
      this.schoolsPanel.querySelectorAll("[data-filter]").forEach((input) => {
        input.addEventListener("change", () => {
          const target = input.dataset.filter === "gestion" ? this.gestionFilters : this.ambitoFilters;
          target[input.dataset.key] = input.checked;
          this.renderSchoolsLayer();
          this.renderSchoolsPanel();
        });
      });
    }
    filterRows(type, config, counts) {
      const filters = type === "gestion" ? this.gestionFilters : this.ambitoFilters;
      return Object.entries(config).map(([key, cfg]) => `
      <label class="filter-row">
        <input type="checkbox" data-filter="${type}" data-key="${key}" ${filters[key] !== false ? "checked" : ""}>
        <i style="background:${cfg.color}"></i>
        <span>${key}</span>
        <b>${counts[key] || 0}</b>
      </label>
    `).join("");
    }
    closeSchoolsPanel() {
      if (this.schoolsPanel) this.schoolsPanel.remove();
      this.schoolsPanel = null;
    }
  };

  // portfolio-v2/demos/inet/js/services/normative-service.js
  async function loadNormatives() {
    return [{ "Jurisdicci\xF3n": "Chubut", "Normativa": "Ejemplo ficticio de norma", "Enlace": "" }];
  }

  // portfolio-v2/demos/inet/js/components/normative-repository.js
  var COLUMNS = [
    "Jurisdicci\xF3n",
    "Tipo",
    "N\xFAmero",
    "Fecha",
    "Descripci\xF3n",
    "Sectores que lo integran",
    "Integrantes por sector",
    "Estructura organizativa",
    "Enlace"
  ];
  function value(row, key) {
    return row[key] || "";
  }
  function searchText(row) {
    return normalize(Object.keys(row).filter((key) => !key.startsWith("__")).map((key) => row[key]).join(" "));
  }
  function jurisdictionKey(value2) {
    const key = normalize(value2);
    if (key === "ciudad autonoma de buenos aires" || key === "ciudad de buenos aires") return "caba";
    return key;
  }
  function matchesJurisdiction(row, jurisdiction) {
    if (!jurisdiction) return true;
    return jurisdictionKey(value(row, "Jurisdicci\xF3n")) === jurisdictionKey(jurisdiction);
  }
  function linkCell(link) {
    const clean = link.trim();
    if (!clean) return "\u2014";
    if (!/^https?:\/\//i.test(clean)) return `<span class="missing-link" title="${escapeHTML(clean)}">Enlace no disponible</span>`;
    const safeLink = escapeHTML(clean);
    return `<a href="${safeLink}" target="_blank" rel="noopener noreferrer">Ver normativa</a>`;
  }
  function tableRows(rows) {
    return rows.map((row) => `
    <tr>
      <td data-label="Jurisdicci\xF3n">${escapeHTML(value(row, "Jurisdicci\xF3n"))}</td>
      <td data-label="Tipo">${escapeHTML(value(row, "Tipo"))}</td>
      <td data-label="N\xFAmero">${escapeHTML(value(row, "N\xFAmero"))}</td>
      <td data-label="Fecha">${escapeHTML(value(row, "Fecha"))}</td>
      <td data-label="Descripci\xF3n" class="long-text">${escapeHTML(value(row, "Descripci\xF3n"))}</td>
      <td data-label="Sectores que lo integran" class="long-text">${escapeHTML(value(row, "Sectores que lo integran"))}</td>
      <td data-label="Integrantes por sector" class="long-text">${escapeHTML(value(row, "Integrantes por sector"))}</td>
      <td data-label="Estructura organizativa" class="long-text">${escapeHTML(value(row, "Estructura organizativa"))}</td>
      <td data-label="Enlace">${linkCell(value(row, "Enlace"))}</td>
    </tr>
  `).join("");
  }
  var NormativeRepository = class {
    constructor(container) {
      this.container = container;
      this.rows = [];
      this.query = "";
      this.jurisdiction = "";
      this.status = "loading";
      this.collapsed = true;
    }
    setLoading() {
      this.status = "loading";
      this.render();
    }
    setRows(rows) {
      this.rows = rows;
      this.status = rows.length ? "ready" : "empty";
      this.render();
    }
    setError() {
      this.status = "error";
      this.render();
    }
    setJurisdiction(jurisdiction) {
      this.jurisdiction = jurisdiction || "";
      this.render();
    }
    clearJurisdictionFilter() {
      this.jurisdiction = "";
      this.render();
    }
    expand() {
      this.collapsed = false;
      this.render();
    }
    collapse() {
      this.collapsed = true;
      this.render();
    }
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.render();
    }
    filteredRows() {
      const cleanQuery = normalize(this.query);
      return this.rows.filter((row) => {
        const byJurisdiction = matchesJurisdiction(row, this.jurisdiction);
        const bySearch = !cleanQuery || searchText(row).includes(cleanQuery);
        return byJurisdiction && bySearch;
      });
    }
    renderMessage(message) {
      return `<div class="repository-message">${message}</div>`;
    }
    render() {
      const filtered = this.filteredRows();
      const hasJurisdictionFilter = Boolean(this.jurisdiction);
      this.container.innerHTML = `
      <section class="normative-repository table-card">
        <div class="table-header repository-header">
          <div>
            <span class="section-kicker">Documentaci\xF3n</span>
            <h2>Repositorio de normativas</h2>
          </div>
          <div class="repository-actions">
            <span class="table-count">${!this.collapsed && this.status === "ready" ? `Mostrando ${filtered.length} de ${this.rows.length} normativas` : ""}</span>
            <button class="small-btn" id="toggleNormativeRepository" type="button">${this.collapsed ? "Expandir" : "Contraer"}</button>
          </div>
        </div>
        <div class="repository-body ${this.collapsed ? "is-collapsed" : ""}">
          <div class="repository-controls">
            <label>
              <span>Buscar normativa</span>
              <input id="normativeSearch" type="search" value="${escapeHTML(this.query)}" placeholder="Buscar por jurisdicci\xF3n, tipo, descripci\xF3n, sectores...">
            </label>
            ${hasJurisdictionFilter ? `
              <div class="active-filter">
                <span>Filtro activo: ${escapeHTML(this.jurisdiction)}</span>
                <button class="small-btn" id="clearNormativeJurisdiction" type="button">Ver todas las jurisdicciones</button>
              </div>
            ` : ""}
          </div>
          ${this.renderBody(filtered)}
        </div>
      </section>
    `;
      const toggleButton = this.container.querySelector("#toggleNormativeRepository");
      if (toggleButton) toggleButton.addEventListener("click", () => this.toggleCollapsed());
      const input = this.container.querySelector("#normativeSearch");
      if (input) {
        input.addEventListener("input", (event) => {
          this.query = event.target.value;
          this.render();
          const nextInput = this.container.querySelector("#normativeSearch");
          if (nextInput) {
            nextInput.focus();
            nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
          }
        });
      }
      const clearButton = this.container.querySelector("#clearNormativeJurisdiction");
      if (clearButton) clearButton.addEventListener("click", () => this.clearJurisdictionFilter());
    }
    renderBody(filtered) {
      if (this.status === "loading") return this.renderMessage("Cargando repositorio de normativas...");
      if (this.status === "error") return this.renderMessage("No se pudo cargar el repositorio de normativas.");
      if (this.status === "empty") return this.renderMessage("No hay normativas disponibles para mostrar.");
      if (!filtered.length) return this.renderMessage("No se encontraron normativas para la b\xFAsqueda ingresada.");
      return `
      <div class="repository-table-wrap">
        <table>
          <thead>
            <tr>${COLUMNS.map((column) => `<th>${escapeHTML(column)}</th>`).join("")}</tr>
          </thead>
          <tbody>${tableRows(filtered)}</tbody>
        </table>
      </div>
    `;
    }
  };

  // portfolio-v2/demos/inet/js/main.js
  var status = document.querySelector("#status");
  var summaryTable = document.querySelector("#summaryTable");
  var detail = document.querySelector("#institutionalizationDetail");
  var ficha = document.querySelector("#fichaConsejo");
  var normativeRepositoryContainer = document.querySelector("#normativeRepository");
  var methodologyModal = document.querySelector("#methodologyModal");
  var methodologyBtn = document.querySelector("#methodologyBtn");
  var methodologyClose = document.querySelector("#methodologyClose");
  var pdfBtn = document.querySelector("#pdfBtn");
  var normativesBtn = document.querySelector("#normativesBtn");
  var state = {
    rows: [],
    results: [],
    selectedKey: null,
    selectedDimension: "global",
    mapView: null,
    normativeRepository: null,
    generalCollapsed: false,
    originalTitle: document.title
  };
  function setStatus(message, type = "info") {
    status.textContent = message;
    status.className = `status show ${type === "error" ? "error" : ""}`;
  }
  function hideStatus() {
    status.className = "status";
  }
  function resultByKey(key) {
    return state.results.find((result) => resultKey(result.row) === key);
  }
  function selectJurisdiction(key, options = {}) {
    if (state.selectedKey === key && options.toggle) {
      clearSelection();
      return;
    }
    const result = resultByKey(key);
    if (!result) return;
    state.selectedKey = key;
    state.generalCollapsed = true;
    state.mapView.select(key);
    document.body.classList.add("is-transitioning-selection");
    renderGeneralView();
    renderInstitutionalizationDetail(detail, result);
    renderFichaConsejo(ficha, result.row);
    state.normativeRepository?.setJurisdiction(get(result.row, "jurisdiccion"));
    pdfBtn.disabled = false;
    window.setTimeout(() => document.body.classList.remove("is-transitioning-selection"), 320);
    if (options.scrollDetail) {
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  function clearSelection() {
    state.selectedKey = null;
    state.generalCollapsed = false;
    state.mapView.clearSelection();
    document.body.classList.add("is-transitioning-selection");
    renderGeneralView();
    renderInstitutionalizationDetail(detail, null);
    renderFichaConsejo(ficha, null);
    state.normativeRepository?.setJurisdiction("");
    pdfBtn.disabled = true;
    window.setTimeout(() => document.body.classList.remove("is-transitioning-selection"), 320);
  }
  function expandFichaForPrint() {
    ficha.querySelectorAll(".ficha-body, .sec-body").forEach((element) => element.classList.add("open"));
    ficha.querySelectorAll("[data-toggle]").forEach((button) => {
      button.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      const label = button.querySelector(".btn-ver, strong");
      if (label) label.textContent = "Ocultar";
    });
  }
  function exportSelectedPDF() {
    if (!state.selectedKey) return;
    const result = resultByKey(state.selectedKey);
    const jurisdiction = result?.row?.__jurisdictionKey || state.selectedKey;
    const safeJurisdiction = jurisdiction.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
    document.title = `COPETyP_${safeJurisdiction}`;
    expandFichaForPrint();
    document.body.classList.add("print-mode");
    window.setTimeout(() => window.print(), 80);
  }
  function expandGeneralView() {
    state.generalCollapsed = false;
    renderGeneralView();
    summaryTable.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function renderGeneralView() {
    renderSummaryTable(summaryTable, state.results, state.selectedKey, (key) => selectJurisdiction(key, { scrollDetail: true }), {
      collapsed: state.generalCollapsed,
      selectedDimension: state.selectedDimension,
      onDimensionSelect: selectDimension,
      onExpand: expandGeneralView
    });
  }
  function selectDimension(id) {
    if (id !== "global" && !dimensions.some((dimension2) => dimension2.id === id)) return;
    state.selectedDimension = id;
    state.mapView.setDimension(id);
    const dimension = dimensions.find((dimension2) => dimension2.id === id);
    document.querySelector("#mapDimensionTitle").textContent = dimension ? `${dimension.id} \xB7 ${dimension.title}` : "Provincias seg\xFAn nivel global de institucionalizaci\xF3n";
    renderGeneralView();
    summaryTable.querySelector(`[data-dimension="${id}"]`)?.focus({ preventScroll: true });
  }
  function initNormativeRepository() {
    state.normativeRepository = new NormativeRepository(normativeRepositoryContainer);
    state.normativeRepository.setLoading();
    loadNormatives().then((rows) => state.normativeRepository.setRows(rows)).catch((error) => {
      console.error(error);
      state.normativeRepository.setError();
    });
  }
  function openModal() {
    methodologyModal.classList.add("open");
  }
  function closeModal() {
    methodologyModal.classList.remove("open");
  }
  async function init() {
    try {
      setStatus("Cargando datos de ejemplo...");
      state.rows = await loadJurisdictionRows();
      state.results = evaluateRows(state.rows);
      state.mapView = new MapView("map", (key) => selectJurisdiction(key, { scrollDetail: true, toggle: true }), clearSelection);
      await state.mapView.init(state.results);
      renderGeneralView();
      renderInstitutionalizationDetail(detail, null);
      initNormativeRepository();
      hideStatus();
    } catch (error) {
      console.error(error);
      setStatus(`Error al cargar la aplicaci\xF3n: ${error.message}`, "error");
    }
  }
  methodologyBtn.addEventListener("click", openModal);
  methodologyClose.addEventListener("click", closeModal);
  pdfBtn.addEventListener("click", exportSelectedPDF);
  normativesBtn.addEventListener("click", () => {
    state.normativeRepository?.expand();
    normativeRepositoryContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  window.addEventListener("afterprint", () => {
    document.body.classList.remove("print-mode");
    document.title = state.originalTitle;
  });
  methodologyModal.addEventListener("click", (event) => {
    if (event.target === methodologyModal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
  init();
})();
