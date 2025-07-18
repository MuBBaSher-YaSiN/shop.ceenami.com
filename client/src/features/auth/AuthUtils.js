// src/features/auth/AuthUtils.js
import { setCredentials, logout } from "./authSlice";
import { authApi } from "./authApiSlice";

// ✅ Accepts `dispatch` directly now — NOT store
export const loadUserFromRefreshToken = async (dispatch) => {
  try {
    const result = await dispatch(
      authApi.endpoints.refreshToken.initiate()
    ).unwrap();

    const { accessToken, user, role } = result;
    if (accessToken) {
      dispatch(setCredentials({ user, accessToken, role }));
    }
  } catch (error) {
    dispatch(logout());
    throw error;
  }
};
