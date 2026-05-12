const BASE_URL = "http://localhost:8080/api/";

export async function postConfig<TResponse, TRequest>(
  endpoint: string,
  postData: TRequest,
): Promise<TResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(postData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok)
    throw new Error(data.message || "No se pudo enviar la información");

  return data as TResponse;
}

// Función para realizar una solicitud GET a la API
export async function getConfig<TResponse>(
  endpoint: string,
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok)
    throw new Error(data.message || "Error al obtener la información");

  return data as TResponse;
}
