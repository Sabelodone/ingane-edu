const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const AWS = require('aws-sdk'); // Import AWS SDK
const app = express();

// Configure AWS Polly
AWS.config.update({ region: 'YOUR_AWS_REGION' }); // e.g. 'us-west-2'
const polly = new AWS.Polly();

const fetchStory = async (req, res) => {
    try {
        // Send GET request to Nal'ibali
        const response = await axios.get('https://nalibali.org/stories/read-alouds');
        
        // If the page is not found, send an error message
        if (response.status === 404) {
            return res.status(404).send('Story page not found');
        }
        
        const html = response.data;
        const $ = cheerio.load(html);

        // Extracting the story title and content (Adjust selectors based on the page structure)
        const storyTitle = $('.story-title-class').text(); // Replace with actual CSS selector
        const storyText = $('.story-text-class').text(); // Replace with actual CSS selector

        // Use Amazon Polly to generate audio
        const params = {
            OutputFormat: 'MP3',
            Text: storyText,
            VoiceId: 'Joanna', // You can choose any voice you like
            TextType: 'text'
        };

        const pollyResponse = await polly.synthesizeSpeech(params).promise();

        // Save the audio to a file or return it as a buffer
        const audioUrl = 'data:audio/mp3;base64,' + pollyResponse.AudioStream.toString('base64');

        // Send the story data as JSON
        res.json({
            title: storyTitle,
            text: storyText,
            audioPreviewUrl: audioUrl, // Use generated audio URL
            audioFullUrl: audioUrl // Use generated audio URL for full story as well
        });
    } catch (error) {
        // Catch and handle other errors (e.g., network issues)
        console.error('Error fetching the story:', error); // Log the error for debugging
        res.status(500).send('Error fetching the story: ' + error.message);
    }
};

app.get('/generate-story', fetchStory);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
