import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useMovie from "../../hooks/useMovie";
import { Link, useNavigate, useParams } from "react-router-dom";

const WatchPage = () => {
  const navigate = useNavigate();

  const params = useParams() as { id: string };

  const { data, loading, error } = useMovie(params.id);

  //console.log(data,loading,error)

  if (loading) return <p>Loading...</p>;

  if (error === "Unauthorized need Premium Plan")
    return (
      <div className="flex-col flex justify-center items-center h-screen w-screen">
        <h1 className="font-bold text-3xl">You need a premium plan </h1>
        <Link className="mt-2 bg-indigo-500 rounded px-10 py-4" to="/plans/manage">Manage Plans</Link>
      </div>
    );

  if (error || !data) return <p>{error}</p>;

  const { title, videoUrl } = data;

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-80">
        <ArrowLeftIcon
          className="w-10 text-white cursor-pointer hover:opacity-80 "
          onClick={() => navigate("/browse")}
        />
        <p className="text-white text-3xl font-bold">
          <span className="font-light">Watching:</span> {title}
        </p>
      </nav>
      <iframe
        className="h-full w-full"
        src={videoUrl}
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default WatchPage;
