async function addClassification(classification_name) {
  const sql = `
    INSERT INTO classification (classification_name)
    VALUES ($1)
  `
  return pool.query(sql, [classification_name])
}
