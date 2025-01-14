/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { screen, waitFor } from '@testing-library/dom';
import { render, mockAppIndexPattern } from './rtl_helpers';
import { ExploratoryView } from './exploratory_view';
import * as obsvInd from './utils/observability_index_patterns';
import { createStubIndexPattern } from '../../../../../../../src/plugins/data/common/stubs';

describe('ExploratoryView', () => {
  mockAppIndexPattern();

  beforeEach(() => {
    const indexPattern = createStubIndexPattern({
      spec: {
        id: 'apm-*',
        title: 'apm-*',
        timeFieldName: '@timestamp',
        fields: {
          '@timestamp': {
            name: '@timestamp',
            type: 'date',
            esTypes: ['date'],
            searchable: true,
            aggregatable: true,
            readFromDocValues: true,
          },
        },
      },
    });

    jest.spyOn(obsvInd, 'ObservabilityIndexPatterns').mockReturnValue({
      getIndexPattern: jest.fn().mockReturnValue(indexPattern),
    } as any);
  });

  it('renders exploratory view', async () => {
    render(<ExploratoryView />);

    expect(await screen.findByText(/open in lens/i)).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: /Performance Distribution/i })
    ).toBeInTheDocument();
  });

  it('renders lens component when there is series', async () => {
    const initSeries = {
      data: {
        'ux-series': {
          isNew: true,
          dataType: 'ux' as const,
          reportType: 'data-distribution' as const,
          breakdown: 'user_agent .name',
          reportDefinitions: { 'service.name': ['elastic-co'] },
          time: { from: 'now-15m', to: 'now' },
        },
      },
    };

    render(<ExploratoryView />, { initSeries });

    expect(await screen.findByText(/open in lens/i)).toBeInTheDocument();
    expect((await screen.findAllByText('Performance distribution'))[0]).toBeInTheDocument();
    expect(await screen.findByText(/Lens Embeddable Component/i)).toBeInTheDocument();

    await waitFor(() => {
      screen.getByRole('table', { name: /this table contains 1 rows\./i });
    });
  });
});
