import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'articles.json');
    
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const articles = JSON.parse(fileContents);
      
      res.status(200).json({ 
        success: true, 
        count: articles.length,
        articles: articles 
      });
    } else {
      res.status(200).json({ 
        success: true, 
        count: 0,
        articles: [] 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
