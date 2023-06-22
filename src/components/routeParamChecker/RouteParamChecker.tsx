import { FC, ReactNode, memo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { AppRouting, AppRoutingParams } from 'consts';

export const RouteParamChecker: FC<{
  children: ReactNode;
  checker: (params: AppRoutingParams) => boolean;
}> = memo(({ children, checker }) => {
  const params = useParams<AppRoutingParams>();

  if (checker(params)) return <>{children}</>;

  return <Navigate to={AppRouting.NOT_FOUND} replace={true} />;
});
