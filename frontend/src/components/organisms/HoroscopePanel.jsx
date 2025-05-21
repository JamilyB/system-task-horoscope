import { HoroscopeCard } from '../molecules/HoroscopeCard';


export const HoroscopePanel = ({ horoscopos = [] }) => {

  return (
    <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 g-4">
      {horoscopos.map((item, index) => (
        <div className="col" key={index}>
          <HoroscopeCard {...item} />
        </div>
      ))}
    </div>

  );
};
