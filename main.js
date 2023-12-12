'use strict'
const {BigQuery} = require('@google-cloud/bigquery')
const {CLOUD_RUN_TASK_INDEX = 0} = process.env

const projectId = "<PROJECT_ID>"
const client = new BigQuery()

const main = async () => {
    const query = `SELECT shop_id FROM ${projectId}.demo.shops WHERE shop_index = ${CLOUD_RUN_TASK_INDEX}`
    const data = await client.query(query)
    const rows = data[0]
    const shopId = rows[0]['shop_id']
    const values = [1, 2, 3, 4, 5].map((v) => `(${shopId}, ${v})`)
    const insertQuery = `INSERT INTO ${projectId}.demo.records (shop_id, value) VALUES ${values.join(',')};`
    await client.query(insertQuery)
}
main().catch(err => {
    console.error(err)
    process.exit(1)
})