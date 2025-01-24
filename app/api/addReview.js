const { addNewReview } = require('../../backend/handler');

router.post('/addReview', async (req, res) => {
    try {
        const reviewData = req.body;
        const newReview = await addNewReview(reviewData);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add review' });
    }
});

module.exports = router;