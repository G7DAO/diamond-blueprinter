#!/bin/bash
trap "exit" INT TERM ERR
trap "kill 0" EXIT
nodeWaitTimeout=1200
RED='\033[0;31m'
NO_COLOR='\033[0m'

main()
{
    # rm -rf deployments/localhost
    if  [[ $1 == "polygon" ]]
    then
        # Fetch env variables like PROVIDER_URL and BLOCK_NUMBER from .env file so they don't
        # need to be separately set in terminal environment
        ENV_FILE=.env
        source .env
        if [ ! -f "$ENV_FILE" ]; then
            echo -e "${RED} File $ENV_FILE does not exist. Have you forgotten to rename the env.example to .env? ${NO_COLOR}"
            exit 1
        fi
        if [ -z "$POLYGON_ARCHIVE_NODE" ]; then echo "Set POLYGON_ARCHIVE_NODE" && exit 1; fi
        params=()
        params+=(--fork ${POLYGON_ARCHIVE_NODE})
        if [ -z "$POLYGON_START_BLOCK" ]; then
            echo "It is recommended that POLYGON_START_BLOCK is set to a recent block to improve performance of the fork";
        else
            params+=(--fork-block-number ${POLYGON_START_BLOCK})
        fi
        # cp -r deployments/mainnet deployments/localhost

        # nodeOutput=$(mktemp "${TMPDIR:-/tmp/}$(basename 0).XXX")
        # the --no-install is here so npx doesn't download some package on its own if it can not find one in the repo
        FORK=true npx --no-install hardhat node ${params[@]}
    elif [[ $1 == "mainnet" ]]
        then
        # Fetch env variables like PROVIDER_URL and BLOCK_NUMBER from .env file so they don't
        # need to be separately set in terminal environment
        ENV_FILE=.env
        source .env
        if [ ! -f "$ENV_FILE" ]; then
            echo -e "${RED} File $ENV_FILE does not exist. Have you forgotten to rename the dev.env to .env? ${NO_COLOR}"
            exit 1
        fi
        if [ -z "$MAINNET_ARCHIVE_NODE" ]; then echo "Set MAINNET_ARCHIVE_NODE" && exit 1; fi
        params=()
        params+=(--fork ${MAINNET_ARCHIVE_NODE})
        if [ -z "$MAINNET_START_BLOCK" ]; then
            echo "It is recommended that MAINNET_START_BLOCK is set to a recent block to improve performance of the fork";
        else
            params+=(--fork-block-number ${MAINNET_START_BLOCK})
        fi
        # cp -r deployments/mainnet deployments/localhost

        # nodeOutput=$(mktemp "${TMPDIR:-/tmp/}$(basename 0).XXX")
        # the --no-install is here so npx doesn't download some package on its own if it can not find one in the repo
        FORK=true npx --no-install hardhat node ${params[@]}
    elif [[ $1 == "bsc" ]]
        then
        # Fetch env variables like PROVIDER_URL and BLOCK_NUMBER from .env file so they don't
        # need to be separately set in terminal environment
        ENV_FILE=.env
        source .env
        if [ ! -f "$ENV_FILE" ]; then
            echo -e "${RED} File $ENV_FILE does not exist. Have you forgotten to rename the dev.env to .env? ${NO_COLOR}"
            exit 1
        fi
        if [ -z "$BSC_ARCHIVE_NODE" ]; then echo "Set BSC_ARCHIVE_NODE" && exit 1; fi
        params=()
        params+=(--fork ${BSC_ARCHIVE_NODE})
        if [ -z "$BSC_START_BLOCK" ]; then
            echo "It is recommended that BSC_START_BLOCK is set to a recent block to improve performance of the fork";
        else
            params+=(--fork-block-number ${BSC_START_BLOCK})
        fi
        # cp -r deployments/mainnet deployments/localhost

        # nodeOutput=$(mktemp "${TMPDIR:-/tmp/}$(basename 0).XXX")
        # the --no-install is here so npx doesn't download some package on its own if it can not find one in the repo
        FORK=true npx --no-install hardhat node ${params[@]}
    else
        npx --no-install hardhat node
    fi
}

main "$@"
