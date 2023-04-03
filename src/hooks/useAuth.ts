import authActions from 'src/redux/auth/actions';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';
import { bindActionCreators } from 'redux';

export const useAuth = () => {
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const dispatch = useDispatch();

  const actions = useMemo(
    () => bindActionCreators(authActions, dispatch),
    [dispatch],
  );

  return {
    actions,
    isLoading,
    userInfo,
  };
};
