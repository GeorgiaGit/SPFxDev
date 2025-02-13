import * as React from 'react';
import styles from '../ApolloViewerReact.module.scss';
import ApolloMissionList from '../ApolloMissionList/ApolloMissionList';
import { IApolloViewerReactProps } from '../ApolloViewerReact';
import { IMission } from '../../../../models';
import { MissionService } from '../../../../services';

const ApolloViewerReact: React.FC<IApolloViewerReactProps> = (props) => {
  const [missions, setMissions] = React.useState<IMission[]>([]);

  React.useEffect(() => {
    setMissions(MissionService.getMissions());
  }, []);

  const onRemoveMission = (missionToRemove: IMission): void => {
    const newMissions: IMission[] = missions.filter(mission => mission !== missionToRemove);
    setMissions(newMissions);
  };

  return (
    <section className={`${styles.apolloViewerReact} ${props.hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <h2>Welcome to the Apollo Mission Viewer (React)!</h2>
        <ApolloMissionList missions={missions} onDeleteMission={(mission: IMission) => onRemoveMission(mission)} />
      </div>
    </section>
  );
};

export default ApolloViewerReact;