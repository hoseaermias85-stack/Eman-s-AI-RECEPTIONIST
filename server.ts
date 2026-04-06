import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Leads
  app.post("/api/leads", async (req, res) => {
    const { gmail, businessName, businessType, phoneNumber } = req.body;
    
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (!scriptUrl) {
      console.warn("GOOGLE_APPS_SCRIPT_URL is not set. Lead not sent to spreadsheet.");
      // For now, return success so the UI doesn't break, but log it
      return res.json({ status: "ok", message: "Lead received but spreadsheet not connected" });
    }

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gmail,
          businessName,
          businessType,
          phoneNumber,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        res.json({ status: "ok" });
      } else {
        res.status(500).json({ error: "Failed to send lead to spreadsheet" });
      }
    } catch (error) {
      console.error("Error sending lead:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
