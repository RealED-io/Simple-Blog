import { type AppDispatch } from '../../app/store';
import { userService, type LoginPayload, type SignupPayload } from '../../services/user';
import { setSession, clearSession, setLoading, setError } from './authSlice';

export const loginUser = (payload: LoginPayload) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const { session, user } = await userService.login(payload);
    dispatch(setSession({ session, user }));
  } catch (error: unknown) {
    if (error instanceof Error)
      dispatch(setError(error.message));
  }
};

export const signupUser = (payload: SignupPayload) => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const { session, user } = await userService.signup(payload);
    dispatch(setSession({ session, user }));
  } catch (error: unknown) {
    if (error instanceof Error)
      dispatch(setError(error.message));
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await userService.logout();
    dispatch(clearSession());
  } catch (error: unknown) {
    if (error instanceof Error)
      dispatch(setError(error.message));
  }
};
