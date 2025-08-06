const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/teams`;

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

const show = async (teamId) => {
  try {
    const res = await fetch(`${BASE_URL}/${teamId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (teamFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function update(teamId, teamFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${teamId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const deleteTeam = async (teamId) => {
  try {
    const res = await fetch(`${BASE_URL}/${teamId}`, {
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
  deleteTeam,
  update
};