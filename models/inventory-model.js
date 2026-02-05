async function getClassifications() {
  const sql = `
    SELECT DISTINCT classification_id, classification_name
    FROM classification
    ORDER BY classification_name
  `
  return pool.query(sql)
}
