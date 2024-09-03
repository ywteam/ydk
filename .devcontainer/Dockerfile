ARG DOTNET_VERSION=8.0
ARG GO_VERSION=1.17-bullseye
ARG NODE_VERSION=16-bullseye
ARG PYTHON_VERSION=3.10-bullseye

FROM mcr.microsoft.com/devcontainers/base:1.1.2-jammy
COPY scripts/*.sh /tmp/library-scripts/
RUN chmod +x /tmp/library-scripts/*.sh && \
    find /tmp/library-scripts -name '*.sh' -exec echo "RUNNING: {}" \; -exec {} \; && \
    rm -rf /tmp/library-scripts

CMD ["/bin/bash"]

