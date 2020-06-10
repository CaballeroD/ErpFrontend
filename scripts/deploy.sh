#!/bin/bash
scp -o StrictHostKeyChecking=no -i deploy-travis -v -r dist ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
