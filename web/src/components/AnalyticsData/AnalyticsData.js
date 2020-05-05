import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import _ from 'lodash';
import { dataActions } from '../../redux/actions';
import styles from './AnalyticsData.styles';
import { getSortedRepoData } from '../../redux/selectors';
import ReactHtmlParser from 'react-html-parser';

const useStyles = createUseStyles(styles);

const AnalyticsData = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const repoData = useSelector(state => state.repoData);
  const sortedRepoData = useSelector(getSortedRepoData);
  
  const showReadme = (e) => {
    const ownerId = e.target.dataset.owner;
    const repoName = e.target.dataset.repo;
    const readmeContent = repoData[ownerId][repoName].readmeContent;

    if(_.isEmpty(readmeContent)){
      dispatch(
        dataActions.fetchReadmeContent({ ownerId, repoName })
      );
    }
    else {
      dispatch(dataActions.showModal({
        title: 'Readme.md',
        content: ReactHtmlParser(readmeContent)
      }));
    }    
  };

  const getTableContent = () => {
    if(!_.isEmpty(sortedRepoData)){
      return sortedRepoData.map((data) => {
        const { ownerId, repoName, repoUrl, noOfCommits, openPullRequests } = data;

        return (<tr key={`${ownerId}_${repoName}`}>
          <td>{ownerId}</td>
          <td>{repoName}</td>
          <td><a href={`${repoUrl}`} target='_'>{repoUrl}</a></td>
          <td><a href={`${repoUrl}/commits`} target='_'>{noOfCommits}</a></td>
          <td><a href={`${repoUrl}/pulls`} target='_'>{openPullRequests}</a></td>
          <td><span className={classes.link} data-owner={ownerId} data-repo={repoName} onClick={showReadme}>Show Readme</span></td>
        </tr>)
      });
    }
    else {
      return (<tr className={classes.noData}><td colSpan={6}>No data found</td></tr>);
    }
  }

  return (
    <section className={classes.repoTable}>
      <Table responsive>
        <thead>
          <tr>
            <th>OwnerId</th>
            <th>Repository Name</th>
            <th>Repository Url</th>
            <th>No Of Commits</th>
            <th>Pull Requests</th>
            <th>Reademe</th>
          </tr>
        </thead>
        <tbody>
          {getTableContent()}
        </tbody>
      </Table>
    </section>
  );
}

export default AnalyticsData;