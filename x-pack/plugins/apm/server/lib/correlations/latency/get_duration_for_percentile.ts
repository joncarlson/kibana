/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ESFilter } from '../../../../../../../src/core/types/elasticsearch';
import { TRANSACTION_DURATION } from '../../../../common/elasticsearch_fieldnames';
import { ProcessorEvent } from '../../../../common/processor_event';
import { Setup } from '../../helpers/setup_request';

export async function getDurationForPercentile({
  durationPercentile,
  filters,
  setup,
}: {
  durationPercentile: number;
  filters: ESFilter[];
  setup: Setup;
}) {
  const { apmEventClient } = setup;
  const res = await apmEventClient.search('get_duration_for_percentiles', {
    apm: {
      events: [ProcessorEvent.transaction],
    },
    body: {
      size: 0,
      query: {
        bool: { filter: filters },
      },
      aggs: {
        percentile: {
          percentiles: {
            field: TRANSACTION_DURATION,
            percents: [durationPercentile],
          },
        },
      },
    },
  });

  const duration = Object.values(res.aggregations?.percentile.values || {})[0];
  return duration || 0;
}
