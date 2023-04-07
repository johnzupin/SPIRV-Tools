FROM ubuntu:20.04
RUN  apt-get update && \
    DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get install -y \
    wget build-essential git-buildpackage python3 debhelper npm
RUN ["/bin/sh","-c","wget -nv https://github.com/Kitware/CMake/releases/download/v3.21.4/cmake-3.21.4-linux-x86_64.tar.gz"]
RUN ["/bin/sh","-c","tar -xf cmake-3.21.4-linux-x86_64.tar.gz -C /usr/local/ --strip-components 1"]
COPY . .
RUN npm install --production
ENTRYPOINT ["node", "/index.js"]
