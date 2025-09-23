const slugify = require("slugify");

// Config slugify: lowercase, thay khoảng trắng & ký tự đặc biệt bằng "-"
const slugOptions = { lower: true, strict: true };

// Danh sách chuẩn hóa Category & Collection
const categories = [
    "Guitars",
    "Drums",
    "Pedals",
    "Microphones",
    "Synthesizers & Pianos",
];

const collections = {
    Guitars: ["Acoustic Guitars", "Electric Guitars", "Bass Guitars"],
    Drums: ["Acoustic Drum Kits", "Electronic Drum Kits"],
    Pedals: ["Acoustic Pedals", "Electric Pedals", "Bass Pedals"],
    Microphones: ["Condenser Microphones", "Dynamic Microphones"],
    "Synthesizers & Pianos": ["Stage Pianos"],
};

// Tạo slug cho category
function getCategorySlug(category) {
    return slugify(category, slugOptions); // ví dụ "Synthesizers & Pianos" -> "synthesizers-pianos"
}

// Tạo slug cho collection
function getCollectionSlug(collection) {
    return slugify(collection, slugOptions); // ví dụ "Acoustic Drum Kits" -> "acoustic-drum-kits"
}

// Map slug → string gốc
function findCategoryBySlug(slug) {
    return categories.find(c => getCategorySlug(c) === slug) || null;
}

function findCollectionBySlug(slug) {
    for (const [cat, cols] of Object.entries(collections)) {
        const found = cols.find(c => getCollectionSlug(c) === slug);
        if (found) return found;
    }
    return null;
}

module.exports = {
    categories,
    collections,
    getCategorySlug,
    getCollectionSlug,
    findCategoryBySlug,
    findCollectionBySlug,
};
