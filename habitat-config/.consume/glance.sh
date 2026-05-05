#!/usr/bin/env bash

set -euo pipefail

SOURCE_PATH_CONFIG="$1/config"; [ -d "$SOURCE_PATH_CONFIG" ] || { echo "'$SOURCE_PATH_CONFIG' not found."; exit 1; }
SOURCE_PATH_ASSETS="$1/assets"; [ -d "$SOURCE_PATH_ASSETS" ] || { echo "'$SOURCE_PATH_ASSETS' not found."; exit 1; }
TARGET_PATH_CONFIG="/habitat-config/target/glance/config"
TARGET_PATH_ASSETS="/habitat-config/target/glance/assets"

echo "Cleaning previous configuration at '$TARGET_PATH_CONFIG'"
rm -rf "${TARGET_PATH_CONFIG:?}/"{*,.*} &>/dev/null
echo "Copying new configuration to '$TARGET_PATH_CONFIG'"
cp -rp "$SOURCE_PATH_CONFIG/." "$TARGET_PATH_CONFIG/"

echo "Cleaning previous configuration at '$TARGET_PATH_ASSETS'"
rm -rf "${TARGET_PATH_ASSETS:?}/"{*,.*} &>/dev/null
echo "Copying new configuration to '$TARGET_PATH_ASSETS'"
cp -rp "$SOURCE_PATH_ASSETS/." "$TARGET_PATH_ASSETS/"

exit 0