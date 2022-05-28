const process = require('process');

export async function get({ params }) {
  return {
    status: 200,
    body: process.env.ACPICA || "ACPICA not set"
  }
}
