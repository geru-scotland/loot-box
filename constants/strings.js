/**
 * ==========================================
 * Home
 * ==========================================
 */
const homepage = {
    TITLE: 'Loot Box',
    HEADER: "LOOT BOX",
    DESCRIPTION: 'Welcome to a simple RNG loot box simulator.',
    LOGIN: 'Login',
    REGISTER: 'Register',
};

/**
 * ==========================================
 * Dashboard & Loot Box
 * ==========================================
 */
const dashboard = {
    TITLE: 'Dashboard',
    HEADER: 'LOOT BOX!',
    LOGOUT: 'Logout',
    ADMIN_PANEL: 'Admin',
    WELCOME_USER: '{username}, praise RNGesus!',
    INVENTORY_TITLE: 'Inventory',
    ACCEPT_BUTTON: 'Accept!',
};


/**
 * ==========================================
 * Login & Register
 * ==========================================
 */
const auth = {
    // Login
    LOGIN_TITLE: 'Login page',
    LOGIN_HEADER: 'LOGIN',
    BUTTON_LOGIN: 'Login',
    LOGIN_PLH_UNAME: 'Enter username',
    LOGIN_PLH_PASS: 'Enter password',
    NEW_ACCOUNT: 'Don\'t have an account? Register here.',
    // Register
    REGISTER_TITLE: 'Register page',
    REGISTER_HEADER: 'REGISTER',
    BUTTON_REGISTER: 'Register',
    REG_PLH_UNAME: 'Your epic username',
    REG_PLH_EMAIL: 'Enter your email',
    REG_PLH_PASS: 'Enter a password',
    ALREADY_ACCOUNT: 'Already have an account? Login here.'
}

/**
 * ==========================================
 * Admin - add item
 * ==========================================
 */
const admin = {
    TITLE: 'Admin Panel',
    HEADER: 'Add New Item',
    ITEM_NAME_LABEL: 'Item Name',
    ITEM_TYPE_LABEL: 'Item Type',
    ITEM_DESCRIPTION_LABEL: 'Description',
    ITEM_QUALITY_LABEL: 'Quality',
    SUBMIT_BUTTON: 'Add Item',
};


module.exports = { homepage, dashboard, admin, auth }