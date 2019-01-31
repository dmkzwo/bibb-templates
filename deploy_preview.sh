#!/bin/sh

MAINTENANCE_SSH_CONNECT="ssh-w007236a@w007236a.kasserver.com"
LIVE_BASEDIR=/www/htdocs/w007236a/bibb-preview/htdocs
DEV_BASEDIR=/home/thomas/projects/bibb-templates

#DRYRUN='--dry-run'

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
      --progress \
      ${DRYRUN} \
      ${DEV_BASEDIR}/browsertest/* \
      ${MAINTENANCE_SSH_CONNECT}:${LIVE_BASEDIR}

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
      --progress \
      ${DRYRUN} \
      ${DEV_BASEDIR}/pattern_exports/* \
      ${MAINTENANCE_SSH_CONNECT}:${LIVE_BASEDIR}/patterns/pages
#      --exclude-from 'deploy_dmkzwo_service_exclude.txt' \

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
      --progress \
      ${DRYRUN} \
      ${DEV_BASEDIR}/source/_meta/* \
      ${MAINTENANCE_SSH_CONNECT}:${LIVE_BASEDIR}/includes

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
      --progress \
      ${DRYRUN} \
      ${DEV_BASEDIR}/public/css \
      ${MAINTENANCE_SSH_CONNECT}:${LIVE_BASEDIR}

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
      --progress \
      ${DRYRUN} \
      ${DEV_BASEDIR}/public/js \
      ${MAINTENANCE_SSH_CONNECT}:${LIVE_BASEDIR}

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
      --progress \
      ${DRYRUN} \
      ${DEV_BASEDIR}/public/images \
      ${MAINTENANCE_SSH_CONNECT}:${LIVE_BASEDIR}

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
      --progress \
      ${DRYRUN} \
      ${DEV_BASEDIR}/public/fonts \
      ${MAINTENANCE_SSH_CONNECT}:${LIVE_BASEDIR}

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" \
      --progress \
      ${DRYRUN} \
      ${DEV_BASEDIR}/server/* \
      ${MAINTENANCE_SSH_CONNECT}:${LIVE_BASEDIR}

