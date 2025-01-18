const shared = {
    INVENTORY_CAPACITY: 20
}

const roles = {
    USER: 'user',
    ADMIN: 'admin'
}

const extensions = {
    PNG: ".png",
    JPEG: ".jpeg"
}

const quality = {
    COMMON: "common",
    RARE: "rare",
    EPIC: "epic",
    LEGENDARY: "legendary",
}

const allowedExtensions = [extensions.PNG, extensions.JPEG];
const allowedQualities = [quality.COMMON, quality.RARE, quality.EPIC, quality.LEGENDARY];

module.exports = { shared, roles, extensions, allowedExtensions, allowedQualities }