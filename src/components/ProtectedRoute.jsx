import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { hasPermission } from '../utils/permissions';

const ProtectedRoute = ({ 
  children, 
  requiredPermissions = [], 
  requireAll = false, // true = require all permissions, false = require any permission
  fallbackPath = '/unauthorized' 
}) => {
  const { meData } = useSelector((state) => state.auth);
  
  // If no user data, redirect to login
  if (!meData) {
    return <Navigate to="/auth" replace />;
  }
  
  const userRole = meData.role;
  
  // If no permissions required, allow access
  if (requiredPermissions.length === 0) {
    return children;
  }
  
  // Check permissions
  const hasAccess = requireAll
    ? requiredPermissions.every(permission => hasPermission(userRole, permission))
    : requiredPermissions.some(permission => hasPermission(userRole, permission));
  
  if (!hasAccess) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
