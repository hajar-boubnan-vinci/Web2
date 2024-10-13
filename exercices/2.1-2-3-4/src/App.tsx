


interface Movie {
  title: string;
  director: string;
}


interface PageTitleProps {
  title: string;
}

interface CinemaProps {
  name: string;
  movie1: Movie;
  movie2: Movie;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <h1>{title}</h1>;
};

const Cinema = ({ name, movie1, movie2 }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        <li>
          <strong>{movie1.title}</strong> - Réalisateur : {movie1.director}
        </li>
        <li>
          <strong>{movie2.title}</strong> - Réalisateur : {movie2.director}
        </li>
      </ul>
    </div>
  );
};




const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const movie1: Movie = {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  };
  const movie2: Movie = {
    title: "GOODBYE JULIA",
    director: "Mohamed Kordofani",
  };

  const cinema2Name = "UGC Toison d'Or";
  const movie3: Movie = {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  };
  const movie4: Movie = {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  };

  return (
    <div>
      <PageTitle title={pageTitle} />
      <Cinema name={cinema1Name} movie1={movie1} movie2={movie2} />
      <Cinema name={cinema2Name} movie1={movie3} movie2={movie4} />
    </div>
  );
};

export default App;
