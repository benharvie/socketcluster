const path = require('path');
const fs = require('fs-extra');

const sanitizeYAML = function (yamlString) {
  return yamlString.replace(/emptyDir: ?(null)?\n/g, 'emptyDir: {}\n');
};

const wd = process.cwd();

const appDir = `${__dirname}/../../app`;
const destDir = (app) => path.normalize(`${wd}/${app}`);
const clientFileSourcePath = path.normalize(
  `${destDir}/node_modules/socketcluster-client/socketcluster-client.js`,
);
const clientFileDestPath = path.normalize(
  `${destDir}/public/socketcluster-client.js`,
);

const getSCCWorkerDeploymentDefPath = function (kubernetesTargetDir) {
  return `${kubernetesTargetDir}/scc-worker-deployment.yaml`;
};

const getSCCBrokerDeploymentDefPath = function (kubernetesTargetDir) {
  return `${kubernetesTargetDir}/scc-broker-deployment.yaml`;
};

let fileExistsSync = function (filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
  } catch (err) {
    return false;
  }
  return true;
};

let parseJSONFile = function (filePath) {
  try {
    if (fileExistsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}));
    }
  } catch (e) {}

  return {};
};

module.exports = {
  sanitizeYAML,
  getSCCBrokerDeploymentDefPath,
  getSCCWorkerDeploymentDefPath,
  appDir,
  destDir,
  clientFileDestPath,
  clientFileSourcePath,
  fileExistsSync,
  parseJSONFile,
};
