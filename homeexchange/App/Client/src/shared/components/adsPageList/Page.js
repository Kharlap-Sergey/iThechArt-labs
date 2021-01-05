import React, { useState } from "react";
import ShortAd from "shared/components/shortAd/ShortAd";
import "./page.scss";
import Ad from "shared/components/ad/Ad";
function Page({ ads, userWasDefinedFlag, nextBtn, prevBtn }) {
  const [state, setState] = useState({ adId: null });
  const handleMoreClick = (adId) => {
    setState({ adId: adId });
  };
  const handleLessClick = () => {
    setState({ adId: null });
  };

  if (ads?.length === 0) {
    return <div className="page page--nothing">nothing to show</div>;
  }

  const adsList = ads.map((ad) => {
    return (
      <div className="ads-list__element" key={ad.id}>
        <ShortAd
          key={ad.id}
          adId={ad.id}
          title={ad.title}
          typ={ad.type}
          description={ad.description}
          date={ad.dateOfPublication}
          authorId={ad.authorId}
          shouldAvatarDisplay={!userWasDefinedFlag}
          handleMoreClick={handleMoreClick}
        />
      </div>
    );
  })
  return (
    <div className="page">
      <div
        className="page__switcher"
        style={{ visibility: prevBtn ? "visible " : "hidden" }}
      >
        <button className="page__btn" onClick={prevBtn ?? undefined}>
          {"<"}
        </button>
      </div>
      <div className="page__main">
        {state.adId ? (
          <div className="page__ad-wrapper">
            <Ad adId={state.adId} handleLessClick={handleLessClick} />
          </div>
        ) : (
          adsList
        )}
      </div>
      <div
        className="page__switcher"
        style={{ visibility: nextBtn ? "visible " : "hidden" }}
      >
        <button className="page__btn" onClick={nextBtn ?? undefined}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Page;
