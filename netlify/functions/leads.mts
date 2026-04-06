import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { gmail, businessName, businessType, phoneNumber } = await req.json();

  const scriptUrl = Netlify.env.get("GOOGLE_APPS_SCRIPT_URL");

  if (!scriptUrl) {
    console.warn("GOOGLE_APPS_SCRIPT_URL is not set. Lead not sent to spreadsheet.");
    return Response.json({ status: "ok", message: "Lead received but spreadsheet not connected" });
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
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return Response.json({ status: "ok" });
    } else {
      return Response.json({ error: "Failed to send lead to spreadsheet" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error sending lead:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/leads",
  method: "POST",
};
