import { test as base, expect as baseExpect } from '@playwright/test';

declare global {
    const test: typeof base;
    const expect: typeof baseExpect;
}

export {}; 