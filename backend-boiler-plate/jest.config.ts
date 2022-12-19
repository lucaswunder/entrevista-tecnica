export default {
    bail: 0,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['./src/**/*.ts'],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        'coverage',
        'node_modules',
        'src/container.ts',
    ],
    coverageProvider: 'v8',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    rootDir: './',
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
}
