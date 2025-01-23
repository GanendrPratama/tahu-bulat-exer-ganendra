import { loginUsingGoogle } from '../../../backend/handler';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await loginUsingGoogle();
            res.status(200).json({ url: 'http://localhost:3000/api/auth/callback' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}