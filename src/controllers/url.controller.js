import { URL } from '../models/url.models.js'
import { nanoid } from 'nanoid'

const handleNewGenerateShortURL = async (req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "URL is required"})
    try {
        const shortID = nanoid(8);
        const entry = await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id
        })
        // return res.status(201).json({ shortID: entry.shortId, redirectURL: entry.redirectURL })

        return res.status(200).render('home', {
            id: entry.shortId
        })
    } catch (error) {
        return res.status(500).json({
            error: "Error generating short URL",
        })
    }
}

const handleVisitShortURL = async (req, res) => {
    const shortId = req.params.shortId;

    if (!shortId) {
        return res.status(400).json({ error: "ShortId is required." });
    }

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );

        if (!entry) {
            return res.status(404).json({ error: "Provided ShortId is wrong." });
        }

        if (!entry.redirectURL) {
            return res.status(500).json({ error: "Redirect URL is missing for the given ShortId." });
        }
        
        const url = `https://${entry.redirectURL}`
        return res.redirect(url);
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    if (!shortId) {
        return res.status(400).json({ error: "ShortId is required." });
    }
    try {
        const result = await URL.findOne({shortId});
        
        if (!result) {
            return res.status(404).json({ error: "Provided ShortId is wrong." });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        })
    }
}

export {
    handleNewGenerateShortURL,
    handleVisitShortURL,
    handleGetAnalytics,
}