export const getSortedRepoData = state => {
    let repoData = {...state.repoData};
    let modifiedData = [];
    Object.keys(repoData).map((ownerId) => {
        Object.keys(repoData[ownerId]).map((repoName) => {
            modifiedData.push({ ownerId, repoName, ...repoData[ownerId][repoName] });
        });
    });
    modifiedData.sort(( a, b ) => {
        if ( a.seq > b.seq ){
            return -1;
        }
        if ( a.seq < b.seq ){
            return 1;
        }
        return 0;
    });
    return modifiedData;
};