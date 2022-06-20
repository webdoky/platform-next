import fetch from 'node-fetch';

const headers = { 'Content-Type': 'application/json' };
const contentServer = 'http://localhost:3010';

export const fetchAllPages = async (fields: string[]) => {
  const res = await fetch(
    `${contentServer}/getAll?fields=${fields.join(',')}`,
    {
      headers,
    }
  );

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
};

export const fetchAllSamples = async () => {
  const res = await fetch(`${contentServer}/getAllSamples`, {
    headers,
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
};
