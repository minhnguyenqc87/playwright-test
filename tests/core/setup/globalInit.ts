import { test, expect } from '@playwright/test';

// Make test and expect available globally
(global as any).test = test;
(global as any).expect = expect; 