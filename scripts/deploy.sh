#!/bin/bash
COMMAND="scp -o StrictHostKeyChecking=no -i id_rsa -v -r dist ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"