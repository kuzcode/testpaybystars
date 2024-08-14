import React from "react";
import { ReactSVG } from "react-svg";

interface Props {
  rating: number;
}

export const RateIcon: React.FC<Props> = ({ rating }) => {
  const ratings = [
    {
      name: "Alpha",
      rating: 500000,
    },
    {
      name: "Beta",
      rating: 450000,
    },
    {
      name: "Gamma",
      rating: 400000,
    },
    {
      name: "Delta",
      rating: 350000,
    },
    {
      name: "Epsilon",
      rating: 300000,
    },
    {
      name: "Zeta",
      rating: 250000,
    },
    {
      name: "Eta",
      rating: 200000,
    },
    {
      name: "Theta",
      rating: 150000,
    },
    {
      name: "Iota",
      rating: 100000,
    },
    {
      name: "Kappa",
      rating: 80000,
    },
    {
      name: "Lambda",
      rating: 50000,
    },
    {
      name: "Mu",
      rating: 35000,
    },
    {
      name: "Nu",
      rating: 25000,
    },
    {
      name: "Xi",
      rating: 20000,
    },
    {
      name: "Omicron",
      rating: 15000,
    },
    {
      name: "Pi",
      rating: 10000,
    },
    {
      name: "Rho",
      rating: 5000,
    },
    {
      name: "Sigma",
      rating: 2000,
    },
    {
      name: "Tau",
      rating: 800,
    },
    {
      name: "Upsilon",
      rating: 400,
    },
    {
      name: "Phi",
      rating: 200,
    },
    {
      name: "Chi",
      rating: 100,
    },
  ];

  return (
    <>
      {/* {ratings.map((item) => {
        return item.rating <= rating ? <div className={`bg-[#D2B985]`}></div> : null;
    })} */}
      {/* {rating >= 300000 ? <div className="bg-[#D2B985]"></div> : null}
      <div className="bg-[#C49874]"></div>
      <div className="bg-[#BFC3CE]"></div>
      <ReactSVG src="/alphabet/Alpha.svg" />
      <ReactSVG src="/alphabet/Beta.svg" />
      <ReactSVG src="/alphabet/Delta.svg" />
      <ReactSVG src="/alphabet/Epsilon.svg" /> */}
      {/* <ReactSVG src="/alphabet/Sigma.svg" /> */}
      {/* // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */}
      {/* <ReactSVG src="/alphabet/Eta.svg" />
      <ReactSVG src="/alphabet/Theta.svg" />
      <ReactSVG src="/alphabet/Lambda.svg" />
      <ReactSVG src="/alphabet/Mu.svg" />
      <ReactSVG src="/alphabet/Xi.svg" /> */}
      {/* // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --          -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */}
      {/* <ReactSVG src="/alphabet/Pi.svg" />
      <ReactSVG src="/alphabet/Rho.svg" />
      <ReactSVG src="/alphabet/Sigma.svg" />
      <ReactSVG src="/alphabet/Phi.svg" />
      <ReactSVG src="/alphabet/Omicron.svg" /> */}
    </>
  );
};
