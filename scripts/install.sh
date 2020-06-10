#!/bin/bash
openssl aes-256-cbc -K $encrypted_f217180e22ee_key -iv $encrypted_f217180e22ee_iv -in id_rsa.enc -out deploy-travis -d

eval $(ssh-agent -s)

chmod 600 deploy-travis

ssh-add deploy-travis