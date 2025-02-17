import { baseAxios } from "@/utils/axios";

const login = async (credentials: { email: string; password: string }) => {
  const res = await baseAxios.post('/api/auth/login', credentials, {
    withCredentials: true,
  });

  return res.data;
};

const userProfile = async (token: string) => {
  const res = await baseAxios.get('/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export default {
  login,
  userProfile,
};
