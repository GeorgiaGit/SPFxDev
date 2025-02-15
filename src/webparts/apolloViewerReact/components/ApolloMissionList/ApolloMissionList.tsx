import * as React from 'react';
import {
  List,
  TagPicker,
  Toggle,
  getTheme
} from "@fluentui/react";
import { IMission } from '../../../../models';
import { ApolloMission } from '../ApolloMission';
import { IApolloMissionListProps } from './';

interface IMissionTagPickerItem {
  key: string,
  name: string,
  mission: IMission
}

const ApolloMissionList: React.FC<IApolloMissionListProps> = (props) => {
  const [filteredMissions, setFilteredMissions] = React.useState<IMission[]>([]);
  const [showAllMissions, setShowAllMissions] = React.useState<boolean>(false);

  React.useEffect(() => {
    const newFilteredList: IMission[] = [];
    filteredMissions.forEach((filteredMission) => {
      if (props.missions && props.missions.indexOf(filteredMission) >= 0) {
        newFilteredList.push(filteredMission);
      }
    });
    setFilteredMissions(newFilteredList);
  }, [props.missions]);

  const theme = getTheme();
  const styles = {
    picker: {
      root: {
        backgroundColor: theme.palette.white
      }
    }
  };

  const onFilterChanged = (filterText: string, tagList: IMissionTagPickerItem[]): IMissionTagPickerItem[] => {
    const filteredMissions: IMission[] = props.missions?.filter(mission => {
      if (
        (mission.id.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
        || (mission.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
      ) {
        return mission;
      }
    }) as IMission[];

    return filteredMissions.map(mission => ({
      key: mission.id,
      name: `(${mission.id}) ${mission.name}`,
      mission: mission
    }));
  };

  const onSelectedItemsChanged = (items: IMissionTagPickerItem[]): void => {
    const filteredMissions: IMission[] = items.map(item => item.mission);
    setFilteredMissions(filteredMissions);
  };

  const onRenderCell = (mission: IMission, index: number | undefined): JSX.Element => {
    return (
      <div key={getMissionUniqueId(mission)}>
        <ApolloMission
          mission={mission}
          onDeleteMission={props.onDeleteMission}
        />
      </div>
    );
  };

  const getMissionUniqueId = (mission: IMission): string => {
    return (`${mission.id}|${mission.name.replace(' ', '_')}`).toLowerCase();
  };

  return (
    <div>
      <Toggle
        label='Show all or filtered missions?'
        onText='showing all missions'
        offText='showing selected missions'
        checked={showAllMissions}
        onChange={(event, checked) => setShowAllMissions(checked as boolean)}
      />
      <TagPicker
        disabled={showAllMissions}
        pickerSuggestionsProps={{
          suggestionsHeaderText: 'Suggested Apollo missions...',
          noResultsFoundText: 'No matching Apollo missions found'
        }}
        onChange={onSelectedItemsChanged}
        onResolveSuggestions={onFilterChanged}
        styles={styles.picker}
      />
      <List
        items={showAllMissions ? props.missions as IMission[] : filteredMissions}
        onRenderCell={onRenderCell}
      />
    </div>
  );
};

export default ApolloMissionList;