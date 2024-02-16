/* eslint-disable */
export default {
  displayName: 'admitad-cpa',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: '../../reports/packages/admitad-cpa', outputName: 'report.xml' }],
    [
      'jest-html-reporters',
      {
        filename: 'packages-admitad-cpa.html',
        inlineSource: true,
        urlForTestFiles: '../../coverage',
        publicPath: 'reports/html',
      },
    ],
  ],
};
