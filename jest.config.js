module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transformIgnorePatterns: [
      '/node_modules/(?!vue-material-design-icons|vue-spinner|epubjs)'
    ],
    moduleNameMapper: {
      '\\.css$': '<rootDir>/node_modules/jest-css-modules'
    }
}