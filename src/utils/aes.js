/**
 * AES 加解密工具，与后端 CipherMode.ECB + PaddingMode.PKCS7 保持一致
 * 请求体/参数加密后以 Base64 字符串传输，响应体为 Base64 密文需解密
 */
import CryptoJS from 'crypto-js';

// Webpack 通过 DefinePlugin 注入 __VITE_AES_KEY__（构建时 process.env.VITE_AES_KEY）；Vite 从 .env 注入 import.meta.env.VITE_AES_KEY
const AES_KEY =
  (typeof __VITE_AES_KEY__ !== "undefined" ? __VITE_AES_KEY__ : "") ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_AES_KEY) ||
  "";

/**
 * AES 加密，ECB 模式，PKCS7 填充，输出 Base64
 * @param {string} plainText 明文（UTF-8）
 * @param {string} [key] 密钥，不传则使用环境变量
 * @returns {string} Base64 密文
 */
export function aesEncrypt(plainText, key = AES_KEY) {
  if (!plainText || plainText === '') return '';
  if (!key) return plainText;
  const keyWA = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.AES.encrypt(plainText, keyWA, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * AES 解密，ECB 模式，PKCS7 填充，输入 Base64
 * @param {string} cipherText Base64 密文
 * @param {string} [key] 密钥，不传则使用环境变量
 * @returns {string} 明文（UTF-8）
 */
export function aesDecrypt(cipherText, key = AES_KEY) {
  if (!cipherText || cipherText === '') return '';
  if (!key) return cipherText;
  const keyWA = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.AES.decrypt(cipherText, keyWA, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/** 是否启用 AES（有配置密钥时才加解密） */
export function isAesEnabled() {
  return Boolean(AES_KEY);
}
