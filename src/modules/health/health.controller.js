import { asyncHandler } from '../../shared/utils/asyncHandler.js';

export class HealthController {
  constructor(healthService) {
    this.healthService = healthService;
  }

  getHealth = asyncHandler(async (req, res) => {
    const includeDetail = req.query.detail === 'true';
    const data = this.healthService.checkHealth({ includeDetail });

    res.status(200).json({
      success: true,
      data,
    });
  });
}
