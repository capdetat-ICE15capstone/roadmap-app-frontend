import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RoadmapPlus from "../components/Roadmap_home";
import RoadmapNeo from "../components/Roadmap_neo";
import RoadmapCreate from "../components/RoadmapCreate";
import RoadmapToggle from "../components/RoadmapToggle";
import { ReactComponent as DarkHomeIcon } from "../assets/dark_home_icon.svg";
import SpinnerNeo from "../components/SpinnerNeo";
import { axiosInstance } from "../functions/axiosInstance";
import Prompt from "../components/Prompt";
import HomeFirstLoginModal from "../components/HomeFirstLoginModal";
import { getProfilePictureSrc } from "../components/SettingProfileImageSelector";
import { motion } from 'framer-motion';

const Home = () => {
  const { other_uid } = useParams();

  const navigate = useNavigate();

  const [profile, setPofile] = useState();

  const [roadmapList, setRoadmapList] = useState();
  const [archivedRoadmapList, setArchivedRoadmapList] = useState();
  const [currentRid, setCurrentRid] = useState();

  const [isArchiving, setIsArchiving] = useState();
  const [isDeleting, setIsDeleting] = useState();
  const [isWarning, setIsWarning] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const [viewMode, setViewMode] = useState("roadmap");

  const hasFetchedRef = useRef(false);
  const isOtherProfile = useRef(false);

  const location = useLocation();
  const firstLogin = location.state?.firstLogin;
  const [isOpenFirstLoginModal, setIsOpenFirstLoginModal] = useState(firstLogin === true);

  function handleArchive(rid) {
    setIsArchiving(true);
    setCurrentRid(rid);
  }

  function handleDelete(rid) {
    setIsDeleting(true);
    setCurrentRid(rid);
  }

  async function archiveRoadmap(rid) {
    setIsArchiving(false);
    const route = `/roadmap/archive/${rid}`
    try {
      const response = await axiosInstance.put(route);
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
    }
  }

  async function deleteRoadmap(rid) {
    setIsDeleting(false);
    const route = `/roadmap/${rid}`
    try {
      const response = await axiosInstance.delete(route);
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
    }
  }

  const fetchOtherData = async (other_uid) => {
    try {
      if (await fetchMyUid() === parseInt(other_uid)) {
        fetchData();
        return;
      }
      const response = await axiosInstance(`/home/view/${other_uid}`);
      console.log(response.data);

      setPofile(response.data.profile);
      setRoadmapList(response.data.roadmaps);
      setArchivedRoadmapList(response.data.archived_roadmaps);

      hasFetchedRef.current = true;
      isOtherProfile.current = true;
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/home/me');

      setPofile(response.data.profile);
      setRoadmapList(response.data.roadmaps);
      setArchivedRoadmapList(response.data.archived_roadmaps);

      console.log()

      hasFetchedRef.current = true;
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
    }
  }

  const fetchMyUid = async () => {
    try {
      const response = await axiosInstance.get('/user/');
      return response.data.uid;
    } catch (error) {
      console.error(error);
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
      return null;
    }
  }

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
    } else {
      return;
    }
    if (other_uid !== undefined) {
      fetchOtherData(other_uid)
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      {hasFetchedRef.current &&
        <>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              type: "easeInOut",
              duration: "0.3"
            }}
          >
            <div className='flex flex-col items-center w-full h-full space-y-8 overflow-y-scroll'>
              <div className='flex w-4/5 h-10 mt-10 mx-8 space-x-4'>
                <div className='flex items-center shrink-0 h-full text-4xl font-extrabold text-nav-blue space-x-2'>
                  <DarkHomeIcon className='h-10 w-10' />
                  <div>
                    Home
                  </div>
                </div>
              </div>
              <div className={`flex flex-col items-center w-4/5 bg-[#FFFFFF] border border-[#D9D9D9] shadow-md rounded-3xl`}>
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between">
                  <div className="flex flex-col space-y-2 p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`${profile.is_premium ? 'bg-gradient-to-br from-[#E5BA73] to-[#C58940] bg-clip-text text-transparent' : 'text-sub-blue'} font-bold text-2xl`}>
                        {profile.username}
                      </div>
                      <div className={`${profile.is_premium ? 'bg-gradient-to-br from-[#FAEAB1] to-[#E5BA73]' : 'bg-sub-blue'} flex justify-between text-white font-bold rounded-full py-1 px-1 w-28`}>
                        <div className="flex mx-2 justify-start items-center">
                          <div className="font-inter text-[#FFFFFF]">
                            LVL.
                          </div>
                        </div>
                        <div className="flex mx-2 justify-start items-center">
                          <div className="font-inter text-[#FFFFFF]">
                            {Math.floor(profile.exp * 0.01)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`flex`}>
                      {profile.bio}
                    </div>
                  </div>
                  <div className="flex justify-center items-center max-w-[200px] max-h-[200px] p-4">
                    <img
                      className={`${profile.is_premium && 'bg-gradient-to-br from-[#FAEAB1] to-[#E5BA73] p-1'} rounded-full`}
                      src={getProfilePictureSrc(profile.profile_picture_id)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-4/5">
                <RoadmapToggle showRoadmap={() => setViewMode("roadmap")} showArchive={() => setViewMode("archive")} isRoadmap={(viewMode === "roadmap")} />
              </div>
              <div className='flex flex-col justify-center items-center pb-16 w-[90%]'>
                <div className={`${(viewMode === "roadmap") ? 'visible' : 'hidden'}`}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {roadmapList.map((roadmap, index) => {
                      if (isOtherProfile.current === false) {
                        return (
                          <div key={roadmap.rid}>
                            <RoadmapPlus
                              roadmap={roadmap}
                              handleArchive={handleArchive}
                              handleDelete={handleDelete}
                              isArchived={false}
                            />
                          </div>
                        )
                      } else {
                        return (
                          <div key={roadmap.rid} className='hover:transform hover:scale-110 transition duration-150'>
                            <RoadmapNeo
                              roadmap={roadmap}
                            />
                          </div>
                        )
                      }

                    })}
                    <RoadmapCreate isPremium={profile.is_premium} roadmapAmount={roadmapList.length} />
                  </div>
                </div>
                <div className={`${(viewMode === "archive") ? 'visible' : 'hidden'}`}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {archivedRoadmapList.map((roadmap, index) => {
                      if (isOtherProfile.current === false) {
                        return (
                          <div key={index}>
                            <RoadmapPlus
                              roadmap={roadmap}
                              handleDelete={handleDelete}
                              isArchived={true}
                            />
                          </div>
                        )
                      } else {
                        return (
                          <div
                            key={index}
                            className='hover:transform hover:scale-110 transition duration-150'
                          >
                            <RoadmapNeo
                              roadmap={roadmap}
                            />
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="z-50">
              <Prompt
                visible={isArchiving}
                title="Archiving Roadmap"
                message="Are you sure that you want to permanently archive the selected roadmap?"
                positiveText="Yes"
                positiveFunction={() => archiveRoadmap(currentRid)}
                negativeText="No"
                negativeFunction={() => setIsArchiving(false)}
              />
              <Prompt
                visible={isDeleting}
                title="Deleting Roadmap"
                message="Are you sure that you want to permanently delete the selected roadmap?"
                positiveText="Yes"
                positiveFunction={() => deleteRoadmap(currentRid)}
                negativeText="No"
                negativeFunction={() => setIsDeleting(false)}
              />
              <SpinnerNeo visble={hasFetchedRef.current} />
            </div>
            <HomeFirstLoginModal isOpen={isOpenFirstLoginModal} setIsOpen={setIsOpenFirstLoginModal} />
          </motion.div>
        </>
      }
      <Prompt visible={isWarning} title="Error" message={errorMessage} positiveText="return" positiveFunction={() => { setIsWarning(false); navigate(-1); }} />
      <SpinnerNeo visible={!hasFetchedRef.current} />
    </>
  );
};

export default Home;