import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import useStyles from './components/SearchBar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('Afghanistan');
  const [url, setUrl] = useState(
    'https://restcountries.eu/rest/v2/all?query=Afghanistan',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => { //useEffectで直接async-awaitは使用不可
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get(url);
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);
    
  const classes = useStyles();
  
  return (
    <Fragment>
      <div className={classes.root}>
      <form
        className="fixed-top"
          style={{ backgroundColor: "white",paddingTop:30}}  
        onSubmit={event => {
            setUrl(`https://restcountries.eu/rest/v2/name/${query}`);
            event.preventDefault();
          }}>
        <h1>World Searcher</h1>
        <TextField
          classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <IconButton  type="submit" aria-label="search">
            <SearchIcon >検索</SearchIcon>
          </IconButton>
          {isError && <div style={{color:'red',paddingBottom:10}}>ヒットしませんでした</div>}
      </form>
        {isLoading ? (
          <div>ロード中...</div>
        ) : (
       <ul style={{paddingRight:40}}>
            {
              data.map((value, index) => {
                return (
                  <div key={index} style={{paddingBottom:40}}>
                    <h1>
                      *{value.name}*
                    </h1>
                    <div>
                      <p>首都 {value.capital}</p>
                      <p>人口 {value.population}人</p>  
                    </div>
                    <h2>language</h2>
                    <div>
                      {value.languages.map((v, i) => {
                        return (<p key={i}>{v.name}</p>)
                      })}
                    </div>
                    <div>
                    <img src={value.flag} alt={value.flag} style={{maxWidth:445,minHeight:300}}/>
                    </div>
                  </div>
                )
              })
            }
        </ul>
        )}
      </div>
    </Fragment>
  )
}


export default App



