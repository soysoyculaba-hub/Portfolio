import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, GridBackground, Preloader, SmoothScroll } from "./components";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <SmoothScroll>
        <div className='relative z-0 bg-primary'>
          <div className="relative">
            <GridBackground />
            <Navbar />
            <Hero />
            <About />
            <Experience />
            <Tech />
            <Works />
            {/* <Feedbacks /> */}
          </div>

          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
