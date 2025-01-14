/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { SavedObjectsType } from 'kibana/server';

export const url: SavedObjectsType = {
  name: 'url',
  namespaceType: 'single',
  hidden: false,
  management: {
    icon: 'link',
    defaultSearchField: 'url',
    importableAndExportable: true,
    getTitle(obj) {
      return `/goto/${encodeURIComponent(obj.id)}`;
    },
    getInAppUrl(obj) {
      return {
        path: '/goto/' + encodeURIComponent(obj.id),
        uiCapabilitiesPath: '',
      };
    },
  },
  mappings: {
    properties: {
      slug: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      accessCount: {
        type: 'long',
      },
      accessDate: {
        type: 'date',
      },
      createDate: {
        type: 'date',
      },
      // Legacy field - contains already pre-formatted final URL.
      // This is here to support old saved objects that have this field.
      // TODO: Remove this field and execute a migration to the new format.
      url: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 2048,
          },
        },
      },
      // Information needed to load and execute a locator.
      locatorJSON: {
        type: 'text',
        index: false,
      },
    },
  },
};
