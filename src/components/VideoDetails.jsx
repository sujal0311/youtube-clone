import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
import CommentBox from "./commentbox";

const VideoDetails = () => {
  const [count, setCount] = useState(0);
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [usercomments, setUserComments] = useState();
  const { id } = useParams();
  const { setLoading, enabled } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
    fetchComments();
  }, [id]);
  const updatecount = () => {
    count === 0 ? setCount(1) : setCount(0);
    // console.log(count);
  };
  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      // console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };
  const fetchComments = () => {
    setLoading(true);
    fetchDataFromApi(`video/comments/?id=${id}`).then((res) => {
      // console.log(res);
      setUserComments(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      // console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    <div
      className={`flex justify-center flex-row  ${
        !enabled ? "bg-white" : "bg-black"
      }`}
    >
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0 rounded-xl overflow-hidden">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div
            className={`${
              enabled ? "text-white" : "text-black"
            } font-bold text-sm md:text-xl mt-4 line-clamp-2`}
          >
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-md font-semibold flex items-center">
                  <div className={`${enabled ? "text-white" : "text-black"}`}>
                    {video?.author?.title}
                  </div>
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill
                      className={`${
                        enabled ? "text-white" : "text-black"
                      }/[0.5] text-[12px] ml-1`}
                    />
                  )}
                </div>
                <div
                  className={`${enabled ? "text-white" : "text-black"} text-sm`}
                >
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div
              className={`flex ${
                enabled ? "text-white" : "text-black"
              } mt-4 md:mt-0`}
            >
              <div
                className={`flex items-center justify-center h-11 px-6 rounded-3xl ${
                  enabled ? "bg-white" : "bg-black"
                }/[0.15]`}
              >
                <AiOutlineLike
                  className={`text-xl ${
                    enabled ? "text-white" : "text-black"
                  } mr-2`}
                />
                {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
              </div>
              <div
                className={`flex items-center justify-center h-11 px-6 rounded-3xl ${
                  enabled ? "bg-white" : "bg-black"
                }/[0.15] ml-4`}
              >
                {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
              </div>
            </div>
          </div>
          <div>
            <h1
              className={`mt-2 font-bold ${
                !enabled ? "text-black" : "text-white"
              }`}
            >
              Description
            </h1>
            <div>
              <div
                onClick={updatecount}
                className={`${
                  !enabled
                    ? "bg-[#E5E5E5] hover:bg-[#bcbaba]"
                    : "bg-[#3F3F3F]/20 hover:bg-[#3F3F3F]/50 text-white"
                }  rounded-xl p-2 ${
                  count === 0 ? "h-20 overflow-hidden" : "h-100"
                }`}
              >
                {video?.description}
              </div>
            </div>
          </div>
          <div>
            <h2
              className={`mt-2 font-bold ${
                !enabled ? "text-black" : "text-white"
              }`}
            >
              Comments
            </h2>
            {usercomments &&
              usercomments.comments &&
              usercomments.comments.map((item, index1) => (
                <CommentBox key={index1} comment={item} />
              ))}
          </div>
        </div>

        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
