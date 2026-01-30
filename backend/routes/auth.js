import express from 'express';
import { checkSchoolExists } from '../services/schoolService.js';

const router = express.Router();

/**
 * POST /api/auth/continue
 * Dummy OTP validation - just checks if school exists
 */
router.post('/continue', async (req, res) => {
  try {
    const { mobile } = req.body;

    // Validate mobile format
    if (!mobile || typeof mobile !== 'string' || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid mobile number. Must be exactly 10 digits.'
      });
    }

    // Check if school exists
    const isExisting = await checkSchoolExists(mobile);

    res.json({
      ok: true,
      data: {
        isExisting,
        mobile
      }
    });
  } catch (error) {
    console.error('Error in /auth/continue:', error);
    res.status(500).json({
      ok: false,
      error: 'Internal server error'
    });
  }
});

export default router;
