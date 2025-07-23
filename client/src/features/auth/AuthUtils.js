// src/features/auth/AuthUtils.js

import { authApi } from "./authApiSlice";

// ✅ Accepts `dispatch` directly now — NOT store
import { setCredentials, logout, markAuthReady } from "./authSlice";

export const loadUserFromRefreshToken = async (dispatch) => {
  try {
    const result = await dispatch(
      authApi.endpoints.refreshToken.initiate()
    ).unwrap();

    const { accessToken, user } = result;
const role = user.role;
    if (accessToken) {
      dispatch(setCredentials({ user, accessToken, role }));
    }
  } catch (error) {
    dispatch(logout());
  } finally {
    dispatch(markAuthReady()); // ✅ Always mark done
  }
};

