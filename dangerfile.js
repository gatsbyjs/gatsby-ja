const { danger, message, warn } = require("danger")
const { TextLintEngine } = require("textlint")

const modifiedMD = danger.git.modified_files.join("- ")
message("Changed Files in this PR: \n - " + modifiedMD)

// devied from https://github.com/okitan/danger-plugin-textlint/blob/master/src/index.ts
const engine = new TextLintEngine()
const files = [...danger.git.created_files, ...danger.git.modified_files]

engine.executeOnFiles(files).then(results => {
  if (engine.isErrorResults(results)) {
    results.forEach(resultPerFile => {
      resultPerFile.messages.forEach(issue => {
        warn(
          `${issue.ruleId}: ${issue.message}`,
          resultPerFile.filePath,
          issue.line
        )
      })
    })
    console.log(engine.formatResults(results))
  }
})
