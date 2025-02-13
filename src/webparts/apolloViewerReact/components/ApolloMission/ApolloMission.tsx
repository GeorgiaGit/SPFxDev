import * as React from 'react';
import styles from '../ApolloViewerReact.module.scss';
import { IApolloMissionProps } from './';

const ApolloMission: React.FC<IApolloMissionProps> = (props: IApolloMissionProps) => {

  /**
   * Handle the click event when user wants to remove a mission.
   *
   * @private
   * @param {React.MouseEvent<HTMLAnchorElement>} event
   */
  const onHandleOnRemoveClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    // because we're using a link as a button, make sure it doesn't navigate anywhere
    event.preventDefault();

    // raise the event 'onRemoveMission' and pass the mission to remove
    //  let the upstream components handle what happens
    if (props.mission && props.onRemoveMission) {
      props.onRemoveMission(props.mission);
    }
  };


  return (
    <div className={styles.apolloMission}>
      <table>
        <tbody>
          <tr>
            <td className={styles.missionDetailLabel}>ID:</td>
            <td className={styles.missionDetailValue}>{props.mission?.id}</td>
          </tr>
          <tr>
            <td className={styles.missionDetailLabel}>Name:</td>
            <td className={styles.missionDetailValue}>{props.mission?.name}</td>
          </tr>
          <tr>
            <td className={styles.missionDetailLabel}>Date:</td>
            <td className={styles.missionDetailValue}>{props.mission?.launch_date} - {props.mission?.end_date}</td>
          </tr>
          <tr>
            <td className={styles.missionDetailLabel}>Summary:</td>
            <td className={styles.missionDetailValue}>{props.mission?.summary}</td>
          </tr>
        </tbody>
      </table>
      <a href={props.mission?.wiki_href} className={styles.button}>
        <span className={styles.label}>Learn more</span>
      </a>
      {
        // NOTE: the payoff for using useCallback hook doesn't outweigh the complexity here
        // eslint-disable-next-line react/jsx-no-bind
      }<a href="#" className={styles.button} onClick={onHandleOnRemoveClick}>
        <span className={styles.label}>Remove Mission</span>
      </a>
    </div>
  );

}

export default ApolloMission;
