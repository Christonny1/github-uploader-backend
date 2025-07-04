require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');
const app = express();

const upload = multer({ dest: 'uploads/' });
app.use(cors());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'Christonny';
const GITHUB_REPO = 'ankirihiry-market';
const BRANCH = 'main';

app.post('/upload', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;
  const originalName = req.file.originalname;
  const timestamp = Date.now();
  const imageData = fs.readFileSync(filePath).toString('base64');

  const githubApiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/uploads/${timestamp}_${originalName}`;

  try {
    const response = await axios.put(githubApiUrl, {
      message: `Ajout automatique de ${originalName}`,
      content: imageData,
      branch: BRANCH
    }, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${BRANCH}/uploads/${timestamp}_${originalName}`;
    res.json({ url: rawUrl });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }

  fs.unlinkSync(filePath);
});

app.listen(3000, () => {
  console.log("Serveur en écoute sur http://localhost:3000");
});