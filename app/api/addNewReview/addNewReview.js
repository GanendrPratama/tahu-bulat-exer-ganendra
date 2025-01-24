const { addNewReview } = require('../../../backend/handler');

export default async function handler(req, res) {
    const { firstname, lastname, star, title, review } = req.body;

    try {
        await addNewReview(firstname, lastname, star, title, review);
        res.status(200).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}