import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios'


dotenv.config();

const router = express.Router();



router.get('/', (req, res) => {
    res.send('Hello from DALL-E!');
});
router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;
        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/image/generation",
            headers: {
              authorization: "Bearer " + process.env.EDEN_AI_API_KEY,
            },
            data: {
              show_original_response: false,
              fallback_providers: "",
              providers: "replicate",
              text: prompt,
              resolution: "512x512",
            },
          };
          
          axios
            .request(options)
            .then((response) => {
                const results = response.data.replicate.items[0].image
                res.status(200).json({ photo: results })
            })
            .catch((error) => {
              console.error(error);
            });


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message})
    }
});

export default router;
