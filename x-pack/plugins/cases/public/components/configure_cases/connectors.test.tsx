/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Connectors, Props } from './connectors';
import { TestProviders } from '../../common/mock';
import { ConnectorsDropdown } from './connectors_dropdown';
import { connectors, actionTypes } from './__mock__';
import { ConnectorTypes } from '../../../common';
import { useKibana } from '../../common/lib/kibana';

jest.mock('../../common/lib/kibana');
const useKibanaMock = useKibana as jest.Mocked<typeof useKibana>;

describe('Connectors', () => {
  let wrapper: ReactWrapper;
  const onChangeConnector = jest.fn();
  const handleShowEditFlyout = jest.fn();

  const props: Props = {
    actionTypes,
    connectors,
    disabled: false,
    handleShowEditFlyout,
    isLoading: false,
    mappings: [],
    onChangeConnector,
    selectedConnector: { id: 'none', type: ConnectorTypes.none },
    updateConnectorDisabled: false,
  };

  beforeAll(() => {
    useKibanaMock().services.triggersActionsUi.actionTypeRegistry.get = jest.fn().mockReturnValue({
      actionTypeTitle: 'test',
      iconClass: 'logoSecurity',
    });
    wrapper = mount(<Connectors {...props} />, { wrappingComponent: TestProviders });
  });

  test('it shows the connectors from group', () => {
    expect(wrapper.find('[data-test-subj="case-connectors-form-group"]').first().exists()).toBe(
      true
    );
  });

  test('it shows the connectors form row', () => {
    expect(wrapper.find('[data-test-subj="case-connectors-form-row"]').first().exists()).toBe(true);
  });

  test('it shows the connectors dropdown', () => {
    expect(wrapper.find('[data-test-subj="case-connectors-dropdown"]').first().exists()).toBe(true);
  });

  test('it pass the correct props to child', () => {
    const connectorsDropdownProps = wrapper.find(ConnectorsDropdown).props();
    expect(connectorsDropdownProps).toMatchObject({
      disabled: false,
      isLoading: false,
      connectors,
      selectedConnector: 'none',
      onChange: props.onChangeConnector,
    });
  });

  test('the connector is changed successfully', () => {
    wrapper.find('button[data-test-subj="dropdown-connectors"]').simulate('click');
    wrapper.find('button[data-test-subj="dropdown-connector-resilient-2"]').simulate('click');

    expect(onChangeConnector).toHaveBeenCalled();
    expect(onChangeConnector).toHaveBeenCalledWith('resilient-2');
  });

  test('the connector is changed successfully to none', () => {
    onChangeConnector.mockClear();
    const newWrapper = mount(
      <Connectors
        {...props}
        selectedConnector={{ id: 'servicenow-1', type: ConnectorTypes.serviceNowITSM }}
      />,
      {
        wrappingComponent: TestProviders,
      }
    );

    newWrapper.find('button[data-test-subj="dropdown-connectors"]').simulate('click');
    newWrapper.find('button[data-test-subj="dropdown-connector-no-connector"]').simulate('click');

    expect(onChangeConnector).toHaveBeenCalled();
    expect(onChangeConnector).toHaveBeenCalledWith('none');
  });

  test('it shows the add connector button', () => {
    wrapper.find('button[data-test-subj="dropdown-connectors"]').simulate('click');
    wrapper.update();

    expect(
      wrapper.find('button[data-test-subj="dropdown-connector-add-connector"]').exists()
    ).toBeTruthy();
  });

  test('the text of the update button is shown correctly', () => {
    const newWrapper = mount(
      <Connectors
        {...props}
        selectedConnector={{ id: 'servicenow-1', type: ConnectorTypes.serviceNowITSM }}
      />,
      {
        wrappingComponent: TestProviders,
      }
    );

    expect(
      newWrapper
        .find('button[data-test-subj="case-configure-update-selected-connector-button"]')
        .text()
    ).toBe('Update My Connector');
  });
});
