/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { resolve } from 'path';
import Url from 'url';

import { withProcRunner } from '@kbn/dev-utils';

import { FtrProviderContext } from './ftr_provider_context';

export async function SecuritySolutionCypressCliTestRunner({ getService }: FtrProviderContext) {
  const log = getService('log');
  const config = getService('config');
  const esArchiver = getService('esArchiver');

  await esArchiver.load('x-pack/test/security_solution_cypress/es_archives/auditbeat');

  await withProcRunner(log, async (procs) => {
    await procs.run('cypress', {
      cmd: 'yarn',
      args: ['cypress:run'],
      cwd: resolve(__dirname, '../../plugins/security_solution'),
      env: {
        FORCE_COLOR: '1',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_baseUrl: Url.format(config.get('servers.kibana')),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_protocol: config.get('servers.kibana.protocol'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_hostname: config.get('servers.kibana.hostname'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_configport: config.get('servers.kibana.port'),
        CYPRESS_ELASTICSEARCH_URL: Url.format(config.get('servers.elasticsearch')),
        CYPRESS_ELASTICSEARCH_USERNAME: config.get('servers.elasticsearch.username'),
        CYPRESS_ELASTICSEARCH_PASSWORD: config.get('servers.elasticsearch.password'),
        CYPRESS_KIBANA_URL: Url.format({
          protocol: config.get('servers.kibana.protocol'),
          hostname: config.get('servers.kibana.hostname'),
          port: config.get('servers.kibana.port'),
        }),
        ...process.env,
      },
      wait: true,
    });
  });
}

export async function SecuritySolutionCypressCliFirefoxTestRunner({
  getService,
}: FtrProviderContext) {
  const log = getService('log');
  const config = getService('config');
  const esArchiver = getService('esArchiver');

  await esArchiver.load('x-pack/test/security_solution_cypress/es_archives/auditbeat');

  await withProcRunner(log, async (procs) => {
    await procs.run('cypress', {
      cmd: 'yarn',
      args: ['cypress:run:firefox'],
      cwd: resolve(__dirname, '../../plugins/security_solution'),
      env: {
        FORCE_COLOR: '1',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_baseUrl: Url.format(config.get('servers.kibana')),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_protocol: config.get('servers.kibana.protocol'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_hostname: config.get('servers.kibana.hostname'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_configport: config.get('servers.kibana.port'),
        CYPRESS_ELASTICSEARCH_URL: Url.format(config.get('servers.elasticsearch')),
        CYPRESS_ELASTICSEARCH_USERNAME: config.get('servers.elasticsearch.username'),
        CYPRESS_ELASTICSEARCH_PASSWORD: config.get('servers.elasticsearch.password'),
        CYPRESS_KIBANA_URL: Url.format({
          protocol: config.get('servers.kibana.protocol'),
          hostname: config.get('servers.kibana.hostname'),
          port: config.get('servers.kibana.port'),
        }),
        ...process.env,
      },
      wait: true,
    });
  });
}

export async function SecuritySolutionCypressCcsTestRunner({ getService }: FtrProviderContext) {
  const log = getService('log');

  await withProcRunner(log, async (procs) => {
    await procs.run('cypress', {
      cmd: 'yarn',
      args: ['cypress:run:ccs'],
      cwd: resolve(__dirname, '../../plugins/security_solution'),
      env: {
        FORCE_COLOR: '1',
        CYPRESS_BASE_URL: process.env.TEST_KIBANA_URL,
        CYPRESS_ELASTICSEARCH_URL: process.env.TEST_ES_URL,
        CYPRESS_ELASTICSEARCH_USERNAME: process.env.ELASTICSEARCH_USERNAME,
        CYPRESS_ELASTICSEARCH_PASSWORD: process.env.ELASTICSEARCH_PASSWORD,
        CYPRESS_CCS_KIBANA_URL: process.env.TEST_KIBANA_URLDATA,
        CYPRESS_CCS_ELASTICSEARCH_URL: process.env.TEST_ES_URLDATA,
        CYPRESS_CCS_REMOTE_NAME: process.env.TEST_CCS_REMOTE_NAME,
        ...process.env,
      },
      wait: true,
    });
  });
}

export async function SecuritySolutionCypressVisualTestRunner({ getService }: FtrProviderContext) {
  const log = getService('log');
  const config = getService('config');
  const esArchiver = getService('esArchiver');

  await esArchiver.load('x-pack/test/security_solution_cypress/es_archives/auditbeat');

  await withProcRunner(log, async (procs) => {
    await procs.run('cypress', {
      cmd: 'yarn',
      args: ['cypress:open'],
      cwd: resolve(__dirname, '../../plugins/security_solution'),
      env: {
        FORCE_COLOR: '1',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_baseUrl: Url.format(config.get('servers.kibana')),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_protocol: config.get('servers.kibana.protocol'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_hostname: config.get('servers.kibana.hostname'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_configport: config.get('servers.kibana.port'),
        CYPRESS_ELASTICSEARCH_URL: Url.format(config.get('servers.elasticsearch')),
        CYPRESS_ELASTICSEARCH_USERNAME: config.get('servers.elasticsearch.username'),
        CYPRESS_ELASTICSEARCH_PASSWORD: config.get('servers.elasticsearch.password'),
        CYPRESS_KIBANA_URL: Url.format({
          protocol: config.get('servers.kibana.protocol'),
          hostname: config.get('servers.kibana.hostname'),
          port: config.get('servers.kibana.port'),
        }),
        ...process.env,
      },
      wait: true,
    });
  });
}

export async function SecuritySolutionCypressUpgradeCliTestRunner({
  getService,
}: FtrProviderContext) {
  const log = getService('log');

  await withProcRunner(log, async (procs) => {
    await procs.run('cypress', {
      cmd: 'yarn',
      args: ['cypress:run:upgrade'],
      cwd: resolve(__dirname, '../../plugins/security_solution'),
      env: {
        FORCE_COLOR: '1',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_baseUrl: process.env.TEST_KIBANA_URL,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_protocol: process.env.TEST_KIBANA_PROTOCOL,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_hostname: process.env.TEST_KIBANA_HOSTNAME,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CYPRESS_configport: process.env.TEST_KIBANA_PORT,
        CYPRESS_ELASTICSEARCH_URL: process.env.TEST_ES_URL,
        CYPRESS_ELASTICSEARCH_USERNAME: process.env.TEST_ES_USER,
        CYPRESS_ELASTICSEARCH_PASSWORD: process.env.TEST_ES_PASS,
        CYPRESS_KIBANA_URL: process.env.TEST_KIBANA_URL,
        ...process.env,
      },
      wait: true,
    });
  });
}
