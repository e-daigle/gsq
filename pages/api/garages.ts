import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/garages.json', 'utf8');
  res.status(200).json(JSON.parse(fileContents));
}
