import fetch from 'node-fetch';
import fs from 'fs';

const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;

const PARAMS = '?ids=183-31000';

async function getFigmaData() {
  if (!FIGMA_API_KEY || !FIGMA_FILE_ID) {
    throw new Error('Missing required environment variables');
  }

  const result = await fetch('https://api.figma.com/v1/files/' + FIGMA_FILE_ID + PARAMS, {
    headers: {
      'X-Figma-Token': FIGMA_API_KEY,
    },
    method: 'GET',
  });
  const figmaTreeStructure = await result.json();
  console.log(figmaTreeStructure);

  fs.writeFileSync(
    `figma-res${PARAMS.replace(/[^\w]/g, '-')}.json`,
    JSON.stringify(figmaTreeStructure, undefined, '\t')
  );
}

await getFigmaData();

export {};
