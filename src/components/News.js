import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fallback API Key
  const apiKey = props.apiKey || "TDDGMkRXv8t88n4c0X3ZmQniDxqTiUouD_9eyd3D-ZvrbjCI";

  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeLetter(props.category)} - NewsMonkey`;
    setArticles([]);
    setPage(1);
    setHasMore(true);
    updateNews(1);
    // eslint-disable-next-line
  }, [props.category]);

  const updateNews = async (pageNumber = 1) => {
    try {
      props.setProgress(10);
      setLoading(true);

      // Build URL - standard latest news query
      let url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${apiKey}&page_number=${pageNumber}&page_size=${props.pageSize}`;
      
      // Only attach category if it's not default/general
      if (props.category && props.category !== 'general') {
        url += `&category=${props.category}`;
      }

      console.log("Fetching Initial:", url);
      props.setProgress(30);

      const response = await fetch(url);
      const parsedData = await response.json();

      console.log("API Response Page 1:", parsedData);

      if (parsedData.status !== "ok" || !parsedData.news) {
        console.error("API returned error or empty response:", parsedData);
        setArticles([]);
        setHasMore(false);
        setLoading(false);
        props.setProgress(100);
        return;
      }

      setPage(pageNumber);
      setArticles(parsedData.news);

      // If less items returned than requested page size, no more pages left
      if (parsedData.news.length < props.pageSize) {
        setHasMore(false);
      }

      setLoading(false);
      props.setProgress(100);

    } catch (error) {
      console.error("Fetch initial error:", error);
      setArticles([]);
      setHasMore(false);
      setLoading(false);
      props.setProgress(100);
    }
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    let url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${apiKey}&page_number=${nextPage}&page_size=${props.pageSize}`;

    if (props.category && props.category !== 'general') {
      url += `&category=${props.category}`;
    }

    console.log("Fetching Page:", nextPage, url);

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      console.log(`API Response Page ${nextPage}:`, parsedData);

      if (parsedData.status !== "ok" || !parsedData.news || parsedData.news.length === 0) {
        console.warn("No more news available.");
        setHasMore(false);
        return;
      }

      setPage(nextPage);
      setArticles(prevArticles => prevArticles.concat(parsedData.news));

      if (parsedData.news.length < props.pageSize) {
        setHasMore(false);
      }

    } catch (error) {
      console.error("Fetch more error:", error);
      setHasMore(false);
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
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles
              .filter(article => article && article.title)
              .map((element, index) => (
                <div className="col-md-4" key={`${element.id || element.url}-${index}`}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.image}
                    newsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.published}
                    source={element.category ? element.category.join(", ") : "News"}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  pageSize: 15,
  category: 'general'
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
  setProgress: PropTypes.func.isRequired
};

export default News;
