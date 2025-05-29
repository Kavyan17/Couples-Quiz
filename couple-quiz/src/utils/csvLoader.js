export async function loadCSV(filePath) {
  const response = await fetch(filePath);
  const text = await response.text();
  const rows = text.trim().split("\n");
  return rows.map(row => row.trim());
}