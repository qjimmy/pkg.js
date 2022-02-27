import { NextApiRequest, NextApiResponse } from 'next';
import { PackageService } from 'src/services/pkg.service';
import type { Package, PackageDetails } from 'src/types/entities';

const pkgService = PackageService.getInstance();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { packageName } = req.query as { [key: string]: string };

  try {
    const response: PackageDetails = await pkgService.getPackage(packageName);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
}
