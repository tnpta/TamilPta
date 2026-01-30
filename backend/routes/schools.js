import express from 'express';
import { getSchoolFullData, saveSchoolData } from '../services/schoolService.js';

const router = express.Router();

/**
 * GET /api/schools/:mobile/full
 * Fetch all school data grouped by tabs
 */
router.get('/:mobile/full', async (req, res) => {
  try {
    const { mobile } = req.params;

    // Validate mobile format
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid mobile number format'
      });
    }

    const data = await getSchoolFullData(mobile);

    res.json({
      ok: true,
      data
    });
  } catch (error) {
    console.error('Error fetching school data:', error);
    res.status(500).json({
      ok: false,
      error: 'Internal server error'
    });
  }
});

/**
 * PUT /api/schools/:mobile/draft
 * Save draft (partial data allowed)
 */
router.put('/:mobile/draft', async (req, res) => {
  try {
    const { mobile } = req.params;
    const data = req.body;

    console.log('[Draft] Received request for mobile:', mobile);
    console.log('[Draft] Data keys:', Object.keys(data));
    console.log('[Draft] Has trust data?', !!data.trust);
    if (data.trust) {
      console.log('[Draft] Trust data keys:', Object.keys(data.trust));
    }

    // Validate mobile format
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid mobile number format'
      });
    }

    // Save as draft (no strict validation)
    await saveSchoolData(mobile, data, false);

    res.json({
      ok: true,
      message: 'Draft saved successfully',
      mobile
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to save draft: ' + error.message
    });
  }
});

/**
 * PUT /api/schools/:mobile/submit
 * Final submit (with validation)
 */
router.put('/:mobile/submit', async (req, res) => {
  try {
    const { mobile } = req.params;
    const data = req.body;

    console.log('[Submit] Received request for mobile:', mobile);
    console.log('[Submit] Data keys:', Object.keys(data));
    console.log('[Submit] Has trust data?', !!data.trust);
    if (data.trust) {
      console.log('[Submit] Trust data keys:', Object.keys(data.trust));
    }
    console.log('[Submit] Has infrastructure data?', !!data.infrastructure);
    if (data.infrastructure) {
      console.log('[Submit] Infrastructure keys:', Object.keys(data.infrastructure));
      console.log('[Submit] Infrastructure main exists?', !!data.infrastructure.main);
      console.log('[Submit] Infrastructure main keys:', data.infrastructure.main ? Object.keys(data.infrastructure.main) : 'N/A');
      console.log('[Submit] Infrastructure blocks length:', data.infrastructure.blocks?.length || 0);
      console.log('[Submit] Infrastructure certificates length:', data.infrastructure.certificates?.length || 0);
    }

    // Validate mobile format
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid mobile number format'
      });
    }

    // Basic validation - at least basic info should be present
    if (!data.basic || !data.basic.school_name) {
      return res.status(400).json({
        ok: false,
        error: 'Basic information (school name) is required for submission'
      });
    }

    // Save as submitted
    await saveSchoolData(mobile, data, true);

    res.json({
      ok: true,
      message: 'Form submitted successfully',
      mobile,
      status: 'SUBMITTED'
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to submit form: ' + error.message
    });
  }
});

export default router;
