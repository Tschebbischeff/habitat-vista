[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat)](./LICENSE)
![Development: Prototyping](https://img.shields.io/badge/Development-Prototyping-orange?style=flat)
![Version](https://img.shields.io/badge/dynamic/json?label=Version&color=yellow&style=flat&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftschebbischeff%2Fhabitat-vista%2Frefs%2Fheads%2Fmain%2Fmetadata.json&query=%24.version)

# Habitat: Vista

**🚧
This project is currently under heavy development, any information may be subject to change.
🚧**

Habitat provides modular functionality for deployment on home lab devices. \
Each of the modules is designed as an opinionated docker stack that can be deployed on its own or together with other modules by sharing the same docker network.

## Available Modules

 - **[Path](https://github.com/Tschebbischeff/habitat-path)** \
 Network routing and reverse proxy
 - **[Scent](https://github.com/Tschebbischeff/habitat-scent)** \
 Identity provider, LDAP directory and access control
 - **[Chatter](https://github.com/Tschebbischeff/habitat-chatter)** \
 Message queue for realtime communication between modules
 - **[Sight](https://github.com/Tschebbischeff/habitat-sight)** \
 Real-time video streaming
 - **[Hoard](https://github.com/Tschebbischeff/habitat-hoard)** \
 Time-series database and persistent storage
 - **[Vigil](https://github.com/Tschebbischeff/habitat-vigil)** \
 Device monitoring, visualization and alerting
 - **[Vista](https://github.com/Tschebbischeff/habitat-vista)** \
 Central dashboards and device entry points

## Our Principles

![TODO](https://img.shields.io/badge/TODO-Coming_Soon_(TM)-red?style=flat)

## Module Features

[![Glance](https://img.shields.io/badge/Glance-_?style=flat&logo=glance&logoColor=D9C38C&logoSize=auto&color=gray&labelColor=gray)](https://github.com/glanceapp/glance)

 - **Portal** \
 Simple but elegant Glance-powered dashboard with the most important links and information

### Planned
 - *(None)*

## Getting Started

### Requirements

 - [![Habitat-Module: Path](https://img.shields.io/badge/Habitat--Module-Path-_?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMjUgMjAgMTUwIDE1MCIgZmlsbD0ibm9uZSIKICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNMTAwIDIwTDMwIDc1VjE3MEgxNzBWNzVMMTAwIDIwWiIgZmlsbD0iIzc3ZTE5OSIvPgoKICAgIDxwYXRoIGQ9Ik0xMDAgNjVMMTQ1IDkwVjE0MEwxMDAgMTY1TDU1IDE0MFY5MEwxMDAgNjVaIiBmaWxsPSIjMzE4MkNFIi8+CgogICAgPHBhdGggZD0iTTEwMCA2NUwxNDUgOTBMMTAwIDExNUw1NSA5MEwxMDAgNjVaIiBmaWxsPSIjNjNCM0VEIi8+CiAgICA8cGF0aCBkPSJNMTAwIDExNVYxNjVMNTUgMTQwVjkwTDEwMCAxMTVaIiBmaWxsPSIjMkI2Q0IwIi8+CgogICAgPHBhdGggZD0iTTEwMCA2NUwxNDUgOTBMMTAwIDExNUw1NSA5MEwxMDAgNjVaIiBzdHJva2U9IiM3N2UxOTkiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgPHBhdGggZD0iTTEwMCAxMTVWMTY1IiBzdHJva2U9IiM3N2UxOTkiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=&logoColor=113155&logoSize=auto&color=gray&labelColor=gray)](https://github.com/Tschebbischeff/habitat-path)

### Configuration

The application is designed to be controlled exclusively with environment variables and secrets.

All secrets are expected to be files within a single folder. This folder can be set via environment variable (`SECRETS_DIR`) itself and defaults to `./.secrets` (git-ignored folder).

 - [List of environment variables](#environment-variables)
 - [List of secrets](#secrets)

#### Shell Exports

The existing [.env](./.env) file contains sane defaults for most necessary environment variables and is designed to let you overwrite any of those environment variables via exports from your shell before running the application.

*Example:*
```sh
export APP_HOST="my-habitat.example.com"
export APP_MODULES="path,scent,chatter,sight,hoard,vigil,vista"
export APP_SESSION_ID="$(cat /proc/sys/kernel/random/uuid)"
export APP_NAME_LABEL="MyHabitat"
export TIMEZONE="Europe/London"
export SECRETS_DIR="/run/secrets"
docker compose up
```

#### Repository ._env File

You can also create the file `._env` in the root directory of the cloned repository and instruct docker compose to use this file instead via the `--env-file` argument, i.e `docker compose up --env-file "./._env"` ([Compose documentation](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/)).

> ℹ️ The file `._env` is included in [.gitignore](./.gitignore) and is guaranteed to not interfere with future updates via `git pull`.

> *⚠️
> If this method is used you need to define **all** necessary environment variables from the [.env](./.env) file, as docker compose will not use that file as a fallback, it is therefore recommended to copy the current `.env` file and replace all variable values.
> ⚠️*

*Example:* [See .env](./.env)

#### Local .env File

It is also possible to create a `.env` file in an unrelated directory ([Compose documentation](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/#local-env-file-versus-project-directory-env-file)).

> ℹ️ In this case you need to set the additional variable `COMPOSE_FILE` to the path of the repository's compose file and all variables inside the [.env](./.env) file will be loaded as fallback, if your own `.env` file does not define them.

> ℹ️ You do not need to instruct docker compose to use this file as long as you run `docker compose up` from the directory containing your `.env` file.

*Example:*
```sh
# /path/to/your/.env
COMPOSE_FILE="/path/to/repository/compose.yml"
APP_HOST="my-habitat.example.com"
APP_MODULES="path,scent,chatter,sight,hoard,vigil,vista"
APP_SESSION_ID="$(cat /proc/sys/kernel/random/uuid)"
APP_NAME_LABEL="MyHabitat"
TIMEZONE="Europe/Madrid"
SECRETS_DIR="/run/secrets"
```

### Environment Variables

At build-time Docker requires the following environment variables to be populated:

| Name | Description | Example | Default |
| :-- | :-- | :-- | :-- |
| `APP_HOST` | The main URL the device will be reachable at. | `my-habitat.example.com` | *Empty* |
| `APP_MODULES` | A comma separated list of module names that are started in the same docker namespace (same project name) as this module. | `path,scent,chatter,sight,hoard,vigil,vista` | *Empty* |
| `APP_SESSION_ID` | A session ID used for synchronization of configuration between modules, should change every time all modules are restarted in unison and remain unchanged if a single module is restarted without being updated. | `$(cat /proc/sys/kernel/random/uuid)` | *Empty* |
| `APP_NAME_HOST` | The prefix for all docker networks and containers, that this application will create. Also used as the internal hostname within all containers. | `my-habitat` | `habitat` |
| `APP_NAME_LABEL` | The human readable name of the device. | `My Habitat` | `Habitat` |
| `TIMEZONE` | Timezone identifier passed on to containers. | `Europe/Paris` | `Europe/Berlin` |
| `VOLUME_DIR` | The directory in which [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/) are placed *(Currently only named volumes are used)*. | `/path/to/my/volumes` | `./volumes` |
| `ENV_DIR` | The directory in which .env files for containers can be placed to override the default runtime config. | `/path/to/my/env` | `./env.d` |
| `SECRETS_DIR` | The directory in which files containing secrets for containers are placed. | `/run/secret` | `./secrets` |

### Secrets

The following secrets must exist within the `SECRETS_DIR` directory at build-time, otherwise running the stack will fail.
They are expected to be files with the secret value being the content of the file.

| (File) Name | Description | Documentation / How to Obtain |
| :-- | :-- | :-- |
|  | This module does not require any secrets |  |

### Run the Application

 - Run `docker compose up` from the root directory of the repository or from the directory containing your `.env` file
 - Run `docker compose logs` and wait for the application to finish first-time setup and settle

## Acknowledgments and Licensing

This project is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](./LICENSE).

Copyright (c) 2026, [Tschebbischeff](https://github.com/Tschebbischeff). \
All rights reserved to the extent permitted by the AGPLv3.

For third-party license details and attribution, please see [Third-Party Licenses](./THIRD-PARTY-LICENSES.md).

With Icons from:
[![SimpleIcons](https://img.shields.io/badge/SimpleIcons-_?style=flat&logo=simpleicons&logoColor=111111&logoSize=auto&color=gray&labelColor=gray)](https://simpleicons.org/)
[![DashboardIcons](https://img.shields.io/badge/DashboardIcons-_?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjMyIDIzMiIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJkYXNoYm9hcmQtaWNvbnMgbG9nbyI+DQogIDxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSIyMjQiIGhlaWdodD0iMjI0IiByeD0iMzIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCiAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+DQogICAgPHJlY3QgeD0iMjQiIHk9IjI0IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSI4IiBzdHJva2U9IiNGQjcxODUiLz4NCiAgICA8cmVjdCB4PSI5MiIgeT0iMjQiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9IiNGREJBNzQiLz4NCiAgICA8cmVjdCB4PSI5MiIgeT0iOTIiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjgiIHN0cm9rZT0iI0M0QjVGRCIvPg0KICAgIDxyZWN0IHg9IjE2MCIgeT0iOTIiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjgiLz4NCiAgICA8cmVjdCB4PSI5MiIgeT0iMTYwIiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSI4Ii8+DQogICAgPHJlY3QgeD0iMTYwIiB5PSIxNjAiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9IiM5M0M1RkQiLz4NCiAgPC9nPg0KICA8Y2lyY2xlIGN4PSIxODQiIGN5PSI0OCIgcj0iMjYiIGZpbGw9IiM4NkVGQUMiLz4NCiAgPGNpcmNsZSBjeD0iNDgiIGN5PSIxMTYiIHI9IjI2IiBmaWxsPSIjOTNDNUZEIi8+DQogIDxyZWN0IHg9IjI0IiB5PSIxNjAiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9IiNGREU2OEEiLz4NCjwvc3ZnPg==&logoColor=F56565&logoSize=auto&color=gray&labelColor=gray)](https://dashboardicons.com/)
[![Lucide](https://img.shields.io/badge/Lucide-_?style=flat&logo=lucide&logoColor=F56565&logoSize=auto&color=gray&labelColor=gray)](https://lucide.dev/)
