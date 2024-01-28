"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toHex_1 = require("./toHex");
const tree_1 = require("./tree");
// https://en.wikipedia.org/wiki/List_of_file_signatures
let tree = {
    noOffset: null,
    offset: {},
};
const add = (typename, signature, additionalInfo, offset) => {
    if (offset) {
        const existing = tree.offset[toHex_1.toHex(offset)];
        if (!existing) {
            tree.offset[toHex_1.toHex(offset)] = tree_1.createComplexNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo);
        }
        else {
            const merged = tree_1.merge(tree_1.createNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo), { ...existing });
            tree.offset[toHex_1.toHex(offset)] = merged;
        }
    }
    else {
        if (tree.noOffset === null) {
            tree.noOffset = tree_1.createComplexNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo);
        }
        else {
            tree.noOffset = tree_1.merge(tree_1.createNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo), tree.noOffset);
        }
    }
};
add("gif", ["0x47", "0x49", "0x46", "0x38", "0x37", "0x61"], {
    mime: "image/gif",
    extension: "gif",
});
add("gif", ["0x47", "0x49", "0x46", "0x38", "0x39", "0x61"], {
    mime: "image/gif",
    extension: "gif",
});
add("jpg", ["0xFF", "0xD8", "0xFF"], {
    mime: "image/jpeg",
    extension: "jpeg",
});
add("jpg", ["0xFF", "0xD8", "0xFF", "0xDB"], {
    mime: "image/jpeg",
    extension: "jpeg",
});
add("jpg", [
    "0xFF",
    "0xD8",
    "0xFF",
    "0xE0",
    "?",
    "?",
    "0x4A",
    "0x46",
    "0x49",
    "0x46",
    "0x00",
    "0x01",
], { mime: "image/jpeg", extension: "jpeg" });
add("jpg", [
    "0xFF",
    "0xD8",
    "0xFF",
    "0xE1",
    "?",
    "?",
    "0x45",
    "0x78",
    "0x69",
    "0x66",
    "0x00",
    "0x00",
], { mime: "image/jpeg", extension: "jpeg" });
add("webp", [
    "0x52",
    "0x49",
    "0x46",
    "0x46",
    "?",
    "?",
    "?",
    "?",
    "0x57",
    "0x45",
    "0x42",
    "0x50",
], { mime: "image/webp", extension: "webp" });
add("heif", ["0x66", "0x74", "0x79", "0x70", "0x6D", "0x69", "0x66", "0x31"], { mime: "image/heif", extension: "heif" }, 4);
add("heif", ["0x66", "0x74", "0x79", "0x70", "0x68", "0x65", "0x69", "0x63"], { mime: "image/heif", extension: "heic" }, 4);
add("rpm", ["0xed", "0xab", "0xee", "0xdb"]);
add("bin", ["0x53", "0x50", "0x30", "0x31"], {
    mime: "application/octet-stream",
    extension: "bin",
});
add("pic", ["0x00"]);
add("pif", ["0x00"]);
add("sea", ["0x00"]);
add("ytr", ["0x00"]);
// 66747970
// 6D703432
add("mp4", ["0x66", "0x74", "0x79", "0x70"], { mime: "video/mp4", extension: "mp4" }, 0x4);
add("ttf", ["0x00", "0x01", "0x00", "0x00", "0x00"], {
    mime: "font/ttf",
    extension: "ttf",
});
add("otf", ["0x4F", "0x54", "0x54", "0x4F"], {
    mime: "font/otf",
    extension: "otf",
});
add("eot", ["0x50", "0x4C"], {
    mime: "application/vnd.ms-fontobject",
    extension: "eot",
});
add("woff", ["0x77", "0x4F", "0x46", "0x46"], {
    mime: "font/woff",
    extension: "woff",
});
add("woff2", ["0x77", "0x4F", "0x46", "0x32"], {
    mime: "font/woff2",
    extension: "woff2",
});
add("pdb", [
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
]);
add("dba", ["0xBE", "0xBA", "0xFE", "0xCA"]);
add("dba2", ["0x00", "0x01", "0x42", "0x44"]);
add("tda", ["0x00", "0x01", "0x44", "0x54"]);
add("tda2", ["0x00", "0x01", "0x00", "0x00"]);
add("ico", ["0x00", "0x00", "0x01", "0x00"], {
    mime: "image/x-icon",
    extension: "ico",
});
add("3gp", ["0x66", "0x74", "0x79", "0x70", "0x33", "0x67"]);
add("z", ["0x1F", "0x9D"]);
add("tar.z", ["0x1F", "0xA0"]);
add("bac", [
    "0x42",
    "0x41",
    "0x43",
    "0x4B",
    "0x4D",
    "0x49",
    "0x4B",
    "0x45",
    "0x44",
    "0x49",
    "0x53",
    "0x4B",
]);
add("bz2", ["0x42", "0x5A", "0x68"], {
    mime: "application/x-bzip2",
    extension: "bz2",
});
add("tif", ["0x49", "0x49", "0x2A", "0x00"], {
    mime: "image/tiff",
    extension: "tif",
});
add("tiff", ["0x4D", "0x4D", "0x00", "0x2A"], {
    mime: "image/tiff",
    extension: "tiff",
});
add("cr2", [
    "0x49",
    "0x49",
    "0x2A",
    "0x00",
    "0x10",
    "0x00",
    "0x00",
    "0x00",
    "0x43",
    "0x52",
]);
add("cin", ["0x80", "0x2A", "0x5F", "0xD7"]);
add("cin1", ["0x52", "0x4E", "0x43", "0x01"]);
add("cin2", ["0x52", "0x4E", "0x43", "0x02"]);
add("dpx", ["0x53", "0x44", "0x50", "0x58"]);
add("dpx2", ["0x58", "0x50", "0x44", "0x53"]);
add("exr", ["0x76", "0x2F", "0x31", "0x01"]);
add("bpg", ["0x42", "0x50", "0x47", "0xFB"]);
add("ilbm", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x49",
    "0x4C",
    "0x42",
    "0x4D",
]);
add("8svx", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x38",
    "0x53",
    "0x56",
    "0x58",
]);
add("acbm", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x43",
    "0x42",
    "0x4D",
]);
add("anbm", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x4E",
    "0x42",
    "0x4D",
]);
add("anim", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x4E",
    "0x49",
    "0x4D",
]);
add("faxx", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x46",
    "0x41",
    "0x58",
    "0x58",
]);
add("ftxt", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x46",
    "0x54",
    "0x58",
    "0x54",
]);
add("smus", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x53",
    "0x4D",
    "0x55",
    "0x53",
]);
add("cmus", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x43",
    "0x4D",
    "0x55",
    "0x53",
]);
add("yuvn", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x59",
    "0x55",
    "0x56",
    "0x4E",
]);
add("iff", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x46",
    "0x41",
    "0x4E",
    "0x54",
]);
add("aiff", [
    "0x46",
    "0x4F",
    "0x52",
    "0x4D",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x49",
    "0x46",
    "0x46",
], { mime: "audio/x-aiff", extension: "aiff" });
add("idx", ["0x49", "0x4E", "0x44", "0x58"]);
add("lz", ["0x4C", "0x5A", "0x49", "0x50"]);
add("exe", ["0x4D", "0x5A"]);
add("zip", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/zip",
    extension: "zip",
});
add("zip", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/zip",
    extension: "zip",
});
add("zip", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/zip",
    extension: "zip",
});
add("jar", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/java-archive",
    extension: "jar",
});
add("jar", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/java-archive",
    extension: "jar",
});
add("jar", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/java-archive",
    extension: "jar",
});
add("odt", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.oasis.opendocument.text",
    extension: "odt",
});
add("odt", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.oasis.opendocument.text",
    extension: "odt",
});
add("odt", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.oasis.opendocument.text",
    extension: "odt",
});
add("ods", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.oasis.opendocument.spreadsheet",
    extension: "ods",
});
add("ods", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.oasis.opendocument.spreadsheet",
    extension: "ods",
});
add("ods", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.oasis.opendocument.spreadsheet",
    extension: "ods",
});
add("odp", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.oasis.opendocument.presentation",
    extension: "odp",
});
add("odp", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.oasis.opendocument.presentation",
    extension: "odp",
});
add("odp", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.oasis.opendocument.presentation",
    extension: "odp",
});
add("docx", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: "docx",
});
add("docx", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: "docx",
});
add("docx", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: "docx",
});
add("xlsx", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: "xlsx",
});
add("xlsx", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: "xlsx",
});
add("xlsx", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: "xlsx",
});
add("pptx", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: "pptx",
});
add("pptx", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: "pptx",
});
add("pptx", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: "pptx",
});
add("vsdx", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.ms-visio.drawing",
    extension: "vsdx",
});
add("vsdx", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.ms-visio.drawing",
    extension: "vsdx",
});
add("vsdx", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.ms-visio.drawing",
    extension: "vsdx",
});
add("apk", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.android.package-archive",
    extension: "apk",
});
add("apk", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.android.package-archive",
    extension: "apk",
});
add("apk", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.android.package-archive",
    extension: "apk",
});
add("aar", ["0x50", "0x4B", "0x03", "0x04"], {
    mime: "application/vnd.android.package-archive",
    extension: "aar",
});
add("aar", ["0x50", "0x4B", "0x05", "0x06"], {
    mime: "application/vnd.android.package-archive",
    extension: "aar",
});
add("aar", ["0x50", "0x4B", "0x07", "0x08"], {
    mime: "application/vnd.android.package-archive",
    extension: "aar",
});
add("rar", ["0x52", "0x61", "0x72", "0x21", "0x1A", "0x07", "0x00"], {
    mime: "application/vnd.rar",
    extension: "rar",
});
add("rar", ["0x52", "0x61", "0x72", "0x21", "0x1A", "0x07", "0x01", "0x00"], {
    mime: "application/vnd.rar",
    extension: "rar",
});
add("rar", ["0x7F", "0x45", "0x4C", "0x46"], {
    mime: "application/vnd.rar",
    extension: "rar",
});
add("png", ["0x89", "0x50", "0x4E", "0x47", "0x0D", "0x0A", "0x1A", "0x0A"], {
    mime: "image/png",
    extension: "png",
});
add("apng", ["0x89", "0x50", "0x4E", "0x47", "0x0D", "0x0A", "0x1A", "0x0A"], {
    mime: "image/apng",
    extension: "apng",
});
add("class", ["0xCA", "0xFE", "0xBA", "0xBE"]);
add("class", ["0xEF", "0xBB", "0xBF"]);
add("class", ["0xFE", "0xed", "0xFA", "0xCE"], undefined, 0x1000);
add("class", ["0xFE", "0xed", "0xFA", "0xCF"], undefined, 0x1000);
add("class", ["0xCE", "0xFA", "0xed", "0xFE"]);
add("class", ["0xCF", "0xFA", "0xed", "0xFE"]);
add("class", ["0xFF", "0xFE"]);
add("class", ["0xFF", "0xFE"]);
add("class", ["0xFF", "0xFE", "0x00", "0x00"]);
add("ps", ["0x25", "0x21", "0x50", "0x53"]);
add("pdf", ["0x25", "0x50", "0x44", "0x46"], {
    mime: "application/pdf",
    extension: "pdf",
});
add("asf", [
    "0x30",
    "0x26",
    "0xB2",
    "0x75",
    "0x8E",
    "0x66",
    "0xCF",
    "0x11",
    "0xA6",
    "0xD9",
    "0x00",
    "0xAA",
    "0x00",
    "0x62",
    "0xCE",
    "0x6C",
]);
add("wma", [
    "0x30",
    "0x26",
    "0xB2",
    "0x75",
    "0x8E",
    "0x66",
    "0xCF",
    "0x11",
    "0xA6",
    "0xD9",
    "0x00",
    "0xAA",
    "0x00",
    "0x62",
    "0xCE",
    "0x6C",
]);
add("wmv", [
    "0x30",
    "0x26",
    "0xB2",
    "0x75",
    "0x8E",
    "0x66",
    "0xCF",
    "0x11",
    "0xA6",
    "0xD9",
    "0x00",
    "0xAA",
    "0x00",
    "0x62",
    "0xCE",
    "0x6C",
]);
add("deploymentimage", [
    "0x24",
    "0x53",
    "0x44",
    "0x49",
    "0x30",
    "0x30",
    "0x30",
    "0x31",
]);
// ogg video ' theora'
add("ogv", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x80",
    "0x74",
    "0x68",
    "0x65",
    "0x6F",
    "0x72",
    "0x61",
], {
    mime: "video/ogg",
    extension: "ogv",
});
// ogg video '\x01video'
add("ogm", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x01",
    "0x76",
    "0x69",
    "0x64",
    "0x65",
    "0x6F",
    "0x00",
], {
    mime: "video/ogg",
    extension: "ogm",
});
// ogg audio ' FLAC'
add("oga", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x7F",
    "0x46",
    "0x4C",
    "0x41",
    "0x43",
], {
    mime: "audio/ogg",
    extension: "oga",
});
// ogg audio 'Speex  '
add("spx", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x53",
    "0x70",
    "0x65",
    "0x65",
    "0x78",
    "0x20",
    "0x20",
], {
    mime: "audio/ogg",
    extension: "spx",
});
// ogg audio '\x01vorbis '
add("ogg", [
    "0x4F",
    "0x67",
    "0x67",
    "0x53",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "0x01",
    "0x76",
    "0x6F",
    "0x72",
    "0x62",
    "0x69",
    "0x73",
], {
    mime: "audio/ogg",
    extension: "ogg",
});
// default OGG container
add("ogx", ["0x4F", "0x67", "0x67", "0x53"], {
    mime: "application/ogg",
    extension: "ogx",
});
add("psd", ["0x38", "0x42", "0x50", "0x53"], {
    mime: "application/x-photoshop",
    extension: "psd",
});
add("clip", ["0x43", "0x53", "0x46", "0x43", "0x48", "0x55", "0x4e", "0x4b"]);
add("wav", [
    "0x52",
    "0x49",
    "0x46",
    "0x46",
    "?",
    "?",
    "?",
    "?",
    "0x57",
    "0x41",
    "0x56",
    "0x45",
], { mime: "audio/x-wav", extension: "wav" });
add("avi", [
    "0x52",
    "0x49",
    "0x46",
    "0x46",
    "?",
    "?",
    "?",
    "?",
    "0x41",
    "0x56",
    "0x49",
    "0x20",
], { mime: "video/x-msvideo", extension: "avi" });
add("mp3", ["0xFF", "0xFB"], { mime: "audio/mpeg", extension: "mp3" });
add("mp3", ["0xFF", "0xF3"], { mime: "audio/mpeg", extension: "mp3" });
add("mp3", ["0xFF", "0xF2"], { mime: "audio/mpeg", extension: "mp3" });
add("mp3", ["0x49", "0x44", "0x33"], { mime: "audio/mpeg", extension: "mp3" });
add("bmp", ["0x42", "0x4D"], { mime: "image/bmp", extension: "bmp" });
add("iso", ["0x43", "0x44", "0x30", "0x30", "0x31"]);
add("flac", ["0x66", "0x4C", "0x61", "0x43"]);
add("mid", ["0x4D", "0x54", "0x68", "0x64"], {
    mime: "audio/midi",
    extension: "mid",
});
add("midi", ["0x4D", "0x54", "0x68", "0x64"], {
    mime: "audio/midi",
    extension: "midi",
});
add("doc", ["0xD0", "0xCF", "0x11", "0xE0", "0xA1", "0xB1", "0x1A", "0xE1"], {
    mime: "application/msword",
    extension: "doc",
});
add("xls", ["0xD0", "0xCF", "0x11", "0xE0", "0xA1", "0xB1", "0x1A", "0xE1"], {
    mime: "application/vnd.ms-excel",
    extension: "xls",
});
add("ppt", ["0xD0", "0xCF", "0x11", "0xE0", "0xA1", "0xB1", "0x1A", "0xE1"], {
    mime: "application/vnd.ms-powerpoint",
    extension: "ppt",
});
add("msg", ["0xD0", "0xCF", "0x11", "0xE0", "0xA1", "0xB1", "0x1A", "0xE1"]);
add("dex", ["0x64", "0x65", "0x78", "0x0A", "0x30", "0x33", "0x35", "0x00"]);
add("vmdk", ["0x4B", "0x44", "0x4D"]);
add("crx", ["0x43", "0x72", "0x32", "0x34"]);
add("fh8", ["0x41", "0x47", "0x44", "0x33"]);
add("cwk", [
    "0x05",
    "0x07",
    "0x00",
    "0x00",
    "0x42",
    "0x4F",
    "0x42",
    "0x4F",
    "0x05",
    "0x07",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x01",
]);
add("cwk", [
    "0x06",
    "0x07",
    "0xE1",
    "0x00",
    "0x42",
    "0x4F",
    "0x42",
    "0x4F",
    "0x06",
    "0x07",
    "0xE1",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x00",
    "0x01",
]);
add("toast", ["0x45", "0x52", "0x02", "0x00", "0x00", "0x00"]);
add("toast", ["0x8B", "0x45", "0x52", "0x02", "0x00", "0x00", "0x00"]);
add("dmg", ["0x78", "0x01", "0x73", "0x0D", "0x62", "0x62", "0x60"]);
add("xar", ["0x78", "0x61", "0x72", "0x21"]);
add("dat", ["0x50", "0x4D", "0x4F", "0x43", "0x43", "0x4D", "0x4F", "0x43"]);
add("nes", ["0x4E", "0x45", "0x53", "0x1A"]);
add("tar", ["0x75", "0x73", "0x74", "0x61", "0x72", "0x00", "0x30", "0x30"], undefined, 0x101);
add("tar", ["0x75", "0x73", "0x74", "0x61", "0x72", "0x20", "0x20", "0x00"], undefined, 0x101);
add("tox", ["0x74", "0x6F", "0x78", "0x33"]);
add("mlv", ["0x4D", "0x4C", "0x56", "0x49"]);
add("windowsupdate", [
    "0x44",
    "0x43",
    "0x4D",
    "0x01",
    "0x50",
    "0x41",
    "0x33",
    "0x30",
]);
add("7z", ["0x37", "0x7A", "0xBC", "0xAF", "0x27", "0x1C"], {
    mime: "application/x-7z-compressed",
    extension: "7z",
});
add("gz", ["0x1F", "0x8B"], { mime: "application/gzip", extension: "gz" });
add("tar.gz", ["0x1F", "0x8B"], {
    mime: "application/gzip",
    extension: "tar.gz",
});
add("xz", ["0xFD", "0x37", "0x7A", "0x58", "0x5A", "0x00", "0x00"], {
    mime: "application/gzip",
    extension: "xz",
});
add("tar.xz", ["0xFD", "0x37", "0x7A", "0x58", "0x5A", "0x00", "0x00"], {
    mime: "application/gzip",
    extension: "tar.xz",
});
add("lz2", ["0x04", "0x22", "0x4D", "0x18"]);
add("cab", ["0x4D", "0x53", "0x43", "0x46"]);
add("mkv", ["0x1A", "0x45", "0xDF", "0xA3"], {
    mime: "video/x-matroska",
    extension: "mkv",
});
add("mka", ["0x1A", "0x45", "0xDF", "0xA3"], {
    mime: "audio/x-matroska",
    extension: "mka",
});
add("mks", ["0x1A", "0x45", "0xDF", "0xA3"], {
    mime: "video/x-matroska",
    extension: "mks",
});
add("mk3d", ["0x1A", "0x45", "0xDF", "0xA3"]);
add("webm", ["0x1A", "0x45", "0xDF", "0xA3"], {
    mime: "audio/webm",
    extension: "webm",
});
add("dcm", ["0x44", "0x49", "0x43", "0x4D"], undefined, 0x80);
add("xml", ["0x3C", "0x3f", "0x78", "0x6d", "0x6C", "0x20"], {
    mime: "application/xml",
    extension: "xml",
});
add("wasm", ["0x00", "0x61", "0x73", "0x6d"], {
    mime: "application/wasm",
    extension: "wasm",
});
add("lep", ["0xCF", "0x84", "0x01"]);
add("swf", ["0x43", "0x57", "0x53"], {
    mime: "application/x-shockwave-flash",
    extension: "swf",
});
add("swf", ["0x46", "0x57", "0x53"], {
    mime: "application/x-shockwave-flash",
    extension: "swf",
});
add("deb", ["0x21", "0x3C", "0x61", "0x72", "0x63", "0x68", "0x3E"]);
add("rtf", ["0x7B", "0x5C", "0x72", "0x74", "0x66", "0x31"], {
    mime: "application/rtf",
    extension: "rtf",
});
add("m2p", ["0x00", "0x00", "0x01", "0xBA"]);
add("vob", ["0x00", "0x00", "0x01", "0xBA"]);
add("mpg", ["0x00", "0x00", "0x01", "0xBA"], {
    mime: "video/mpeg",
    extension: "mpg",
});
add("mpeg", ["0x00", "0x00", "0x01", "0xBA"], {
    mime: "video/mpeg",
    extension: "mpeg",
});
add("mpeg", ["0x47"], { mime: "video/mpeg", extension: "mpeg" });
add("mpeg", ["0x00", "0x00", "0x01", "0xB3"], {
    mime: "video/mpeg",
    extension: "mpeg",
});
// mov 'free' TODO: find test file
add("mov", ["0x66", "0x72", "0x65", "0x65"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
// mov 'mdat'
add("mov", ["0x6D", "0x64", "0x61", "0x74"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
// mov 'moov' TODO: find test file
add("mov", ["0x6D", "0x6F", "0x6F", "0x76"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
// move 'wide' TODO: find test file
add("mov", ["0x77", "0x69", "0x64", "0x65"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
// mov 'ftypqt'
add("mov", ["0x66", "0x74", "0x79", "0x70", "0x71", "0x74"], {
    mime: "video/quicktime",
    extension: "mov",
}, 0x4);
add("hl2demo", ["0x48", "0x4C", "0x32", "0x44", "0x45", "0x4D", "0x4F"]);
add("txt", ["0xEF", "0xBB", "0xBF"], {
    mime: "text/plain; charset=UTF-8",
    extension: "txt",
});
add("txt", ["0xFF", "0xFE"], {
    mime: "text/plain; charset=UTF-16LE",
    extension: "txt",
});
add("txt", ["0xFE", "0xFF"], {
    mime: "text/plain; charset=UTF-16BE",
    extension: "txt",
});
add("txt", ["0xFF", "0xFE", "0x00", "0x00"], {
    mime: "text/plain; charset=UTF-32LE",
    extension: "txt",
});
add("txt", ["0x00", "0x00", "0xFE", "0xFF"], {
    mime: "text/plain; charset=UTF-32BE",
    extension: "txt",
});
add("SubRip", ["0x31", "0x0D", "0x0A", "0x30", "0x30", "0x3A"], {
    mime: "application/x-subrip",
    extension: "srt",
});
add("WebVTT", [
    "0xEF",
    "0xBB",
    "0xBF",
    "0x57",
    "0x45",
    "0x42",
    "0x56",
    "0x54",
    "0x54",
    "0x0A",
], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", [
    "0xEF",
    "0xBB",
    "0xBF",
    "0x57",
    "0x45",
    "0x42",
    "0x56",
    "0x54",
    "0x54",
    "0x0D",
], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", [
    "0xEF",
    "0xBB",
    "0xBF",
    "0x57",
    "0x45",
    "0x42",
    "0x56",
    "0x54",
    "0x54",
    "0x20",
], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", [
    "0xEF",
    "0xBB",
    "0xBF",
    "0x57",
    "0x45",
    "0x42",
    "0x56",
    "0x54",
    "0x54",
    "0x09",
], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", ["0x57", "0x45", "0x42", "0x56", "0x54", "0x54", "0x0A"], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", ["0x57", "0x45", "0x42", "0x56", "0x54", "0x54", "0x0D"], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", ["0x57", "0x45", "0x42", "0x56", "0x54", "0x54", "0x20"], {
    mime: "text/vtt",
    extension: "vtt",
});
add("WebVTT", ["0x57", "0x45", "0x42", "0x56", "0x54", "0x54", "0x09"], {
    mime: "text/vtt",
    extension: "vtt",
});
add("Json", ["0x7B"], {
    mime: "application/json",
    extension: ".json",
});
add("Json", ["0x5B"], {
    mime: "application/json",
    extension: ".json",
});
add("ELF", ["0x7F", "0x45", "0x4C", "0x46"], {
    mime: "application/x-executable",
    extension: ".elf",
});
add("Mach-O", ["0xFE", "0xED", "0xFA", "0xC"], {
    mime: "application/x-mach-binary",
    extension: ".o",
});
add("Mach-O", ["0xFE", "0xED", "0xFA", "0xCF"], {
    mime: "application/x-executable",
    extension: "elf",
});
add("EML", ["0x52", "0x65", "0x63", "0x65", "0x69", "0x76", "0x65", "0x64", "0x3A"], {
    mime: "message/rfc822",
    extension: ".eml",
});
exports.default = () => tree;
