import { ROLE_PERMISSIONS, USER_ROLES } from '../constants/roles';

/**
 * Check if a user has a specific permission
 * @param {string} userRole - The user's role
 * @param {string} permission - The permission to check
 * @returns {boolean} - Whether the user has the permission
 */
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

/**
 * Check if a user has any of the specified permissions
 * @param {string} userRole - The user's role
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - Whether the user has any of the permissions
 */
export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  
  return permissions.some(permission => hasPermission(userRole, permission));
};

/**
 * Check if a user has all of the specified permissions
 * @param {string} userRole - The user's role
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - Whether the user has all of the permissions
 */
export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  
  return permissions.every(permission => hasPermission(userRole, permission));
};

/**
 * Get all permissions for a user role
 * @param {string} userRole - The user's role
 * @returns {string[]} - Array of permissions
 */
export const getRolePermissions = (userRole) => {
  return ROLE_PERMISSIONS[userRole] || [];
};

/**
 * Check if user is admin
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether the user is admin
 */
export const isAdmin = (userRole) => {
  return userRole === USER_ROLES.ADMIN;
};

/**
 * Check if user is client
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether the user is client
 */
export const isClient = (userRole) => {
  return userRole === USER_ROLES.CLIENT;
};

/**
 * Check if user is dealer
 * @param {string} userRole - The user's role
 * @returns {boolean} - Whether the user is dealer
 */
export const isDealer = (userRole) => {
  return userRole === USER_ROLES.DEALER;
};
