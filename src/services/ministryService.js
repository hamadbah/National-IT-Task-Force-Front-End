const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/ministries`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (ministryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${ministryId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (ministryFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ministryFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function update(ministryId, ministryFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${ministryId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ministryFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const deleteMinistry = async (ministryId) => {
  try {
    const res = await fetch(`${BASE_URL}/${ministryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  deleteMinistry,
  update
};