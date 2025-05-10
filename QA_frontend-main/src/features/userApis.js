import axios from "axios";
import Cookies from "universal-cookie";
const cookie = new Cookies();
// const baseUrl = "https://backendbic.onrender.com";
const baseUrl = "https://qa-backend-alsa.onrender.com";
// const baseUrl = "https://backendbic-rrrm.onrender.com";
// const baseUrl = "http://localhost:8000";

export const LoginApi = async (data) => {
  const res = await axios.post(`${baseUrl}/login`, data);
  return res;
};

export const LeadRegister = async (data) => {
  const res = await axios.post(`${baseUrl}/register`, data);
  return res;
};

export const logoutApi = async () => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export const escalationApi = async (data) => {
  let token = cookie.get("bictoken");
  const res = await axios.post(`${baseUrl}/createEscalation`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const summonUserData = async (id) => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/get-data/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const evaluationApi = async (data) => {
  let token = cookie.get("bictoken");
  const res = await axios.post(`${baseUrl}/createEvaluation`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const ppcApi = async (data) => {
  let token = cookie.get("bictoken");
  const res = await axios.post(`${baseUrl}/createppc`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchleaders = async () => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/fetchleaders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// export const fetchallusers = async () => {
//   let token = cookie.get("bictoken");
//   const res = await axios.get(`${baseUrl}/getallusers`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res;
// };

export const fetchallUsers = async () => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/getallusers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.users.map((user) => ({
    id: user.id,
    name: user.name,
    role: user.role,
    evaluationRating: user.evaluationRating,
  }));
};

export const getescalationsratingsApi = async (filter) => {
  let token = cookie.get("bictoken");

  const response = await axios.get(
    `${baseUrl}/getfilteredscalations?filter=${filter}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const evaluationfromcount = async () => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/evaluationfromcount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const fetchuserbyid = async (id) => {
  let token = cookie.get("bictoken");
  if (!token) {
    console.error("Authorization token is missing");
  } else {
    console.log("Token found");
  }
  try {
    const res = await axios.get(`${baseUrl}/fetchuserbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const retrieveReport = async (name) => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/getuserdata/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// export const createReportEscalations = async ({ startDate, endDate }) => {
//   let token = cookie.get("bictoken");
//   const res = await axios.get(
//     `${baseUrl}/getcalendarfilterdataevaluation?startDate=${startDate}&endDate=${endDate}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return res;
// };

export const createReportEscalations = async ({ startDate, endDate, agentName, teamleader }) => {
  let token = cookie.get("bictoken");
  try {
    const res = await axios.get(
      `${baseUrl}/getcalendarfilterdataescalation?startDate=${startDate}&endDate=${endDate}&agentName=${agentName}&teamleader=${teamleader}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

export const createReportEvaluations = async ({ startDate, endDate, agentName,teamleader }) => {
  let token = cookie.get("bictoken");
  try {
    const res = await axios.get(
      `${baseUrl}/getcalendarfilterdataevaluation?startDate=${startDate}&endDate=${endDate}&agentName=${agentName}&teamleader=${teamleader}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

export const createteamLeaders = async (data) => {
  let token = cookie.get("bictoken");
  const res = await axios.post(`${baseUrl}/createteamLeaders`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const leaddelete = async (id) => {
  try {
    let token = cookie.get("bictoken");

    if (!token) {
      throw new Error("No token found, please login.");
    }

    const res = await axios.delete(`${baseUrl}/leaddelete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Error in leaddelete:", error);
    return { data: { success: false, message: error.message } };
  }
};

export const deleteUserEscalation = async (id) => {
  try {
    let token = cookie.get("bictoken");

    if (!token) {
      throw new Error("No token found, please login.");
    }

    const res = await axios.delete(`${baseUrl}/deleteUserEscalation/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Error in deleteUserEscalation  :", error);
    return { data: { success: false, message: error.message } };
  }
};

export const getNotification = async () => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/notification`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getAllEvalutaions = async (payload) => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/fetch-evaluation/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getAllEscalations = async (payload) => {
  let token = cookie.get("bictoken");
  const res = await axios.get(`${baseUrl}/fetch-escalation/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
