import React from "react";
import ShortAd from "../../shortAd/ShortAd";
import "./page.scss";
function Page({ ads, userWasDefinedFlag, nextBtn, prevBtn }) {
  function nothing() {}
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
        {ads.map((ad) => {
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
              />
            </div>
          );
        })}
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
