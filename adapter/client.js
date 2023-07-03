"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const signUp = async (payload) => {
    var _a;
    const res = await fetch('/api/sanity/signUp', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
    if (!res.ok) {
        const isJson = (_a = res.headers
            .get('Content-Type')) === null || _a === void 0 ? void 0 : _a.includes('application/json');
        const data = isJson ? await res.json() : await res.text();
        throw new Error(data);
    }
    const user = await res.json();
    return user;
};
exports.signUp = signUp;
