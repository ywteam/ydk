#!/bin/bash
set -e
export PATH="${PATH}:/usr/local/go/bin"
export PATH="${PATH}:/usr/local/deno/bin"
export PATH="${PATH}:/usr/bin/python3.12"
if ! command -v add-apt-repository &> /dev/null; then
    apt-get update
    apt-get install -y software-properties-common
fi

install:dotnet() {
    if command -v dotnet &> /dev/null; then
        echo "dotnet is already installed"
        return 0
    fi
    local DOTNET_VERSION="${1:-"8.0"}"
    echo "Installing dotnet ${DOTNET_VERSION}"
    source "/etc/os-release" || true # Specify /etc/os-release as input for shellcheck
    wget "https://packages.microsoft.com/config/${ID}/${VERSION_ID}/packages-microsoft-prod.deb" -O packages-microsoft-prod.deb
    dpkg -i packages-microsoft-prod.deb
    apt-get update
    apt-get install -y "dotnet-sdk-${DOTNET_VERSION}" "aspnetcore-runtime-${DOTNET_VERSION}"
    apt-get update
    rm -f packages-microsoft-prod.deb    
    dotnet --version
    return 0
}
install:go(){
    if command -v go &> /dev/null; then
        echo "go is already installed"
        return 0
    fi
    local GO_VERSION="${1:-"1.23.0"}"    
    wget "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz"
    tar -C /usr/local -xzf "go${GO_VERSION}.linux-amd64.tar.gz"
    rm -f "go${GO_VERSION}.linux-amd64.tar.gz"    
    go version
    return 0
}
install:node(){
    if command -v node &> /dev/null; then
        echo "node is already installed"
        return 0
    fi
    local NODE_VERSION="${1:-"v20.17.0"}"
    local NVM_VERSION="${2:-"v0.40.1"}"
    curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm --version
    nvm install "${NODE_VERSION}"
    nvm use "${NODE_VERSION}"
    node --version
    npm --version
    return 0
}
install:deno(){
    if command -v deno &> /dev/null; then
        echo "deno is already installed"
        return 0
    fi
    local DENO_VERSION="${1:-"v1.46.2"}"    
    curl -fsSL https://deno.land/install.sh > deno-install.sh
    chmod +x deno-install.sh    
    ./deno-install.sh "${DENO_VERSION}"    
    deno --version
    rm -f install.sh
    unset DENO_INSTALL
    return 0
}
install:python(){
    local PYTHON_VERSION="${1:-"3.12"}"
    if command -v "python${PYTHON_VERSION}" &> /dev/null; then
        echo "python is already installed"
        return 0
    fi
    # apt install software-properties-common -y
    add-apt-repository -y ppa:deadsnakes/ppa
    apt update
    
    apt-get install -y "python${PYTHON_VERSION}"
    # curl -sS https://bootstrap.pypa.io/get-pip.py | "python${PYTHON_VERSION}"
    python --version
    # pip --version
    return 0
}
install:php(){
    if command -v php &> /dev/null; then
        echo "php is already installed"
        return 0
    fi
    add-apt-repository ppa:ondrej/php -y
    apt update
    local PHP_VERSION="${1:-"8.4"}"
    apt-get install -y "libapache2-mod-php" "php${PHP_VERSION}" "php${PHP_VERSION}-cli" "php${PHP_VERSION}-fpm" "php${PHP_VERSION}-curl" "php${PHP_VERSION}-gd" "php${PHP_VERSION}-mbstring" "php${PHP_VERSION}-xml" "php${PHP_VERSION}-zip" "php${PHP_VERSION}-mysql" "php${PHP_VERSION}-sqlite3" "php${PHP_VERSION}-pgsql"
    php --version
    return 0
}
PIDS=()
install:go "1.23.0" & PIDS+=($!)
install:dotnet "8.0" & PIDS+=($!)
install:node "v20.17.0" "v0.40.1"  & PIDS+=($!)
install:deno "v1.46.2"  & PIDS+=($!)
install:python "3.12" & PIDS+=($!)
install:php "8.4" & PIDS+=($!)
wait "${PIDS[@]}"

dotnet --version # || install:dotnet "8.0"
go version # || install:go "1.23.0"
node --version # || install:node "v20.17.0" "v0.40.1"
deno --version # || install:deno "v1.46.2"
python3.12 --version # || install:python "3.12"
php --version # || install:php "8.4"

