const KLAVIYO_BASE_URL = "https://a.klaviyo.com/api";
const KLAVIYO_REVISION = "2024-10-15";

interface KlaviyoCreateTemplateResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      editor_type: string;
      html: string;
      text: string;
      created: string;
      updated: string;
    };
  };
}

interface KlaviyoListTemplatesResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      editor_type: string;
      created: string;
      updated: string;
    };
  }[];
}

function getHeaders(apiKey: string) {
  return {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
    revision: KLAVIYO_REVISION,
  };
}

export async function pushTemplate(
  apiKey: string,
  name: string,
  html: string,
  text: string
): Promise<{ id: string; name: string }> {
  const response = await fetch(`${KLAVIYO_BASE_URL}/templates/`, {
    method: "POST",
    headers: getHeaders(apiKey),
    body: JSON.stringify({
      data: {
        type: "template",
        attributes: {
          name,
          editor_type: "CODE",
          html,
          text,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Klaviyo API error (${response.status}): ${errorBody}`);
  }

  const result = (await response.json()) as KlaviyoCreateTemplateResponse;
  return {
    id: result.data.id,
    name: result.data.attributes.name,
  };
}

export async function listTemplates(
  apiKey: string
): Promise<{ id: string; name: string; createdAt: string }[]> {
  const response = await fetch(`${KLAVIYO_BASE_URL}/templates/`, {
    method: "GET",
    headers: getHeaders(apiKey),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Klaviyo API error (${response.status}): ${errorBody}`);
  }

  const result = (await response.json()) as KlaviyoListTemplatesResponse;
  return result.data.map((t) => ({
    id: t.id,
    name: t.attributes.name,
    createdAt: t.attributes.created,
  }));
}

export async function testConnection(apiKey: string): Promise<boolean> {
  try {
    await listTemplates(apiKey);
    return true;
  } catch {
    return false;
  }
}
