import style from './home.module.css'
import React, { useState, useEffect } from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';
import axios from 'axios';

function Home(args) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [posters, setPosters] = useState({})

  useEffect(() => {
    axios.get('/api/series')
    .then(res => {
      setPosters(res.data.data)
    })
  }, [])


  const items = [
    {
      src: '//image.tmdb.org/t/p/original/zymbuoBoL1i94xAOzVJF6IuWLfD.jpg',
      altText: 'Cobra Kai',
      caption: 'Cobra Kai',
      key: 1,
    },
    {
      src: '//image.tmdb.org/t/p/original/6Y821aMRymfb737VBaCY1gsTWW.jpg',
      altText: 'Prison Break',
      caption: 'Prison Break',
      key: 2,
    },
    {
      src: '//image.tmdb.org/t/p/original/84XPpjGvxNyExjSuLQe0SzioErt.jpg',
      altText: 'Breaking Bad',
      caption: 'Breaking Bad',
      key: 3,
    },
  ];

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        className={style.divImg}
      >
        <img className={style.img} src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
          className={style.textCarousel}
        />
      </CarouselItem>
    );
  });

  return (
    <div className={style.container}>
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
      className={style.carousel}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>

    </div>
  )
}

export default Home