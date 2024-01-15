import React, { useEffect } from "react";
import Container from "./Container";
import Nav from "./Header/Nav";
import LeadCard from "./LeadCard";
import SmallContainer from "./SmallContainer";
import Header from "./Header/Header";
import ThreePosts from "./Homepage/ThreePosts";
import Footer from "./Footer/Footer";

function Home() {
  //console.log(service)
  
  return (
    <>
      <Header />
      <Container>
        <SmallContainer>
          <LeadCard />
          <ThreePosts />
        </SmallContainer>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
