const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const artifact = require('@actions/artifact');

async function run() {
    try {
	console.log(process.cwd());
	const repoName = core.getInput('repo');
	console.log(`Hello ${repoName}!`);
	const refName = core.getInput('ref');
	console.log(`Hello ${refName}!`);
	await exec.exec(`git clone -v -b ${refName} --single-branch --recurse-submodules https://github.com/${repoName}.git spirv-headers`);
	process.chdir("spirv-headers");
	console.log(process.cwd());
	await exec.exec(`gbp buildpackage --git-verbose --git-force-create --git-upstream-tree="branch" --git-ignore-branch --git-upstream-branch="${refName}" --no-sign`);
	await exec.exec("ls -l ..");
	const artifactClient = artifact.create()
	const artifactName = 'focal-spirv-headers-package'
	const files = [
	    '../spirv-headers_1.6.1+1.3.243.0~rc1-1lunarg20.04-1_all.deb',
	]
	const rootDirectory = '.'
	const options = {
	    continueOnError: true
	}

	const uploadResult = await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options)
	// Get the JSON webhook payload for the event that triggered the workflow
	const payload = JSON.stringify(github.context.payload, undefined, 2)
	console.log(`The event payload: ${payload}`);
    } catch (error) {
	core.setFailed(error.message);
    }
}
run();
