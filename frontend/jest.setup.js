import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import fetch from 'node-fetch';

// Polyfills for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.fetch = fetch;

// Polyfill for crypto.randomUUID in test environment
if (!global.crypto) {
  global.crypto = {
    randomUUID: () => Math.random().toString(36).substring(2, 15),
  };
}

// Mock environment variables
process.env.NEXT_PUBLIC_API_ENDPOINT = 'https://mock-api.example.com';
