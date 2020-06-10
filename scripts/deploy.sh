#!/bin/bash
#scp -o StrictHostKeyChecking=no -i deploy-travis -v -r dist ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
ssh -o StrictHostKeyChecking=no -i deploy-travis -v ${REMOTE_USER}@${REMOTE_HOST} touch prueba.txt