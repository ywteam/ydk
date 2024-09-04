ARG DOTNET_VERSION=8.0
ARG GO_VERSION=1.23.0
ARG NODE_VERSION=v20.17.0
ARG DENO_VERSION=v1.46.2
ARG PYTHON_VERSION=3.12
ARG PHP_VERSION=8.4
# ARG USER_ID=1001
# ARG GROUP_ID=1001

FROM mcr.microsoft.com/devcontainers/base:1.1.2-jammy

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC
# ENV USER_ID=${USER_ID:-1001}
# ENV GROUP_ID=${GROUP_ID:-1001}
ENV DOTNET_VERSION=${DOTNET_VERSION:-"8.0"}
ENV GO_VERSION=${GO_VERSION:-"1.23.0"}
ENV NODE_VERSION=${NODE_VERSION:-"v20.17.0"}
ENV DENO_VERSION=${DENO_VERSION:-"v1.46.2"}
ENV PYTHON_VERSION=${PYTHON_VERSION:-"3.12"}
ENV PHP_VERSION=${PHP_VERSION:-"8.4"}
ENV NVM_DIR=/usr/local/nvm
ENV DENO_INSTALL=/usr/local/deno
ENV PATH=$PATH:/usr/local/go/bin:${NVM_DIR}/versions/node/${NODE_VERSION}/bin:${DENO_INSTALL}/bin


LABEL maintainer="YDK Team <"
LABEL org.opencontainers.image.source="yellowteam.cloud"
LABEL org.opencontainers.image.authors="YDK Team < builders@yellowteam.cloud>"
LABEL org.opencontainers.image.url="https://yellowteam.cloud"
LABEL org.opencontainers.image.documentation="https://yellowteam.cloud"
LABEL org.opencontainers.image.vendor="Yellow Team"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.title="YDK Dev Container"
LABEL org.opencontainers.image.description="YDK Dev Container"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.revision="1.0.0"


# RUN groupadd -g ${GROUP_ID:-1001} yellowteam \
#     && useradd -s /bin/bash -u ${USER_ID:-1001} -g yellowteam -m yellowteam \
#     && echo "yellowteam ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/01-yellowteam \
#     && chmod 0440 /etc/sudoers.d/01-yellowteam

RUN apt-get update && apt-get install -y --no-install-recommends \
        software-properties-common \
    && rm -rf /var/lib/apt/lists/*


# Install Dotnet
RUN sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-jammy-prod jammy main" > /etc/apt/sources.list.d/dotnetdev.list' \
    && wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb \
    && dpkg -i packages-microsoft-prod.deb \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        dotnet-sdk-${DOTNET_VERSION} \
        aspnetcore-runtime-${DOTNET_VERSION} \
    && rm -rf /var/lib/apt/lists/*



# Install Go
RUN wget https://golang.org/dl/go${GO_VERSION:-"1.23.0"}.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go${GO_VERSION:-"1.23.0"}.linux-amd64.tar.gz \
    && rm go${GO_VERSION:-"1.23.0"}.linux-amd64.tar.gz

# Install Node using NVM
RUN mkdir -p /usr/local/nvm \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . /usr/local/nvm/nvm.sh \
    && nvm install ${NODE_VERSION:-"v20.17.0"} \
    && nvm use ${NODE_VERSION:-"v20.17.0"}


# Install Deno
RUN curl -fsSL https://deno.land/install.sh > deno-install.sh \
    && chmod +x deno-install.sh \ 
    && ./deno-install.sh "${DENO_VERSION}" \
    && rm deno-install.sh

# Install Python
RUN add-apt-repository -y ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        python${PYTHON_VERSION} \
        python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install PHP
RUN add-apt-repository -y ppa:ondrej/php \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        php${PHP_VERSION} \
        php${PHP_VERSION}-cli \
        php${PHP_VERSION}-fpm \
        php${PHP_VERSION}-curl \
        php${PHP_VERSION}-gd \
        php${PHP_VERSION}-mbstring \
        php${PHP_VERSION}-mysql \
        php${PHP_VERSION}-xml \
        php${PHP_VERSION}-zip \
        php${PHP_VERSION}-pgsql \
        php${PHP_VERSION}-sqlite3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
# USER yellowteam

COPY scripts/*.sh /tmp/library-scripts/
RUN chmod +x /tmp/library-scripts/*.sh && \
    find /tmp/library-scripts -name '*.sh' -exec echo "RUNNING: {}" \; -exec {} \; && \
    rm -rf /tmp/library-scripts



CMD ["sleep", "infinity"] 
 


