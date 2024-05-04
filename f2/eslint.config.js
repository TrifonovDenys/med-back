import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            "no-console": "error",
            "no-restricted-syntax": [
                "error",
                {
                    "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
                    "message": "Unexpected property on console object was called"
                }
            ],
            "no-unused-vars": "error",
            "no-undef": "error"
        }
    }
];

