import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeLetter(props.category)} - NewsMonkey`;
    setPage(1);
    updateNews(1);
    // eslint-disable-next-line
  }, [props.category]);

  const updateNews = async (pageNumber = 1) => {
    try {
      props.setProgress(10);
      setLoading(true);

      // Currents API endpoint syntax fix
      const url = `https://api.currentsapi.services/v1/latest-news?language=en&category=${props.category}&apiKey=${props.apiKey}&page_number=${pageNumber}&page_size=${props.pageSize}`;
      console.log("Fetching URL:", url);

      props.setProgress(30);

      const response = await fetch(url);
      const parsedData = await response.json();

      console.log("Parsed data:", parsedData);

      if (parsedData.status !== "ok") {
        console.error("Currents API error:", parsedData);
        setArticles([]);
        setLoading(false);
        props.setProgress(100);
        return;
      }

      setPage(pageNumber);
      // Currents API returns array in 'news' field
      setArticles(parsedData.news || []);
      // Approximate total results based on items returned
      setTotalResults(parsedData.news ? parsedData.news.length : 0);
      setLoading(false);
      props.setProgress(100);

    } catch (error) {
      console.error("Fetch error:", error);
      setArticles([]);
      setLoading(false);
      props.setProgress(100);
    }
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    const url = `https://api.currentsapi.services/v1/latest-news?language=en&category=${props.category}&apiKey=${props.apiKey}&page_number=${nextPage}&page_size=${props.pageSize}`;

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      if (parsedData.status !== "ok") {
        console.error("Currents API fetchMore error:", parsedData);
        return;
      }

      setPage(nextPage);
      setArticles(prevArticles =>
        prevArticles.concat(parsedData.news || [])
      );

    } catch (error) {
      console.error("Fetch more error:", error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '50px 0px' }}>
        NewsMonkey - Top {capitalizeLetter(props.category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles
              .filter(article => article && article.title)
              .map((element) => (
                <div className="col-md-4" key={element.id || element.url}>
                  <NewsItem
                    title={element.title?.slice(0, 45)}
                    description={element.description?.slice(0, 88)}
                    imageUrl={element.image}
                    newsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.published}
                    source={element.category?.join(", ") || "News"}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// Default props
News.defaultProps = {
  pageSize: 8,
  category: 'general'
};

// Prop types
News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired
};

export default News;
