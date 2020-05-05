export default ({
  repoTable: {
    marginTop: '20px',
    textAlign: 'center',
    '& $th': {
      border: 'solid 1px #c2c2c2',
      backgroundColor: '#000000ab',
      color: '#fff',
      padding: '5px'
    },
    '& $td': {
      border: 'solid 1px #c2c2c2'
    }
  },
  noData: {
    fontWeight: 'bold',
    fontSize: '14px',
    textAlign: 'center'
  },
  link: {
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
});
