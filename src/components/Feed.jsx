import React, { useContext, useEffect } from "react";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResults, enabled } = useContext(Context);
  const uniqueVideos = Array.from(
    new Set(searchResults.map((item) => item?.video?.videoId))
  )
    .map((videoId) =>
      searchResults.find((item) => item?.video?.videoId === videoId)
    )
    .filter((item) => item !== undefined);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className="flex relative flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div
        className={`grow w-[calc(100%-240px)] h-full overflow-y-auto ${
          enabled ? "bg-black" : "bg-white"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading &&
            uniqueVideos.map((item) => {
              if (item.type !== "video") return false;
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
