import { Request, Response } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { HealthService } from './health.service.js';

export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  getHealth = asyncHandler(async (req: Request, res: Response) => {
    const includeDetail = req.query.detail === 'true';
    const data = this.healthService.checkHealth({ includeDetail });

    res.status(200).json({
      success: true,
      data,
    });
  });
}
