module.exports = {
    "env": {
        "browser": false,
        "node": true,
        "es6": true,
        "jest": true,
        "jasmine": true,
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
        }
    },
    "plugins": [
        "react",
        "jasmine",
    ],
    "rules": {
        "comma-dangle": [
            "warn",
            "only-multiline",
        ],
        "no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "after-used",
            }
        ],
        "no-console": [
            "error",
            {
                allow: ["warn", "error"],
            }
        ],
        "indent": [
            "warn",
            2,
        ],
        "no-redeclare": [
            "warn",
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        "quotes": [
            "error",
            "single",
        ],
        "semi": [
            "error",
            "never",
        ],
    }
}
