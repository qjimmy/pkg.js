import { NextApiRequest, NextApiResponse } from 'next';
import { PackageService } from 'src/services/pkg.service';
import type { SearchResponse } from 'src/types/entities';

const pkgService = PackageService.getInstance();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, size, from } = req.query as { [key: string]: string };

  try {
    const response: SearchResponse = await pkgService.search({
      text,
      size,
      from,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}
