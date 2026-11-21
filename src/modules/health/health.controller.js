import { asyncHandler } from '../../shared/utils/asyncHandler.js';

export class HealthController {
  constructor(healthService) {
    this.healthService = healthService;
  }

  getHealth = asyncHandler(async (req, res) => {
    const data = this.healthService.checkHealth();
    res.status(200).json({
      success: true,
      data,
    });
  });
}
