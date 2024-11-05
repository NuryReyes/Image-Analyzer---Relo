import { PostBody } from '../stores/dataStore';

const endpoints = {
  unanalyzedImages: 'https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images',
  categories: 'https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories',
  annotations: 'https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations',
};

interface RequestData {
  endpoint: string;
  method?: 'GET' | 'POST';
  body?: object;
}

async function makeRequest(requestData: RequestData) {
  try {
    const response = await fetch(requestData.endpoint, {
      method: requestData.method,
      body: JSON.stringify(requestData.body),
    });

    if (!response.ok) throw new Error(`Request went wrong, status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getUnannotadedImages() {
  try {
    const data = await makeRequest({
      endpoint: endpoints.unanalyzedImages,
    });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getCategories() {
  try {
    const data = await makeRequest({
      endpoint: endpoints.categories,
    });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function postAnnotation(body: PostBody) {
  try {
    const data = await makeRequest({
      endpoint: endpoints.annotations,
      method: 'POST',
      body: body,
    });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function discardAnnotation(body: object) {
  try {
    const data = await makeRequest({
      endpoint: endpoints.annotations,
      method: 'POST',
      body: body,
    });

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}
