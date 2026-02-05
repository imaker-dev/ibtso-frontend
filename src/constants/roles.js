export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  DEALER: 'DEALER'
};

export const PERMISSIONS = {
  // Dashboard permissions
  VIEW_DASHBOARD: 'view_dashboard',
  
  // Client permissions
  VIEW_ALL_CLIENTS: 'view_all_clients',
  ADD_CLIENT: 'add_client',
  EDIT_CLIENT: 'edit_client',
  DELETE_CLIENT: 'delete_client',
  VIEW_OWN_CLIENT_DATA: 'view_own_client_data',
  
  // Dealer permissions
  VIEW_ALL_DEALERS: 'view_all_dealers',
  ADD_DEALER: 'add_dealer',
  EDIT_DEALER: 'edit_dealer',
  DELETE_DEALER: 'delete_dealer',
  VIEW_OWN_DEALER_DATA: 'view_own_dealer_data',
  
  // Asset permissions
  VIEW_ALL_ASSETS: 'view_all_assets',
  ADD_ASSET: 'add_asset',
  EDIT_ASSET: 'edit_asset',
  DELETE_ASSET: 'delete_asset',
  VIEW_OWN_ASSETS: 'view_own_assets',
  
  // Brand permissions
  VIEW_BRANDS: 'view_brands',
  ADD_BRAND: 'add_brand',
  EDIT_BRAND: 'edit_brand',
  DELETE_BRAND: 'delete_brand',
  
  // Download permissions
  DOWNLOAD_CLIENT_QR: 'download_client_qr',
  DOWNLOAD_DEALER_QR: 'download_dealer_qr',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    // Admin has all permissions
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ALL_CLIENTS,
    PERMISSIONS.ADD_CLIENT,
    PERMISSIONS.EDIT_CLIENT,
    PERMISSIONS.DELETE_CLIENT,
    PERMISSIONS.VIEW_ALL_DEALERS,
    PERMISSIONS.ADD_DEALER,
    PERMISSIONS.EDIT_DEALER,
    PERMISSIONS.DELETE_DEALER,
    PERMISSIONS.VIEW_ALL_ASSETS,
    PERMISSIONS.ADD_ASSET,
    PERMISSIONS.EDIT_ASSET,
    PERMISSIONS.DELETE_ASSET,
    PERMISSIONS.VIEW_BRANDS,
    PERMISSIONS.ADD_BRAND,
    PERMISSIONS.EDIT_BRAND,
    PERMISSIONS.DELETE_BRAND,
    PERMISSIONS.DOWNLOAD_CLIENT_QR,
    PERMISSIONS.DOWNLOAD_DEALER_QR,
  ],
  
  [USER_ROLES.CLIENT]: [
    // Client permissions - limited to their own data
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_OWN_CLIENT_DATA,
    PERMISSIONS.VIEW_OWN_ASSETS,
    PERMISSIONS.DOWNLOAD_CLIENT_QR,
  ],
  
  [USER_ROLES.DEALER]: [
    // Dealer permissions - limited to their own data
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_OWN_DEALER_DATA,
    PERMISSIONS.VIEW_OWN_ASSETS,
    PERMISSIONS.DOWNLOAD_DEALER_QR,
  ],
};
