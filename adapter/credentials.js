"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanityCredentials = exports.signUpHandler = void 0;
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const queries_1 = require("./queries");
const uuid_1 = require("@sanity/uuid");
const argon2_1 = __importDefault(require("argon2"));
const signUpHandler = (client, userSchema = 'user') => async (req, res) => {
    const isEdge = req instanceof Request;
    const body = isEdge ? await req.json() : req.body;
    const { email, password, name, image, ...userData } = body;
    const user = await client.fetch(queries_1.getUserByEmailQuery, {
        userSchema,
        email
    });
    if (user) {
        const response = { error: 'User already exist' };
        if (isEdge) {
            return new Response(JSON.stringify(response), {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 400
            });
        }
        res.json(response);
        return;
    }
    const { password: _, ...newUser } = await client.create({
        _id: `user.${uuid_1.uuid()}`,
        _type: userSchema,
        email,
        password: await argon2_1.default.hash(password),
        name,
        image,
        ...userData
    });
    if (isEdge) {
        return new Response(JSON.stringify(newUser), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200
        });
    }
    res.json({
        id: newUser._id,
        ...newUser
    });
};
exports.signUpHandler = signUpHandler;
const SanityCredentials = (client, userSchema = 'user') => credentials_1.default({
    name: 'Credentials',
    id: 'sanity-login',
    type: 'credentials',
    credentials: {
        email: {
            label: 'Email',
            type: 'text'
        },
        password: {
            label: 'Password',
            type: 'password'
        }
    },
    async authorize(credentials) {
        const response = await client.fetch(queries_1.getUserByEmailQuery, {
            userSchema,
            email: credentials === null || credentials === void 0 ? void 0 : credentials.email
        });
        if (!response)
            throw new Error('Email does not exist');
        const { _id, ...user } = response;
        if (await argon2_1.default.verify(user.password, credentials === null || credentials === void 0 ? void 0 : credentials.password)) {
            return {
                id: _id,
                ...user
            };
        }
        throw new Error('Password Invalid');
    }
});
exports.SanityCredentials = SanityCredentials;
