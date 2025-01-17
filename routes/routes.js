const routes = {
    auth: {
        register: '/auth/register',
        login: '/auth/login',
        logout: '/auth/logout'
    },
    admin: {
        panel: '/admin/'
    },
    api: {
        items: {
            add: '/api/items',
            generate: '/api/items/generate/rng'
        },
        inventory: {
            addItem: '/api/inventory/{id}/items/{itemid}'
        }
    },
    public: {
        images: {
            icons: 'public/images/icons'
        }
    }
};

module.exports = routes;
