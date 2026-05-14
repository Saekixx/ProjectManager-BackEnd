const BASE_URL = "http://localhost:8080/api/";

// Función auxiliar para obtener headers con el token
const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Función genérica para hacer peticiones GET, POST y PUT
export async function postConfig<TResponse, TRequest>(
  endpoint: string,
  postData: TRequest,
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(postData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok)
    throw new Error(data.message || "No se pudo enviar la información");

  return data as TResponse;
}

export async function getConfig<TResponse>(
  endpoint: string,
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok)
    throw new Error(data.message || "Error al obtener la información");

  return data as TResponse;
}

export async function putConfig<TResponse, TRequest>(
  endpoint: string,
  putData: TRequest,
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(putData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok)
    throw new Error(data.message || "No se pudo actualizar la información");

  return data as TResponse;
}
