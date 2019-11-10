module.exports = {
  "extends": "stylelint-config-standard",
  "plugins": ["stylelint-scss"],
  "rules": {
    "at-rule-no-unknown": [true, {"ignoreAtRules" :[
        "mixin", "extend", "content"
      ]}],
    "scss/at-rule-no-unknown": true,
    "no-descending-specificity": null,
    "rule-empty-line-before": [
      "never-multi-line", {
        "ignore": ["inside-block"]
      }
    ],
  },
}
