import React from 'react'


  const NewsItem = (props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div className="my-3">
        <div className="card">

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: 0,
              zIndex: 1
            }}
          >
            <span
              className="p-2 border border-light"
              style={{ backgroundColor: 'lightgreen', borderRadius: '7px'}}
            >
              {source}
            </span>
          </div>

          <img
            src={imageUrl ? imageUrl : "https://via.placeholder.com/300x200?text=No+Image"}
            className="card-img-top"
            alt="news"
          />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <p className="card-text">{description}....</p>

            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on {date ? new Date(date).toGMTString() : "Unknown Date"}
              </small>
            </p>

            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>

          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
