// @ts-nocheck

// https://stackoverflow.com/questions/76206795/how-to-convert-a-complex-html-table-which-includes-rowspan-and-colspan-to-json

const clean = (txt) => txt.replace(/[\u0600-\u06FF]+/gu, "").trim();

// Converts a HTML table to a matrix, duplicating data where col/rowspans occur
export function toMatrix(table: HTMLTableElement | null) {
  let cells;
  return Array.from(table.rows, (row) => {
    const buff = Array.from(row.cells, (cell) =>
      Array.from({ length: cell.getAttribute("colspan") ?? 1 }, () => ({
        data: cell.tagName == "TD",
        txt: clean(cell.textContent),
        span: +(cell.getAttribute("rowspan") ?? 1),
      }))
    ).flat();
    cells =
      cells?.map((cell) =>
        --cell.span ? cell : buff.shift() ?? { span: 1 }
      ) ?? buff;
    // First entry is an index indicating where the data begins (after qualifiers)
    return [
      cells.findIndex((cell) => cell.data),
      ...cells.map((cell) => cell.txt),
    ];
  });
}
export type IBCPNPDraw = {
  date: Date;
  drawType: string;
  stream: string;
  minScore: string;
  totalInvitations: string;
};
export function toDataObject(
  matrix: any[]
): [IBCPNPDraw[], Set<string>, Record<string, IBCPNPDraw[]>] {
  let colQualifiers = [];
  const data = [];
  const drawTypes = new Set();
  const byDrawType = {};
  for (const [dataAt, ...row] of matrix) {
    if (dataAt < 0) {
      colQualifiers = row.map((col, i) => col.trim().replaceAll(/\s+/gi, "_"));
    } else {
      if (row.length < 5) {
        console.error(`Invalid row found! ${row}`);
      }
      const cleanedRow = row.map((col, i) =>
        col.trim().replaceAll(/\s+/gi, " ")
      );
      const drawData: IBCPNPDraw = {
        date: new Date(row[0]),
        drawType: cleanedRow[1],
        stream: cleanedRow[2],
        minScore: cleanedRow[3],
        totalInvitations: cleanedRow[4],
      };
      drawTypes.add(drawData.drawType);
      if (!byDrawType[drawData.drawType]) {
        byDrawType[drawData.drawType] = [drawData];
      } else {
        byDrawType[drawData.drawType].push(drawData);
      }
      data.push(drawData);
    }
  }
  return [data.sort((a, b) => b.date - a.date), drawTypes, byDrawType];
}

// Convert matrix to the desired flat object
export function toObject(matrix: any) {
  const result = {};
  const colQualifiers = [];
  let data = false;
  for (const [dataAt, ...row] of matrix) {
    if (dataAt < 0) {
      // No data; so this is a heading with column qualifiers
      if (data) colQualifiers.length = 0;
      data = false;
      row.forEach((col, i) => (colQualifiers[i] ??= []).push(col));
    } else {
      // data
      // From column qualifiers (headers), remove those that do not have data
      if (!data) colQualifiers.splice(0, dataAt);
      data = true;
      // For sections that have no column headers, create one dummy column qualifier
      if (!colQualifiers.length) colQualifiers[0] = [];
      // Because the first section in the table has qualifiers
      //    spanning multiple columns, remove duplicates
      const rowQualifier = [...new Set(row.splice(0, dataAt))];
      colQualifiers.forEach((colQualifier, i) => {
        if (row[i])
          result[[...colQualifier, ...rowQualifier].join(" / ")] = row[i];
      });
    }
  }
  return result;
}
