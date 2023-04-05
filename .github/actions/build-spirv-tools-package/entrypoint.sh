#!/bin/sh -l

cd /tmp
git clone -v -b $2 --single-branch --recurse-submodules https://github.com/$1.git spirv-tools
cd spirv-tools
gbp buildpackage --git-verbose --git-force-create --git-upstream-tree="branch" --git-ignore-branch --git-upstream-branch="$2" --no-sign
cp -v ../spirv-tools*.deb $GITHUB_WORKSPACE
