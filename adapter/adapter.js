"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanityAdapter = void 0;
const queries_1 = require("./queries");
const uuid_1 = require("@sanity/uuid");
function slugify(string){
const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
const p = new RegExp(a.split('').join('|'), 'g')
return string.toString().toLowerCase()
	.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
	.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
	.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
	.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
	.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
	.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
	.replace(/đ/gi, 'd')
	.replace(/\s+/g, '-') 
	.replace(p, c => b.charAt(a.indexOf(c)))
	.replace(/&/g, '-and-')
	.replace(/[^\w\-]+/g, '')
	.replace(/\-\-+/g, '-')
	.replace(/^-+/, '')
	.replace(/-+$/, '')
}
function SanityAdapter(client, options = {
    schemas: {
        account: 'account',
        verificationToken: 'verification-token',
        user: 'user'
    }
}) {
    return {
        async createUser(profile) {
            const { emailVerified: tempEmailVerified, image, ...tempProfile } = profile;
            const { _id, emailVerified, ...user } = await client.create({
              _id: `user.${uuid_1.uuid()}`,
              _type: options.schemas.user,
              emailVerified:
                tempEmailVerified === null ? undefined : tempEmailVerified,
              slug: slugify(profile.name),
              createdAt: new Date(),
              ...tempProfile,
            });
            return {
                id: _id,
                emailVerified: tempEmailVerified,
                ...user
            };
        },
        async getUser(id) {
            const user = await client.fetch(queries_1.getUserByIdQuery, {
                userSchema: options.schemas.user,
                id
            });
            if (!user)
                return null;
            return {
                id: user._id,
                ...user
            };
        },
        async linkAccount({ provider, providerAccountId, refresh_token, access_token, expires_at, userId, type }) {
            await client.create({
                _type: options.schemas.account,
                providerId: provider,
                providerType: type,
                providerAccountId: `${providerAccountId}`,
                refreshToken: refresh_token,
                accessToken: access_token,
                accessTokenExpires: expires_at,
                user: {
                    _type: 'reference',
                    _ref: userId
                }
            });
        },
        async createSession() {
            return {};
        },
        async updateSession() {
            return {};
        },
        async deleteSession() { },
        async updateUser(user) {
            const { id, emailVerified: tempEmailVerified, ...tempUser } = user;
            const { _id, emailVerified, ...newUser } = await client
                .patch(user.id)
                .set({
                emailVerified: tempEmailVerified === null ? undefined : tempEmailVerified,
                ...tempUser
            })
                .commit();
            return {
                id: _id,
                emailVerified: tempEmailVerified,
                ...newUser
            };
        },
        async getUserByEmail(email) {
            const user = await client.fetch(queries_1.getUserByEmailQuery, {
                userSchema: options.schemas.user,
                email
            });
            if (!user)
                return null;
            return {
                id: user._id,
                ...user
            };
        },
        async getUserByAccount({ provider, providerAccountId }) {
            const account = await client.fetch(queries_1.getUserByProviderAccountIdQuery, {
                accountSchema: options.schemas.account,
                providerId: provider,
                providerAccountId
            });
            if (!account)
                return null;
            return {
                id: account.user._id,
                ...account.user
            };
        },
        async getSessionAndUser() {
            return {};
        },
        async createVerificationToken({ identifier, token, expires }) {
            const verificationToken = await client.create({
                _type: options.schemas.verificationToken,
                identifier,
                token,
                expires
            });
            return verificationToken;
        },
        async useVerificationToken({ identifier, token }) {
            const verificationToken = await client.fetch(queries_1.getVerificationTokenQuery, {
                verificationTokenSchema: options.schemas.verificationToken,
                identifier,
                token
            });
            if (!verificationToken)
                return null;
            await client.delete(verificationToken._id);
            return {
                id: verificationToken._id,
                ...verificationToken
            };
        }
    };
}
exports.SanityAdapter = SanityAdapter;
