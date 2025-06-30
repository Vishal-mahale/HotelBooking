import React from "react";
import Hero from "../components/Hero";
import FeaturedDestinations from "../components/FeaturedDestinations";
import ExclusiveOffers from "../components/ExclusiveOffers"
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";

function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturedDestinations></FeaturedDestinations>
      <ExclusiveOffers></ExclusiveOffers>
      <Testimonials></Testimonials>
      <NewsLetter></NewsLetter>
    </div>
  );
}

export default Home;
