import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {

  const {isAuthenticated, loading} = useSelector(state => state.auth)

  return (
    !loading && isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
  )

}

export default ProtectedRoute